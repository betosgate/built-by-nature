import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Fetch messages where user is sender or recipient
    const { data: messages } = await supabase
      .from("messages")
      .select(
        "id, content, created_at, is_read, sender_id, recipient_id, profiles!messages_sender_id_fkey(display_name, avatar_url)"
      )
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .limit(50);

    return NextResponse.json({ messages: messages || [], userId: user.id });
  } catch (error) {
    console.error("Messages API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { recipientId, content } = await request.json();
    if (!recipientId || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { data: message, error } = await supabase
      .from("messages")
      .insert({ sender_id: user.id, recipient_id: recipientId, content })
      .select()
      .single();

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ message });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
