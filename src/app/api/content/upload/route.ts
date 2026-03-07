import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const caption = formData.get("caption") as string || "";
    const isPrivate = formData.get("isPrivate") === "true";
    const fileType = formData.get("fileType") as "photo" | "video";
    const contestId = formData.get("contestId") as string || null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    const maxSize = fileType === "photo" ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({
        error: `File too large. Max ${fileType === "photo" ? "10MB" : "100MB"}.`,
      }, { status: 400 });
    }

    // Generate unique path
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const storagePath = `${user.id}/${timestamp}.${ext}`;
    const bucket = isPrivate ? "private-content" : "public-content";

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Get public URL for public content
    let publicUrl: string | null = null;
    if (!isPrivate) {
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(storagePath);
      publicUrl = urlData.publicUrl;
    }

    // Insert content record
    const { data: content, error: dbError } = await supabase
      .from("content")
      .insert({
        user_id: user.id,
        type: fileType,
        storage_path: storagePath,
        public_url: publicUrl,
        is_private: isPrivate,
        is_18_plus: isPrivate,
        caption,
        contest_entry_id: contestId || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError);
      return NextResponse.json({ error: "Failed to save content record" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      content,
      message: "Content uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
