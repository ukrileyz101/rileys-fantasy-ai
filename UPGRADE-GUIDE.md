# Riley's Fantasy AI — Luxe 5.0

Built directly from the supplied `rileys-fantasy-ai-luxe-4(1).zip`.

## Upload to GitHub Pages
1. Extract this ZIP.
2. Open your `ukrileyz101/rileys-fantasy-ai` repository on GitHub.
3. Upload the `index.html` and all the image files from this ZIP to the repository root. Replace the existing `index.html` when prompted.
4. Commit changes and wait for GitHub Pages to publish. Refresh the site with Ctrl+F5.

**Keep a copy of the previous website and export a story backup before updating.**

## New features
- Back, Forward, Home and Cancel navigation; browser Back support.
- Story library search, character profiles, edit character, confirmation before deletion, temporary Undo.
- Chat controls: undo last message and regenerate reply (requires a working AI backend).
- Live Character Studio preview and local draft autosave.
- JSON export and import of all local chats/settings.
- More colour themes: gold, teal and rose, alongside the existing five.
- Responsive UI enhancements and reduced-motion support.

## Existing data and limitations
- Preserves original `riley-fantasy-private-v1` localStorage key and chat schema. Existing chats on the same browser/device should remain intact.
- Story data is saved locally, **not synchronised between devices**. Backups contain private chats and may include your backend URL. Store them privately.
- AI replies still depend on your existing Cloudflare Worker endpoint, its quotas and any configured provider limits. This update does not provide unlimited AI usage.
- Undo of a deleted story lasts until you close or refresh the browser tab; export backups for durable recovery.
- The previous welcome-screen audio and artwork remain included, as requested to preserve existing features.
