"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Lock, Loader2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface ContentItem {
  id: string;
  type: string;
  storage_path: string;
  public_url: string;
  caption: string;
  is_private: boolean;
  created_at: string;
  user_id: string;
  contest_entry_id: string | null;
  profiles: {
    id: string;
    display_name: string;
    avatar_url: string;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ContestOption {
  label: string;
  value: string;
}

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Trending", value: "trending" },
];

export default function ExplorePage() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [activeSort, setActiveSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<ContestOption[]>([
    { label: "All", value: "" },
  ]);

  // Fetch real contests for filter buttons
  useEffect(() => {
    async function fetchContests() {
      try {
        const res = await fetch("/api/contests");
        if (res.ok) {
          const data = await res.json();
          const contests = data.contests || data || [];
          const options: ContestOption[] = [{ label: "All", value: "" }];
          for (const contest of contests) {
            if (contest.id && contest.title) {
              options.push({ label: contest.title, value: contest.id });
            }
          }
          setFilterOptions(options);
        }
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      }
    }
    fetchContests();
  }, []);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
    setContent([]);
  }, [debouncedSearch, activeFilter, activeSort]);

  const fetchContent = useCallback(
    async (pageNum: number, append: boolean) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const params = new URLSearchParams({
          page: pageNum.toString(),
          limit: "20",
          sort: activeSort,
        });
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (activeFilter) params.set("contest_id", activeFilter);

        const res = await fetch(`/api/content/public?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          if (append) {
            setContent((prev) => [...prev, ...(data.content || [])]);
          } else {
            setContent(data.content || []);
          }
          setPagination(data.pagination || null);
        }
      } catch (err) {
        console.error("Failed to fetch content:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch, activeFilter, activeSort]
  );

  useEffect(() => {
    fetchContent(page, page > 1);
  }, [page, fetchContent]);

  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((p) => p + 1);
    }
  };

  const isVideoType = (type: string) => {
    return type?.startsWith("video/") || type === "video";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-amber-500">Explore</span> Content
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Browse photos and content from our talented contestants. Vote for
            your favorites to help them win.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500/20"
          />
        </div>

        {/* Filters & Sort */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === filter.value
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Sort Buttons */}
          <div className="flex gap-2">
            {SORT_OPTIONS.map((sortOpt) => (
              <button
                key={sortOpt.value}
                onClick={() => setActiveSort(sortOpt.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeSort === sortOpt.value
                    ? "bg-white text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800"
                }`}
              >
                {sortOpt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="size-10 text-amber-500 animate-spin mb-4" />
            <p className="text-zinc-400">Loading content...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && content.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Camera className="size-16 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">No content yet</h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              Be the first to enter the competition and share your content with
              the world!
            </p>
            <Link href="/signup">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 h-12">
                Sign Up as Contestant
              </Button>
            </Link>
          </div>
        )}

        {/* Content Grid */}
        {!loading && content.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.map((item) => (
                <Link
                  key={item.id}
                  href={`/contestant/${item.profiles?.id || item.user_id}`}
                  className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    {item.public_url && isVideoType(item.type) ? (
                      <video
                        src={item.public_url}
                        className="h-full w-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : item.public_url ? (
                      <Image
                        src={item.public_url}
                        alt={item.caption || "Content"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                        <Camera className="size-12 text-zinc-600" />
                      </div>
                    )}

                    {/* Private overlay */}
                    {item.is_private && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md">
                        <Lock className="size-8 text-zinc-400 mb-2" />
                        <p className="text-sm font-medium text-zinc-300">
                          Sign up to view
                        </p>
                      </div>
                    )}

                    {/* Bottom gradient overlay with name */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-16">
                      <p className="text-sm font-semibold text-white truncate">
                        {item.profiles?.display_name || "Anonymous"}
                      </p>
                      {item.caption && (
                        <p className="text-xs text-zinc-400 truncate mt-0.5">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More */}
            {pagination && page < pagination.totalPages && (
              <div className="mt-10 flex justify-center">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800 hover:text-white px-8 h-12"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    "Load More"
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
