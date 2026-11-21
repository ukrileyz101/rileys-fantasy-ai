-- Run in Supabase Dashboard > SQL Editor > New query, then Run.
-- Private JSON document per signed-in user. No anonymous access.
create table if not exists public.user_chat_data (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.user_chat_data enable row level security;
revoke all on public.user_chat_data from anon;
grant select,insert,update,delete on public.user_chat_data to authenticated;
drop policy if exists "read own chats" on public.user_chat_data;
drop policy if exists "insert own chats" on public.user_chat_data;
drop policy if exists "update own chats" on public.user_chat_data;
drop policy if exists "delete own chats" on public.user_chat_data;
create policy "read own chats" on public.user_chat_data for select to authenticated using ((select auth.uid()) = user_id);
create policy "insert own chats" on public.user_chat_data for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "update own chats" on public.user_chat_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "delete own chats" on public.user_chat_data for delete to authenticated using ((select auth.uid()) = user_id);
