import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";

const TOKEN_BUNDLES: Record<number, { amount: number; price: number }> = {
  0: { amount: 1, price: 5 },
  1: { amount: 5, price: 20 },
  2: { amount: 10, price: 35 },
  3: { amount: 25, price: 75 },
};

function generateCCBillPaymentUrl(params: {
  price: number;
  userId: string;
  tokenAmount: number;
  bundleIndex: number;
}): string {
  const accountNo = process.env.CCBILL_ACCOUNT_NUMBER!;
  const subAccountNo = process.env.CCBILL_SUB_ACCOUNT_NUMBER!;
  const flexFormId = process.env.CCBILL_FLEXFORM_ID!;
  const salt = process.env.CCBILL_SALT!;

  const currencyCode = "840"; // USD
  const initialPeriod = "2"; // one-time (2 days, but single billing)
  const formPrice = params.price.toFixed(2);

  // CCBill requires an MD5 digest for form security
  // Format: initialPrice + initialPeriod + currencyCode + salt
  const digestString = `${formPrice}${initialPeriod}${currencyCode}${salt}`;
  const formDigest = crypto.createHash("md5").update(digestString).digest("hex");

  const baseUrl = `https://api.ccbill.com/wap-frontflex/flexforms/${flexFormId}`;

  const queryParams = new URLSearchParams({
    accountNo,
    subAccountNo,
    initialPrice: formPrice,
    initialPeriod,
    currencyCode,
    formDigest,
    // Custom fields passed through to the postback
    "X-userId": params.userId,
    "X-tokenAmount": String(params.tokenAmount),
    "X-bundleIndex": String(params.bundleIndex),
  });

  return `${baseUrl}?${queryParams.toString()}`;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { bundleIndex } = body;

    const bundle = TOKEN_BUNDLES[bundleIndex as number];
    if (!bundle) {
      return NextResponse.json({ error: "Invalid bundle selection" }, { status: 400 });
    }

    if (
      !process.env.CCBILL_ACCOUNT_NUMBER ||
      !process.env.CCBILL_FLEXFORM_ID ||
      process.env.CCBILL_ACCOUNT_NUMBER === "placeholder"
    ) {
      return NextResponse.json({
        error: "CCBill is not configured yet. Token purchases will be available soon.",
        comingSoon: true,
      }, { status: 503 });
    }

    const paymentUrl = generateCCBillPaymentUrl({
      price: bundle.price,
      userId: user.id,
      tokenAmount: bundle.amount,
      bundleIndex,
    });

    return NextResponse.json({ url: paymentUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
