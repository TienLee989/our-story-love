-- Run once in a NEW Supabase project. Create two Auth users first.
create table public.story_members (user_id uuid primary key references auth.users(id));
alter table public.story_members enable row level security;
create policy member_self on public.story_members for select to authenticated using (user_id=auth.uid());
create table public.story_state (id integer primary key check(id=1), payload jsonb not null default '{}', revision bigint not null default 0);
insert into public.story_state(id) values(1);
alter table public.story_state enable row level security;
create policy story_read on public.story_state for select to authenticated using (exists(select 1 from public.story_members where user_id=auth.uid()));
create policy story_write on public.story_state for update to authenticated using (exists(select 1 from public.story_members where user_id=auth.uid())) with check (exists(select 1 from public.story_members where user_id=auth.uid()));
revoke all on public.story_state from anon;
grant select,update on public.story_state to authenticated;
grant select on public.story_members to authenticated;
insert into storage.buckets(id,name,public) values('story-media','story-media',false);
create policy media_read on storage.objects for select to authenticated using(bucket_id='story-media' and exists(select 1 from public.story_members where user_id=auth.uid()));
create policy media_insert on storage.objects for insert to authenticated with check(bucket_id='story-media' and exists(select 1 from public.story_members where user_id=auth.uid()));
create policy media_update on storage.objects for update to authenticated using(bucket_id='story-media' and exists(select 1 from public.story_members where user_id=auth.uid())) with check(bucket_id='story-media' and exists(select 1 from public.story_members where user_id=auth.uid()));
-- Replace the two UUIDs with the IDs from Authentication > Users, then run separately:
-- insert into public.story_members values ('UUID-1'), ('UUID-2');
