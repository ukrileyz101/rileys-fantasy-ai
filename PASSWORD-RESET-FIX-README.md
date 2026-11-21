# Password recovery fix

This build adds a dedicated **Set your new password** screen, confirmation field, and Supabase `updateUser` handling for recovery links.

**Important:** Supabase redirects recovery links to the **Site URL configured in Supabase**, currently the GitHub Pages website. Opening the extracted `index.html` file locally will not update the live GitHub Pages site. To test recovery, first deploy this updated build to the exact GitHub Pages URL set under Authentication > URL Configuration, preferably using a separate test repository and matching redirect URL before replacing your public site.

Steps: request Forgot Password, open the email link, enter and confirm the new password, save, then sign out and sign back in with the new password.

If the recovery link opens an older deployed website, the new password form will not appear.

Never put Supabase secret keys in frontend files.
