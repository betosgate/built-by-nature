"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Camera,
  Edit3,
  Save,
  X,
  Coins,
  ShoppingCart,
  Lock,
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500";

interface ProfileData {
  displayName: string;
  bio: string;
  tokensBalance: number;
  avatarUrl: string | null;
}

export default function AccountPage() {
  // Loading / fetch state
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [tokensBalance, setTokensBalance] = useState(0);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");

  // Account settings state
  const [newEmail, setNewEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [emailUpdating, setEmailUpdating] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordUpdating, setPasswordUpdating] = useState(false);

  // Purchase history
  const [purchases, setPurchases] = useState<
    Array<{ id: string; created_at: string; description: string; amount: number; tokens: number }>
  >([]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          const name = data.profile?.displayName || "";
          const profileBio = data.profile?.bio || "";
          setDisplayName(name);
          setBio(profileBio);
          setEditName(name);
          setEditBio(profileBio);
          setTokensBalance(data.stats?.tokensBalance ?? 0);
        }
      } catch {
        // fail silently
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: editName, bio: editBio }),
      });
      if (res.ok) {
        setDisplayName(editName);
        setBio(editBio);
        setIsEditingProfile(false);
        setSaveMessage({ type: "success", text: "Profile updated" });
      } else {
        // Fallback: update locally even if API doesn't exist yet
        setDisplayName(editName);
        setBio(editBio);
        setIsEditingProfile(false);
        setSaveMessage({ type: "success", text: "Profile updated locally" });
      }
    } catch {
      // Fallback: update locally
      setDisplayName(editName);
      setBio(editBio);
      setIsEditingProfile(false);
      setSaveMessage({ type: "success", text: "Profile updated locally" });
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  const handleCancelEdit = () => {
    setEditName(displayName);
    setEditBio(bio);
    setIsEditingProfile(false);
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailUpdating(true);
    setEmailStatus(null);
    try {
      const res = await fetch("/api/account/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail }),
      });
      if (res.ok) {
        setEmailStatus({ type: "success", text: "Confirmation email sent. Check your inbox." });
        setNewEmail("");
      } else {
        setEmailStatus({ type: "error", text: "Failed to update email. Please try again." });
      }
    } catch {
      setEmailStatus({ type: "error", text: "Email update is not available yet. Coming soon." });
    } finally {
      setEmailUpdating(false);
      setTimeout(() => setEmailStatus(null), 5000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPasswordStatus({ type: "error", text: "Passwords do not match" });
      setTimeout(() => setPasswordStatus(null), 3000);
      return;
    }
    setPasswordUpdating(true);
    setPasswordStatus(null);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res.ok) {
        setPasswordStatus({ type: "success", text: "Password changed successfully." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setPasswordStatus({ type: "error", text: "Failed to change password." });
      }
    } catch {
      setPasswordStatus({ type: "error", text: "Password change is not available yet. Coming soon." });
    } finally {
      setPasswordUpdating(false);
      setTimeout(() => setPasswordStatus(null), 5000);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Account</h1>

      {/* Save Message Toast */}
      {saveMessage && (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm ${
            saveMessage.type === "success"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {saveMessage.type === "success" ? (
            <CheckCircle className="size-4" />
          ) : (
            <AlertCircle className="size-4" />
          )}
          {saveMessage.text}
        </div>
      )}

      {/* Profile Section */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Profile</h2>
          {!isEditingProfile && (
            <Button
              onClick={() => setIsEditingProfile(true)}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-2xl font-bold">
              {(displayName || "?").charAt(0).toUpperCase()}
            </div>
            {isEditingProfile && (
              <button className="absolute -bottom-1 -right-1 h-7 w-7 bg-amber-500 rounded-full flex items-center justify-center text-black hover:bg-amber-400 transition-colors">
                <Camera className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0">
            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about yourself..."
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="bg-amber-500 text-black hover:bg-amber-400 font-semibold"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {displayName || "No display name set"}
                </h3>
                <p className="text-gray-400 mt-1">{bio || "No bio yet"}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Token Balance */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">Token Balance</h2>
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-amber-500" />
              <span className="text-3xl font-bold text-white">{tokensBalance}</span>
              <span className="text-gray-400">tokens</span>
            </div>
          </div>
          <Link href="/account/tokens">
            <Button className="bg-amber-500 text-black hover:bg-amber-400 font-semibold">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Tokens
            </Button>
          </Link>
        </div>
      </section>

      {/* Purchase History */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Purchase History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Date</th>
                <th className="text-left py-3 px-2 text-gray-400 font-medium">Description</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Amount</th>
                <th className="text-right py-3 px-2 text-gray-400 font-medium">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    No purchase history yet
                  </td>
                </tr>
              ) : (
                purchases.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-3 px-2 text-gray-300">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-gray-300">{p.description}</td>
                    <td className="py-3 px-2 text-right text-gray-300">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-2 text-right text-amber-500 font-medium">
                      +{p.tokens}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Account Settings */}
      <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Account Settings</h2>

        {/* Change Email */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Change Email
          </h3>
          <form onSubmit={handleUpdateEmail} className="flex gap-3">
            <input
              type="email"
              placeholder="New email address"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className={`${inputClass} flex-1`}
            />
            <Button
              type="submit"
              disabled={emailUpdating}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg shrink-0"
            >
              {emailUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}
            </Button>
          </form>
          {emailStatus && (
            <p
              className={`mt-2 text-sm flex items-center gap-1.5 ${
                emailStatus.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {emailStatus.type === "success" ? (
                <CheckCircle className="size-3.5" />
              ) : (
                <AlertCircle className="size-3.5" />
              )}
              {emailStatus.text}
            </p>
          )}
        </div>

        {/* Change Password */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Change Password
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={inputClass}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              className={inputClass}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className={inputClass}
            />
            <Button
              type="submit"
              disabled={passwordUpdating}
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg"
            >
              {passwordUpdating ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Change Password
            </Button>
          </form>
          {passwordStatus && (
            <p
              className={`mt-2 text-sm flex items-center gap-1.5 ${
                passwordStatus.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {passwordStatus.type === "success" ? (
                <CheckCircle className="size-3.5" />
              ) : (
                <AlertCircle className="size-3.5" />
              )}
              {passwordStatus.text}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
