-- Add slug column for vanity URLs (builtbynature.com/chosen-name)
alter table public.profiles add column if not exists slug text unique;

-- Index for fast slug lookups
create index if not exists idx_profiles_slug on public.profiles(slug) where slug is not null;

-- Validate slug format: lowercase alphanumeric + hyphens, 3-30 chars
alter table public.profiles add constraint chk_slug_format
  check (slug is null or (slug ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$'));

-- Prevent reserved slugs
alter table public.profiles add constraint chk_slug_reserved
  check (slug is null or slug not in (
    'admin', 'account', 'dashboard', 'contests', 'contestants', 'explore',
    'login', 'signup', 'forgot-password', 'api', 'about', 'recruit',
    'rules', 'terms', 'privacy', 'cookies', 'dmca', 'compliance',
    'complaints', 'acceptable-use', 'present', 'contestant', 'settings',
    'upload', 'messages', 'earnings', 'tokens', 'profile', 'search'
  ));
