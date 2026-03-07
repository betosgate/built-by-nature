"use client";

import { useEffect, useState, useCallback } from "react";
import { Send, Search, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_id: string;
  recipient_id: string;
  profiles: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface ConversationPartner {
  id: string;
  displayName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePartnerId, setActivePartnerId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const json = await res.json();
      setMessages(json.messages);
      setUserId(json.userId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Group messages into conversations by partner
  const conversations: ConversationPartner[] = (() => {
    if (!userId) return [];
    const partnerMap = new Map<string, ConversationPartner>();

    for (const msg of messages) {
      const partnerId =
        msg.sender_id === userId ? msg.recipient_id : msg.sender_id;
      const existing = partnerMap.get(partnerId);

      const senderName =
        msg.sender_id !== userId
          ? msg.profiles?.display_name || "Unknown"
          : null;

      if (!existing) {
        partnerMap.set(partnerId, {
          id: partnerId,
          displayName: senderName || partnerMap.get(partnerId)?.displayName || "User",
          lastMessage: msg.content,
          lastMessageTime: msg.created_at,
          unreadCount:
            msg.recipient_id === userId && !msg.is_read ? 1 : 0,
        });
      } else {
        if (senderName && existing.displayName === "User") {
          existing.displayName = senderName;
        }
        if (msg.recipient_id === userId && !msg.is_read) {
          existing.unreadCount++;
        }
      }
    }

    // Second pass: fill in display names from sender profiles for outgoing messages
    for (const msg of messages) {
      if (msg.sender_id !== userId) {
        const partner = partnerMap.get(msg.sender_id);
        if (partner && partner.displayName === "User" && msg.profiles?.display_name) {
          partner.displayName = msg.profiles.display_name;
        }
      }
    }

    return Array.from(partnerMap.values()).sort(
      (a, b) =>
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
    );
  })();

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !activePartnerId) {
      setActivePartnerId(conversations[0].id);
    }
  }, [conversations, activePartnerId]);

  // Filter conversation thread
  const thread = messages
    .filter(
      (m) =>
        activePartnerId &&
        ((m.sender_id === userId && m.recipient_id === activePartnerId) ||
          (m.sender_id === activePartnerId && m.recipient_id === userId))
    )
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

  const activeConvo = conversations.find((c) => c.id === activePartnerId);

  const filteredConversations = searchQuery
    ? conversations.filter((c) =>
        c.displayName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  async function handleSend() {
    if (!messageInput.trim() || !activePartnerId || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/dashboard/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId: activePartnerId,
          content: messageInput.trim(),
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setMessageInput("");
      await fetchMessages();
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }

  function formatMessageTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="size-8 animate-spin text-amber-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversation List */}
      <div className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950/50">
        <div className="border-b border-zinc-800 p-4">
          <h2 className="mb-3 text-lg font-bold">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <MessageSquare className="mb-3 size-8 text-zinc-700" />
              <p className="text-sm text-zinc-500">No messages yet</p>
            </div>
          ) : (
            filteredConversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActivePartnerId(convo.id)}
                className={`flex w-full items-center gap-3 border-b border-zinc-800/50 px-4 py-3 text-left transition-colors ${
                  activePartnerId === convo.id
                    ? "bg-amber-500/5 border-l-2 border-l-amber-500"
                    : "hover:bg-zinc-800/50"
                }`}
              >
                <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-amber-500">
                  {convo.displayName.charAt(0).toUpperCase()}
                  {convo.unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-3 items-center justify-center rounded-full bg-amber-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        convo.unreadCount > 0 ? "text-white" : "text-zinc-300"
                      }`}
                    >
                      {convo.displayName}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {formatTime(convo.lastMessageTime)}
                    </span>
                  </div>
                  <p
                    className={`truncate text-xs ${
                      convo.unreadCount > 0
                        ? "font-medium text-zinc-300"
                        : "text-zinc-500"
                    }`}
                  >
                    {convo.lastMessage}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex flex-1 flex-col">
        {activeConvo ? (
          <>
            {/* Thread Header */}
            <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
              <div className="flex size-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-amber-500">
                {activeConvo.displayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {activeConvo.displayName}
                </h3>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              {thread.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-zinc-500">No messages in this conversation</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {thread.map((msg) => {
                    const isMe = msg.sender_id === userId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                            isMe
                              ? "bg-amber-500 text-black"
                              : "bg-zinc-800 text-white"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p
                            className={`mt-1 text-[10px] ${
                              isMe ? "text-black/50" : "text-zinc-500"
                            }`}
                          >
                            {formatMessageTime(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t border-zinc-800 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/50 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && messageInput.trim()) {
                      handleSend();
                    }
                  }}
                />
                <Button
                  className="bg-amber-500 text-black hover:bg-amber-400"
                  size="icon"
                  onClick={handleSend}
                  disabled={sending || !messageInput.trim()}
                >
                  {sending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <MessageSquare className="mb-3 size-12 text-zinc-700" />
            <p className="text-sm text-zinc-500">No messages yet</p>
            <p className="mt-1 text-xs text-zinc-600">
              Messages from other users will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
