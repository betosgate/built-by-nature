import { NextRequest, NextResponse } from "next/server";

const TOKEN_BUNDLES: Record<number, number> = {
  1: 500,   // 1 token  = $5.00
  5: 2000,  // 5 tokens = $20.00
  10: 3500, // 10 tokens = $35.00
  25: 7500, // 25 tokens = $75.00
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bundleSize } = body;

    // TODO: Validate user is authenticated
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;
    const userId = "placeholder-user-id";

    const priceInCents = TOKEN_BUNDLES[bundleSize as number];

    if (!priceInCents) {
      return NextResponse.json(
        {
          error: "Invalid bundle size. Choose from: 1, 5, 10, or 25 tokens",
          availableBundles: {
            1: "$5.00",
            5: "$20.00",
            10: "$35.00",
            25: "$75.00",
          },
        },
        { status: 400 }
      );
    }

    // TODO: Create Stripe checkout session
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const checkoutSession = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "usd",
    //         product_data: {
    //           name: `${bundleSize} Token${bundleSize > 1 ? "s" : ""}`,
    //           description: `Purchase ${bundleSize} voting token${bundleSize > 1 ? "s" : ""} for Built by Nature`,
    //         },
    //         unit_amount: priceInCents,
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   metadata: {
    //     userId,
    //     tokenAmount: String(bundleSize),
    //   },
    //   success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?purchase=success`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?purchase=cancelled`,
    // });

    // Placeholder response
    return NextResponse.json({
      // url: checkoutSession.url,
      url: "https://checkout.stripe.com/placeholder",
      bundleSize,
      price: `$${(priceInCents / 100).toFixed(2)}`,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
