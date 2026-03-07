import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// CCBill sends postback notifications as form-encoded POST or GET requests
// Documentation: https://ccbill.com/doc/webhooks-user-guide

function verifyDigest(params: Record<string, string>): boolean {
  const salt = process.env.CCBILL_SALT;
  if (!salt) return false;

  // CCBill response digest verification
  // The exact fields depend on your CCBill configuration
  const subscriptionId = params.subscription_id || "";
  const amount = params.initialPrice || params.billedInitialPrice || "";
  const digestString = `${subscriptionId}1${salt}`;
  const expectedDigest = crypto.createHash("md5").update(digestString).digest("hex");

  return params.responseDigest === expectedDigest;
}

export async function POST(request: NextRequest) {
  try {
    // CCBill can send postbacks as form-encoded data or JSON
    const contentType = request.headers.get("content-type") || "";
    let params: Record<string, string> = {};

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        params[key] = String(value);
      });
    } else if (contentType.includes("application/json")) {
      params = await request.json();
    } else {
      // CCBill sometimes sends as query string on GET-style postbacks
      const url = new URL(request.url);
      url.searchParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    const eventType = params.eventType || params.Action || "";
    const userId = params["X-userId"] || "";
    const tokenAmount = parseInt(params["X-tokenAmount"] || "0", 10);

    if (!userId || !tokenAmount) {
      console.error("CCBill postback missing custom fields:", params);
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Handle different CCBill event types
    // NewSaleSuccess / NewSaleFailure are the primary events for one-time payments
    if (
      eventType === "NewSaleSuccess" ||
      eventType === "RenewalSuccess" ||
      !eventType // Some CCBill configs don't include eventType for successful charges
    ) {
      // Verify we got a transaction ID (indicates successful payment)
      const transactionId = params.transaction_id || params.subscription_id || "";
      if (!transactionId) {
        console.error("CCBill postback missing transaction ID");
        return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
      }

      const amountPaid = parseFloat(params.initialPrice || params.billedInitialPrice || "0");

      // Record the purchase
      await supabase.from("token_purchases").insert({
        user_id: userId,
        amount: tokenAmount,
        price_paid: amountPaid,
        stripe_session_id: `ccbill_${transactionId}`, // reuse column for CCBill tx ID
        status: "completed",
      });

      // Update user token balance
      const { data: profile } = await supabase
        .from("profiles")
        .select("tokens_balance")
        .eq("id", userId)
        .single();

      if (profile) {
        await supabase
          .from("profiles")
          .update({ tokens_balance: profile.tokens_balance + tokenAmount })
          .eq("id", userId);
      }

      console.log(`CCBill: Added ${tokenAmount} tokens to user ${userId} (tx: ${transactionId})`);
    } else if (eventType === "NewSaleFailure") {
      console.log(`CCBill: Payment failed for user ${userId}`, params.reasonForDecline);
    } else if (eventType === "Chargeback" || eventType === "Refund") {
      // Handle chargebacks/refunds - deduct tokens
      const { data: profile } = await supabase
        .from("profiles")
        .select("tokens_balance")
        .eq("id", userId)
        .single();

      if (profile) {
        const newBalance = Math.max(0, profile.tokens_balance - tokenAmount);
        await supabase
          .from("profiles")
          .update({ tokens_balance: newBalance })
          .eq("id", userId);
      }

      console.log(`CCBill: ${eventType} processed for user ${userId}, deducted ${tokenAmount} tokens`);
    } else {
      console.log(`CCBill: Unhandled event type: ${eventType}`, params);
    }

    // CCBill expects a 200 response to acknowledge the postback
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("CCBill webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// CCBill can also send postbacks as GET requests
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // Convert to a POST-style request internally
  const fakeRequest = new NextRequest(request.url, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(params),
  });

  return POST(fakeRequest);
}
