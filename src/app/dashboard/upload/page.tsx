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
  const [fileName, setFileName] = useState("");

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
        {/* File Type Selector */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Content Type
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setFileType("photo")}
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
              onClick={() => setFileType("video")}
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
              const file = e.dataTransfer.files[0];
              if (file) setFileName(file.name);
            }}
            className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
              isDragging
                ? "border-amber-500 bg-amber-500/5"
                : fileName
                ? "border-green-500/50 bg-green-500/5"
                : "border-zinc-700 bg-zinc-900/30 hover:border-zinc-600"
            }`}
          >
            {fileName ? (
              <div className="text-center">
                <Camera className="mx-auto mb-3 size-10 text-green-400" />
                <p className="text-sm font-medium text-white">{fileName}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName("");
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
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setFileName(file.name);
              }}
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
          className="w-full bg-amber-500 text-black hover:bg-amber-400 py-3 text-base font-semibold"
        >
          <Upload className="size-5" />
          Upload Content
        </Button>
      </div>
    </div>
  );
}
