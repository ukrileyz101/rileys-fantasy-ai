# Advanced AI Memory — LUXE 10.0

This build keeps the existing no-sign-in website and six Creative Studio tools.

In Settings, enable **Use Creative Studio details in AI Chat** (off by default). Then send a new AI Chat message. The app includes bounded reference notes from saved Creative Studio timelines, map pins and relationships in the AI system prompt. It also includes brief notes on other chat characters. No external account or database is required for memory storage.

**Requirements:** A working AI backend URL in Settings. Memory does not create AI replies by itself. The enabled context is sent to that backend, so do not enable it for information you do not wish to share. Existing messages are not retroactively rewritten. Timeline data is limited to a small ordered set of events, not a full searchable database.

**Testing:** Create a timeline with a distinctive event, enable AI Memory, start a new AI Chat and ask about that event. Disable AI Memory and check it no longer supplies that context. Browser-local data does not sync across devices.

Back up your existing data before replacing GitHub files.
