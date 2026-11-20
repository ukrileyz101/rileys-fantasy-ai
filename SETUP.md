# Riley’s Fantasy AI — Login and cloud chat sync

The login screen is included, but **cloud accounts are not active until you connect your own Supabase project**. Do not tell users their chats are backed up before setup.

1. Create a Supabase project at https://supabase.com and open **SQL Editor**. Run `supabase_setup.sql`.
2. Under **Authentication → Providers → Email**, enable email/password login. Choose whether email confirmation is required.
3. Under **Authentication → URL Configuration**, set your Site URL to `https://ukrileyz101.github.io/fantasy-chat-ai/` and add this as an allowed redirect URL.
4. Under **Project Settings → API** (or the Connect dialog), copy your project URL and **publishable / anon** key into `config.js`. Never paste a `service_role` or secret key into GitHub.
5. Upload `index.html`, `config.js`, both artwork files and `welcome-music.mp3` to the repository root. `supabase_setup.sql` and this README are optional to publish.
6. Test with **two different accounts and two browsers**. Each account should see only its own chats.

**Important:** Supabase Row Level Security enforces per-user access to saved chat data. This is not end-to-end encryption. Supabase project administrators and services with elevated database access may be able to access stored data. Do not promise that administrators are technically unable to read it.

The app stores chat data as one JSON document per user. This is suitable as a starter prototype, not a production chat database: concurrent edits on multiple devices can overwrite one another; uploaded avatar images increase storage size; the JSON row can become large. For a production launch, move messages to per-chat tables with conflict handling, storage quotas and appropriate abuse protection.

Guest conversations remain in the current browser's local storage. On first sign-in, guest chats are copied to the account if their IDs aren't already there. The guest copy remains on the device. Do not use a shared browser profile for sensitive conversations.

The real AI backend is still separate and not automatically enabled by this update. You must secure it with authentication and rate limiting before opening it to the public.

The MP3 in this package is a commercial recording; publish it only if you have the necessary rights to distribute it on your website. iOS Safari may block sound autoplay until user interaction.

## Six-digit email verification (required)

In Supabase **Authentication → Providers → Email**, enable email confirmations. Under **Authentication → Email Templates → Confirm signup**, change the template to include `{{ .Token }}` (the six-digit one-time code), **not only** `{{ .ConfirmationURL }}`. For example: `Your Riley's Fantasy AI verification code is: {{ .Token }}`. Supabase generates unique expiring codes and emails them; this website does not generate fake codes. The email delivery provider, OTP expiry, resend limits and deliverability must be configured in Supabase. Default email sending limits may be too restrictive for a public app; configure a suitable SMTP provider before launch.

The flow is Welcome → Sign in / Create account → email code (new registrations) → main app. If Supabase is unconfigured, only a clearly labelled local guest mode is available, and it does not sync across devices. Username is stored in Supabase Auth user metadata, not guaranteed globally unique. For unique usernames, implement a server-enforced profiles table with a unique constraint. Never put a service role key in public files.
