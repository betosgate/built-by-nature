"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

const inputClass =
  "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500";

export default function AccountPage() {
  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState("Jane Doe");
  const [bio, setBio] = useState("Celebrating natural beauty.");
  const [editName, setEditName] = useState(displayName);
  const [editBio, setEditBio] = useState(bio);

  // Account settings state
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSaveProfile = () => {
    // TODO: Save profile to supabase
    // const { error } = await supabase.from('profiles').update({ display_name: editName, bio: editBio }).eq('id', user.id);
    setDisplayName(editName);
    setBio(editBio);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditName(displayName);
    setEditBio(bio);
    setIsEditingProfile(false);
  };

  const handleUpdateEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Update email via supabase auth
    // await supabase.auth.updateUser({ email: newEmail });
    console.log("Update email:", newEmail);
    setNewEmail("");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    // TODO: Change password via supabase auth
    // await supabase.auth.updateUser({ password: newPassword });
    console.log("Change password");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Account</h1>

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
              {displayName.charAt(0).toUpperCase()}
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
                    className="bg-amber-500 text-black hover:bg-amber-400 font-semibold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
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
                <h3 className="text-xl font-semibold text-white">{displayName}</h3>
                <p className="text-gray-400 mt-1">{bio}</p>
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
              <span className="text-3xl font-bold text-white">250</span>
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
              {/* TODO: Populate from database */}
              <tr className="border-b border-white/5">
                <td className="py-3 px-2 text-gray-300">2026-03-01</td>
                <td className="py-3 px-2 text-gray-300">Token Pack - Starter</td>
                <td className="py-3 px-2 text-right text-gray-300">$9.99</td>
                <td className="py-3 px-2 text-right text-amber-500 font-medium">+100</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-2 text-gray-300">2026-02-15</td>
                <td className="py-3 px-2 text-gray-300">Token Pack - Pro</td>
                <td className="py-3 px-2 text-right text-gray-300">$19.99</td>
                <td className="py-3 px-2 text-right text-amber-500 font-medium">+250</td>
              </tr>
              <tr>
                <td className="py-3 px-2 text-gray-300">2026-02-01</td>
                <td className="py-3 px-2 text-gray-300">Contest Entry - Spring Glow</td>
                <td className="py-3 px-2 text-right text-gray-300">--</td>
                <td className="py-3 px-2 text-right text-red-400 font-medium">-100</td>
              </tr>
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
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg shrink-0"
            >
              Update
            </Button>
          </form>
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
              className="bg-white/5 border border-white/10 text-white hover:bg-white/10 rounded-lg"
            >
              Change Password
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
