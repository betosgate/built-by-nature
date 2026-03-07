import { NextRequest, NextResponse } from "next/server";

const DAILY_VOTE_LIMIT_PER_CONTESTANT = 20;
const CONTESTANT_EARNING_PERCENT = 0.2;
const RECRUITER_EARNING_PERCENT = 0.1;
const TOKEN_VALUE_USD = 5; // Each token is worth $5

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contestantId } = body;

    // TODO: Validate user is authenticated
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    // const userId = session.user.id;
    const userId = "placeholder-user-id";

    if (!contestantId) {
      return NextResponse.json(
        { error: "contestantId is required" },
        { status: 400 }
      );
    }

    // TODO: Check daily vote limit (20 votes per contestant per day)
    // const today = new Date().toISOString().split("T")[0];
    // const votesToday = await db.vote.count({
    //   where: {
    //     userId,
    //     contestantId,
    //     createdAt: { gte: new Date(today) },
    //   },
    // });
    // if (votesToday >= DAILY_VOTE_LIMIT_PER_CONTESTANT) {
    //   return NextResponse.json(
    //     { error: "Daily vote limit reached for this contestant" },
    //     { status: 429 }
    //   );
    // }

    // TODO: Check user has at least 1 token
    // const user = await db.user.findUnique({ where: { id: userId } });
    // if (!user || user.tokens < 1) {
    //   return NextResponse.json(
    //     { error: "Insufficient token balance" },
    //     { status: 400 }
    //   );
    // }

    // TODO: Deduct 1 token from user balance
    // await db.user.update({
    //   where: { id: userId },
    //   data: { tokens: { decrement: 1 } },
    // });

    // TODO: Create vote record
    // const vote = await db.vote.create({
    //   data: { userId, contestantId },
    // });

    // TODO: Create earnings records
    // Contestant earns 20% of the token value
    // await db.earning.create({
    //   data: {
    //     userId: contestantId,
    //     amount: TOKEN_VALUE_USD * CONTESTANT_EARNING_PERCENT,
    //     type: "CONTESTANT_VOTE",
    //     voteId: vote.id,
    //   },
    // });

    // Recruiter earns 10% of the token value (if contestant has a recruiter)
    // const contestant = await db.user.findUnique({ where: { id: contestantId } });
    // if (contestant?.recruiterId) {
    //   await db.earning.create({
    //     data: {
    //       userId: contestant.recruiterId,
    //       amount: TOKEN_VALUE_USD * RECRUITER_EARNING_PERCENT,
    //       type: "RECRUITER_COMMISSION",
    //       voteId: vote.id,
    //     },
    //   });
    // }

    // TODO: Get updated vote count
    // const updatedVoteCount = await db.vote.count({
    //   where: { contestantId },
    // });

    return NextResponse.json({
      success: true,
      voteCount: 0, // placeholder
      message: "Vote recorded successfully",
    });
  } catch (error) {
    console.error("Vote error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
