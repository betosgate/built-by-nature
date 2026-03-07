import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    // Use the user's client for auth check
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

    // Use service role client for storage and DB operations (bypasses RLS)
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Generate unique path
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const storagePath = `${user.id}/${timestamp}.${ext}`;
    const bucket = isPrivate ? "private-content" : "public-content";

    // Ensure bucket exists (create if not)
    const { data: buckets } = await adminClient.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === bucket);
    if (!bucketExists) {
      const { error: createBucketError } = await adminClient.storage.createBucket(bucket, {
        public: !isPrivate,
      });
      if (createBucketError) {
        console.error("Bucket creation error:", createBucketError);
        // Continue anyway — bucket may already exist from a race condition
      }
    }

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await adminClient.storage
      .from(bucket)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 });
    }

    // Get public URL for public content
    let publicUrl: string | null = null;
    if (!isPrivate) {
      const { data: urlData } = adminClient.storage
        .from(bucket)
        .getPublicUrl(storagePath);
      publicUrl = urlData.publicUrl;
    }

    // Insert content record
    const { data: content, error: dbError } = await adminClient
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
      return NextResponse.json({ error: `Failed to save record: ${dbError.message}` }, { status: 500 });
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
