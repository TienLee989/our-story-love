# v1.8 — Local persistence + shared Supabase cloud
Deploy as before to GitHub Pages. Without configuration, IndexedDB stores story, new HD photos, tracks and video on the current browser. Existing local story is imported on first start; old playlist migration uses its existing IndexedDB. Keep the old domain and browser for migration. Export backups regularly.

## Shared cloud setup
1. Create a dedicated Supabase project. In Authentication > Users create two accounts (email/password); disable public signups. Use strong passwords, never commit passwords.
2. Run `supabase/setup.sql` in SQL Editor. Copy the two Auth user UUIDs and execute `insert into public.story_members values ('FIRST-UUID'), ('SECOND-UUID');` with real UUIDs.
3. Set `url` and `anonKey` in `cloud-config.js` using Project URL and public anon/publishable key. Never use service_role or secret keys. Push source to GitHub.
4. Open website, click cloud icon. Backup local data first. First authorized login initializes shared data; second login loads it after confirmation. Sync runs after edits and polls every 15 seconds. Sign in again after reload (session held in memory intentionally). Use Backup/Restore for offline transfer. If conflict, local state is retained; export backup before signing in again. No automatic merge.
5. Test both accounts and verify anonymous requests cannot access database/storage. No live Supabase project was available for verification.

## Privacy and limits
Cloud bucket is private with allowlist RLS. Static assets already in GitHub remain public, as does the website itself. Local cached data remains after logout; use trusted devices. Media removed from albums may remain in storage; no automatic garbage collection. Backup JSON contains private content, store securely. Cloud UI currently bilingual partial English/Vietnamese; original three-language UI retained. Browser quotas, Supabase storage limits and autoplay rules apply. Login expires with token; sign in again. Do not use a shared public browser.
