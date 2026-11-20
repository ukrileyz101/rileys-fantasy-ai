# Community chat setup (required for public chat)

The community page is included, but it cannot share messages between visitors until you deploy a separate backend. GitHub Pages alone cannot store shared messages.

1. In Cloudflare, create a D1 database named `riley-community`.
2. Open the database console and run `community-schema.sql`.
3. Create a NEW Worker (do not replace the existing AI Worker). Paste `community-worker.js`.
4. Add a D1 binding with variable name `DB` pointing to the new database. Deploy.
5. Open `community-chat.html` on your website, paste the new Worker HTTPS URL, and click Connect.

IMPORTANT before inviting the public: add rate limiting, abuse reporting, moderation, spam filtering and a way to delete messages. This starter chat has no verified accounts, so names can be impersonated. Never share private information. The UI polls every 10 seconds; usage may incur Cloudflare charges. The chat is public, not encrypted end-to-end.
