"use client";

import { useState, useEffect } from "react";
import { Coins, Check, Zap, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOKEN_BUNDLES } from "@/lib/constants";

export default function BuyTokensPage() {
  const [selectedBundle, setSelectedBundle] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setCurrentBalance(data.stats?.tokensBalance ?? 0);
        }
      } catch {
        // Silently fail; show 0
        setCurrentBalance(0);
      } finally {
        setBalanceLoading(false);
      }
    }
    fetchBalance();
  }, []);

  async function handlePurchase() {
    setLoading(true);
    try {
      // Create CCBill checkout session
      const response = await fetch("/api/tokens/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleIndex: selectedBundle }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Buy Tokens</h1>
        <p className="text-gray-400">
          Tokens are used to vote for your favorite contestants. Each $5 token gives you 5 votes to use on any contestant.
        </p>
      </div>

      {/* Current Balance */}
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Coins className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <div className="text-sm text-amber-400">Current Balance</div>
            <div className="text-3xl font-bold text-white">
              {balanceLoading ? (
                <Loader2 className="size-6 animate-spin text-amber-500 inline-block" />
              ) : (
                <>{currentBalance} Tokens</>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Token Bundles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TOKEN_BUNDLES.map((bundle, index) => (
          <button
            key={index}
            onClick={() => setSelectedBundle(index)}
            className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
              selectedBundle === index
                ? "border-amber-500 bg-amber-500/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            {"savings" in bundle && bundle.savings && (
              <div className="absolute -top-3 right-4 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                {bundle.savings}
              </div>
            )}
            {selectedBundle === index && (
              <div className="absolute top-3 right-3">
                <Check className="h-5 w-5 text-amber-500" />
              </div>
            )}
            <div className="text-3xl font-bold text-white mb-1">
              {bundle.amount}
            </div>
            <div className="text-sm text-gray-400 mb-3">{bundle.label}</div>
            <div className="text-xl font-semibold text-amber-400">
              ${bundle.price}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ${(bundle.price / bundle.amount).toFixed(2)}/token ({bundle.amount * 5} votes)
            </div>
          </button>
        ))}
      </div>

      {/* Purchase Button */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={handlePurchase}
          disabled={loading}
          className="bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg px-12 h-14 w-full sm:w-auto"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <Zap className="mr-2 h-5 w-5" />
              Buy {TOKEN_BUNDLES[selectedBundle].amount} Token
              {TOKEN_BUNDLES[selectedBundle].amount > 1 ? "s" : ""} for $
              {TOKEN_BUNDLES[selectedBundle].price}
            </>
          )}
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure payment powered by CCBill</span>
        </div>
      </div>
    </div>
  );
}
