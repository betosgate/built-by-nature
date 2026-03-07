"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Search, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const conversations = [
  {
    id: "1",
    name: "Marcus Chen",
    avatar:
      "https://images.unsplash.com/photo-1754496763355-4a1081c1f58c?w=80&h=80&fit=crop",
    lastMessage: "Good luck in the Summer Glow contest!",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    name: "Contest Support",
    avatar:
      "https://images.unsplash.com/photo-1742567009397-c64925e0c3ba?w=80&h=80&fit=crop",
    lastMessage: "Your entry has been approved for Round 2.",
    time: "1h ago",
    unread: true,
  },
  {
    id: "3",
    name: "Jade Williams",
    avatar:
      "https://images.unsplash.com/photo-1725282641844-282ac49abd58?w=80&h=80&fit=crop",
    lastMessage: "Thanks for the collab idea! Let me think about it.",
    time: "3h ago",
    unread: false,
  },
  {
    id: "4",
    name: "Tyler Brooks",
    avatar:
      "https://images.unsplash.com/photo-1697739348487-75f668fdb6fb?w=80&h=80&fit=crop",
    lastMessage: "That photo shoot was amazing! Can you send me the edits?",
    time: "1d ago",
    unread: false,
  },
  {
    id: "5",
    name: "Luna Martinez",
    avatar:
      "https://images.unsplash.com/photo-1561780186-a11781cdb056?w=80&h=80&fit=crop",
    lastMessage: "See you at the next event!",
    time: "2d ago",
    unread: false,
  },
  {
    id: "6",
    name: "Sophia Kim",
    avatar:
      "https://images.unsplash.com/photo-1727896908913-dfb3d1bd2e8d?w=80&h=80&fit=crop",
    lastMessage: "Congrats on making Top 5!",
    time: "3d ago",
    unread: false,
  },
];

const messageThreads: Record<
  string,
  { id: string; sender: "me" | "them"; text: string; time: string }[]
> = {
  "1": [
    {
      id: "m1",
      sender: "them",
      text: "Hey Aria! I saw your entry in the Summer Glow contest. Amazing shot!",
      time: "10:15 AM",
    },
    {
      id: "m2",
      sender: "me",
      text: "Thanks Marcus! I spent hours getting the golden hour lighting just right.",
      time: "10:18 AM",
    },
    {
      id: "m3",
      sender: "them",
      text: "It really shows. The composition is perfect.",
      time: "10:20 AM",
    },
    {
      id: "m4",
      sender: "me",
      text: "That means a lot coming from you. Your fitness shots are always insane.",
      time: "10:22 AM",
    },
    {
      id: "m5",
      sender: "them",
      text: "Good luck in the Summer Glow contest!",
      time: "10:24 AM",
    },
  ],
  "2": [
    {
      id: "m1",
      sender: "them",
      text: "Hello Aria, this is an automated notification from BuiltByNature Contest Support.",
      time: "9:00 AM",
    },
    {
      id: "m2",
      sender: "them",
      text: "Your entry has been approved for Round 2 of the Natural Beauty Classic. Congratulations!",
      time: "9:00 AM",
    },
    {
      id: "m3",
      sender: "them",
      text: "Round 2 begins on March 12th. Please make sure your profile is up to date.",
      time: "9:01 AM",
    },
    {
      id: "m4",
      sender: "me",
      text: "Thank you! Looking forward to it.",
      time: "9:15 AM",
    },
    {
      id: "m5",
      sender: "them",
      text: "Your entry has been approved for Round 2.",
      time: "9:30 AM",
    },
  ],
};

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState("1");
  const [messageInput, setMessageInput] = useState("");

  const activeConvo = conversations.find((c) => c.id === activeConversation);
  const messages = messageThreads[activeConversation] || [];

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
              placeholder="Search conversations..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="overflow-y-auto">
          {conversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setActiveConversation(convo.id)}
              className={`flex w-full items-center gap-3 border-b border-zinc-800/50 px-4 py-3 text-left transition-colors ${
                activeConversation === convo.id
                  ? "bg-amber-500/5 border-l-2 border-l-amber-500"
                  : "hover:bg-zinc-800/50"
              }`}
            >
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={convo.avatar}
                  alt={convo.name}
                  fill
                  className="object-cover"
                />
                {convo.unread && (
                  <Circle className="absolute -right-0.5 -top-0.5 size-3 fill-amber-500 text-amber-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      convo.unread ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {convo.name}
                  </span>
                  <span className="text-xs text-zinc-500">{convo.time}</span>
                </div>
                <p
                  className={`truncate text-xs ${
                    convo.unread ? "font-medium text-zinc-300" : "text-zinc-500"
                  }`}
                >
                  {convo.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex flex-1 flex-col">
        {/* Thread Header */}
        {activeConvo && (
          <div className="flex items-center gap-3 border-b border-zinc-800 px-6 py-4">
            <div className="relative size-9 overflow-hidden rounded-full">
              <Image
                src={activeConvo.avatar}
                alt={activeConvo.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {activeConvo.name}
              </h3>
              <span className="text-xs text-zinc-500">Online</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === "me"
                      ? "bg-amber-500 text-black"
                      : "bg-zinc-800 text-white"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`mt-1 text-[10px] ${
                      msg.sender === "me"
                        ? "text-black/50"
                        : "text-zinc-500"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                  setMessageInput("");
                }
              }}
            />
            <Button
              className="bg-amber-500 text-black hover:bg-amber-400"
              size="icon"
              onClick={() => {
                if (messageInput.trim()) setMessageInput("");
              }}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
