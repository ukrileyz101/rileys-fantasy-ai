# Account testing build — not production ready
1. In Supabase SQL Editor, run ACCOUNTS-SETUP.sql.
2. In Authentication > URL Configuration, set Site URL to your deployed GitHub Pages URL and add it under Redirect URLs (including the trailing slash).
3. Test using a temporary HTTPS test deployment. Opening index.html as a file:// page is NOT suitable for email confirmation/recovery.
4. Open Account / Cloud, create account, confirm email, sign in.
5. Download a local backup. On your ORIGINAL device choose Upload this device’s data.
6. On another device sign in and choose Restore cloud data. Reload and check stories and Creative Studio tools.
7. Make a small change and wait several seconds to test autosync.

IMPORTANT: The cloud sync currently covers the app's main localStorage document riley-fantasy-private-v1 only. Other standalone localStorage settings may not sync. No conflict resolution between simultaneous edits; last upload wins. Large images can exceed database/browser limits. Do not test with irreplaceable data. Always export a backup. Do not publish publicly until security and mobile testing are complete.
