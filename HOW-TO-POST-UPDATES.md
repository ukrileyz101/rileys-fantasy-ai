# Publish announcements to everyone

1. Open your GitHub repository and select `updates.json`.
2. Click the pencil icon (Edit).
3. Add a new object at the **top** of the JSON array, using this example:

```json
{ "type": "ANNOUNCEMENT", "date": "21 November 2026", "title": "New characters coming", "message": "We are working on new characters and scenarios." },
```

4. Keep the comma after the new entry if another entry follows it.
5. Commit changes. Visitors will see the announcement after they refresh.

This is a public GitHub Pages website: changing settings on your own browser will NOT publish an update for everyone. The public `updates.json` file is the source of announcements.

Important: the website has no fixed message counter, but Cloudflare Workers AI may have quotas, rate limits or costs. Avoid promising unlimited AI responses.
