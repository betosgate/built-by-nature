export const TOKEN_PRICE = 5; // $5 per token
export const VOTES_PER_TOKEN = 5; // Each token = 5 votes
export const MAX_TOKENS_PER_DAY = 20; // Max 20 tokens/day = 100 votes/day

export const TOKEN_BUNDLES = [
  { amount: 1, price: 5, label: "1 Token (5 Votes)" },
  { amount: 5, price: 20, label: "5 Tokens (25 Votes)", savings: "Save $5" },
  { amount: 10, price: 35, label: "10 Tokens (50 Votes)", savings: "Save $15" },
  { amount: 25, price: 75, label: "25 Tokens (125 Votes)", savings: "Save $50" },
] as const;

export const MAX_VOTES_PER_DAY = 100; // 20 tokens x 5 votes each

export const CONTESTANT_EARNINGS_PERCENT = 0.2; // 20%
export const RECRUITER_EARNINGS_PERCENT = 0.1; // 10%

export const ROLES = {
  FAN: "fan",
  CONTESTANT: "contestant",
  ADMIN: "admin",
  RECRUITER: "recruiter",
} as const;

export const CONTEST_STATUS = {
  DRAFT: "draft",
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
} as const;

export const ENTRY_STATUS = {
  PENDING: "pending",
  ACTIVE: "active",
  ELIMINATED: "eliminated",
  WINNER: "winner",
} as const;
