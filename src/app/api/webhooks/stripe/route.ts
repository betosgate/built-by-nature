import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // TODO: Verify Stripe webhook signature
  // const event = stripe.webhooks.constructEvent(
  //   body,
  //   signature,
  //   process.env.STRIPE_WEBHOOK_SECRET!
  // );

  // Parse the event from raw body for now
  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const userId = session.metadata?.userId;
      const tokenAmount = parseInt(session.metadata?.tokenAmount ?? "0", 10);

      if (!userId || !tokenAmount) {
        console.error("Missing userId or tokenAmount in session metadata");
        break;
      }

      // TODO: Update user token balance in database
      // await db.user.update({
      //   where: { id: userId },
      //   data: { tokens: { increment: tokenAmount } },
      // });

      console.log(`Added ${tokenAmount} tokens to user ${userId}`);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
