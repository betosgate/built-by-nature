"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialShareProps {
  url: string;
  title: string;
  contestName?: string;
  contestantName?: string;
  imageUrl?: string;
}

const HASHTAGS = "BuiltByNature NaturalBeauty Summer2026 BeautyContest RealBeauty";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.85 4.85 0 01-3.59-1.56V6.69h3.59z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function SocialShare({ url, title, contestName, contestantName, imageUrl }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const fullUrl = typeof window !== "undefined"
    ? `${window.location.origin}${url}`
    : `https://built-by-nature.vercel.app${url}`;

  const shareText = contestantName
    ? `Vote for ${contestantName} in the ${contestName || "Built by Nature"} competition!`
    : title;

  const hashtagString = HASHTAGS.split(" ").map(t => `#${t}`).join(" ");

  const shareLinks = [
    {
      name: "X (Twitter)",
      icon: XIcon,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareText}\n\n${hashtagString}`)}&url=${encodeURIComponent(fullUrl)}`,
      color: "hover:text-white",
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(`${shareText} ${hashtagString}`)}`,
      color: "hover:text-blue-400",
    },
    {
      name: "TikTok",
      icon: TikTokIcon,
      href: `https://www.tiktok.com/share?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(`${shareText} ${hashtagString}`)}`,
      color: "hover:text-pink-400",
    },
    {
      name: "Instagram",
      icon: InstagramIcon,
      // Instagram doesn't have a direct share URL — copy link + hashtags for caption
      href: "#instagram",
      color: "hover:text-pink-500",
      isInstagram: true,
    },
  ];

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramShare = () => {
    // Copy link + hashtags for Instagram caption
    const instagramText = `${shareText}\n\n${fullUrl}\n\n${hashtagString}`;
    copyToClipboard(instagramText);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowMenu(!showMenu)}
        className="border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 gap-1.5"
      >
        <Share2 className="size-3.5" />
        Share
      </Button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-xl border border-zinc-700 bg-zinc-900 p-2 shadow-xl">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.isInstagram ? undefined : link.href}
                target={link.isInstagram ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (link.isInstagram) {
                    e.preventDefault();
                    handleInstagramShare();
                  }
                  setShowMenu(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 ${link.color} cursor-pointer`}
              >
                <link.icon className="size-4" />
                <span>{link.name}</span>
                {link.isInstagram && (
                  <span className="ml-auto text-xs text-zinc-500">
                    {copied ? "Copied!" : "Copy caption"}
                  </span>
                )}
              </a>
            ))}

            <div className="my-1 border-t border-zinc-800" />

            <button
              onClick={() => {
                copyToClipboard(fullUrl);
                setShowMenu(false);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-amber-400"
            >
              {copied ? <Check className="size-4 text-green-400" /> : <Copy className="size-4" />}
              <span>{copied ? "Link copied!" : "Copy link"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
