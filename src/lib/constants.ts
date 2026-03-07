export const TOKEN_PRICE = 5; // $5 per token

export const TOKEN_BUNDLES = [
  { amount: 1, price: 5, label: "1 Token" },
  { amount: 5, price: 20, label: "5 Tokens", savings: "Save $5" },
  { amount: 10, price: 35, label: "10 Tokens", savings: "Save $15" },
  { amount: 25, price: 75, label: "25 Tokens", savings: "Save $50" },
] as const;

export const MAX_VOTES_PER_DAY = 20;

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
