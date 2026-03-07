"use client";

import { useState } from "react";
import {
  Upload,
  Camera,
  Video,
  ImageIcon,
  X,
  Lock,
  Globe,
  Trophy,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const mockContests = [
  { id: "summer-glow-2026", name: "Summer Glow 2026" },
  { id: "natural-beauty-classic", name: "Natural Beauty Classic" },
  { id: "fitness-physique-open", name: "Fitness Physique Open" },
  { id: "couple-goals", name: "Couple Goals" },
];

export default function UploadPage() {
  const [fileType, setFileType] = useState<"photo" | "video">("photo");
  const [caption, setCaption] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedContest, setSelectedContest] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("caption", caption);
      formData.append("isPrivate", String(isPrivate));
      formData.append("fileType", fileType);
      if (selectedContest) formData.append("contestId", selectedContest);

      const response = await fetch("/api/content/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setResult({ success: false, message: data.error || "Upload failed" });
      } else {
        setResult({ success: true, message: "Content uploaded successfully!" });
        // Reset form
        setFile(null);
        setCaption("");
        setIsPrivate(false);
        setSelectedContest("");
      }
    } catch {
      setResult({ success: false, message: "Upload failed. Please try again." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold lg:text-3xl">
          Upload <span className="text-amber-500">Content</span>
        </h1>
        <p className="mt-1 text-zinc-400">
          Share photos or videos with your audience and enter contests.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        {/* Result message */}
        {result && (
          <div className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${
            result.success
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}>
            {result.success ? <CheckCircle className="size-5 shrink-0" /> : <AlertCircle className="size-5 shrink-0" />}
            <span className="text-sm">{result.message}</span>
          </div>
        )}

        {/* File Type Selector */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Content Type
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => { setFileType("photo"); setFile(null); }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                fileType === "photo"
                  ? "border-amber-500 bg-amber-500/10 text-amber-400"
                  : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              <ImageIcon className="size-5" />
              Photo
            </button>
            <button
              onClick={() => { setFileType("video"); setFile(null); }}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all ${
                fileType === "video"
                  ? "border-amber-500 bg-amber-500/10 text-amber-400"
                  : "border-zinc-700 bg-zinc-900/50 text-zinc-400 hover:border-zinc-600"
              }`}
            >
              <Video className="size-5" />
              Video
            </button>
          </div>
        </div>

        {/* Drag and Drop Area */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Upload File
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFile(e.dataTransfer.files[0]);
            }}
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
              isDragging
                ? "border-amber-500 bg-amber-500/5"
                : file
                ? "border-green-500/50 bg-green-500/5"
                : "border-zinc-700 bg-zinc-900/30 hover:border-zinc-600"
            }`}
          >
            {file ? (
              <div className="text-center">
                <Camera className="mx-auto mb-3 size-10 text-green-400" />
                <p className="text-sm font-medium text-white">{file.name}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-2 flex items-center gap-1 text-xs text-zinc-400 hover:text-red-400 mx-auto"
                >
                  <X className="size-3" />
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto mb-3 size-10 text-zinc-500" />
                <p className="text-sm text-zinc-300">
                  <span className="font-medium text-amber-500">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  {fileType === "photo"
                    ? "PNG, JPG, WEBP up to 10MB"
                    : "MP4, MOV, WEBM up to 100MB"}
                </p>
              </div>
            )}
            <input
              type="file"
              accept={
                fileType === "photo"
                  ? "image/png,image/jpeg,image/webp"
                  : "video/mp4,video/quicktime,video/webm"
              }
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption for your content..."
            rows={3}
            maxLength={500}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder-zinc-500 transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
          <div className="mt-1 text-right text-xs text-zinc-500">
            {caption.length}/500
          </div>
        </div>

        {/* Privacy Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between rounded-xl border border-zinc-700 bg-zinc-900/50 p-4">
            <div className="flex items-center gap-3">
              {isPrivate ? (
                <Lock className="size-5 text-amber-500" />
              ) : (
                <Globe className="size-5 text-green-400" />
              )}
              <div>
                <div className="text-sm font-medium text-white">
                  {isPrivate ? "Private (18+)" : "Public"}
                </div>
                <div className="text-xs text-zinc-500">
                  {isPrivate
                    ? "Only visible to age-verified users"
                    : "Visible to everyone on your profile"}
                </div>
              </div>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>
        </div>

        {/* Contest Assignment */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            <Trophy className="mb-0.5 mr-1 inline size-4 text-amber-500" />
            Assign to Contest (optional)
          </label>
          <select
            value={selectedContest}
            onChange={(e) => setSelectedContest(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-sm text-white transition-colors focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          >
            <option value="" className="bg-zinc-900">
              No contest
            </option>
            {mockContests.map((contest) => (
              <option
                key={contest.id}
                value={contest.id}
                className="bg-zinc-900"
              >
                {contest.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Button */}
        <Button
          size="lg"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-amber-500 text-black hover:bg-amber-400 py-3 text-base font-semibold disabled:opacity-50"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Uploading...
            </span>
          ) : (
            <>
              <Upload className="size-5" />
              Upload Content
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
