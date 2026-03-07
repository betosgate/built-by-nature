"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Heart, Loader2, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface ContestantItem {
  id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  total_earnings: number;
  created_at: string;
  totalVotes: number;
  activeContest: {
    id: string;
    name: string;
    status: string;
  } | null;
  contest_entries: any[];
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function ContestantsPage() {
  const [contestants, setContestants] = useState<ContestantItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
    setContestants([]);
  }, [debouncedSearch]);

  const fetchContestants = useCallback(
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
        });
        if (debouncedSearch) params.set("search", debouncedSearch);

        const res = await fetch(`/api/contestants?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          if (append) {
            setContestants((prev) => [...prev, ...(data.contestants || [])]);
          } else {
            setContestants(data.contestants || []);
          }
          setPagination(data.pagination || null);
        }
      } catch (err) {
        console.error("Failed to fetch contestants:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [debouncedSearch]
  );

  useEffect(() => {
    fetchContestants(page, page > 1);
  }, [page, fetchContestants]);

  const handleLoadMore = () => {
    if (pagination && page < pagination.totalPages) {
      setPage((p) => p + 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Our <span className="text-amber-500">Contestants</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Meet the talented individuals competing in our contests. Vote for
            your favorites and help them win.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10 max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-zinc-500" />
          <Input
            type="text"
            placeholder="Search contestants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-amber-500 focus:ring-amber-500/20"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="size-10 text-amber-500 animate-spin mb-4" />
            <p className="text-zinc-400">Loading contestants...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && contestants.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Users className="size-16 text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold mb-2">No contestants yet</h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              Be the first to join the competition! Sign up as a contestant and
              start competing today.
            </p>
            <Link href="/signup">
              <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold px-8 h-12">
                Sign Up as Contestant
              </Button>
            </Link>
          </div>
        )}

        {/* Contestants Grid */}
        {!loading && contestants.length > 0 && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {contestants.map((contestant) => (
                <Link
                  key={contestant.id}
                  href={`/contestant/${contestant.id}`}
                  className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                    {contestant.avatar_url ? (
                      <Image
                        src={contestant.avatar_url}
                        alt={contestant.display_name || "Contestant"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-800">
                        <Users className="size-12 text-zinc-600" />
                      </div>
                    )}

                    {/* Active contest badge */}
                    {contestant.activeContest && (
                      <Badge className="absolute right-2 top-2 bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                        <Trophy className="size-3 mr-1" />
                        {contestant.activeContest.name}
                      </Badge>
                    )}

                    {/* Bottom gradient overlay with name and votes */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-20">
                      <p className="text-sm font-semibold text-white truncate">
                        {contestant.display_name || "Anonymous"}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Heart className="size-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-xs text-zinc-400">
                          {contestant.totalVotes.toLocaleString()} votes
                        </span>
                      </div>
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
