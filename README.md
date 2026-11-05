# Bunker Club Asia — Nuxt migration prototype

Nuxt 3 / Nitro and MariaDB. This is a **partial migration**, not a production-ready or pixel-identical copy of the existing site. The repository initially contained no site source or assets; the layout and typography need verification against the original. Original image URLs are referenced remotely, not migrated, and the publicly accessible English page text was used where available. Thai currently covers navigation and new forms only, not all original content. Product details other than Metallic Racing Green, all original pages/assets and approved Thai copy still need to be migrated and checked. Product data is currently in `shared/products.ts`, not editable in the admin. No online ordering or payments are implemented.

## Local setup

1. Use Node 20+ and MariaDB. Create a database and a dedicated least-privilege database user. Import `database/schema.sql` into it.
2. Copy `.env.example` to `.env` and fill in `NUXT_DATABASE_URL`, `NUXT_ADMIN_PASSWORD_HASH` and `NUXT_SESSION_SECRET`. Generate a bcrypt hash and random secret with the commands in the example. URL-encode special characters in database credentials. Do not commit `.env`.
3. `npm ci` then `npm run dev`. Open `/admin` to sign in and see inquiries or reply to chat. The public site will render without a database, but submission and chat require one.
4. For production run `npm run build` and `node .output/server/index.mjs` with the environment variables configured in the hosting environment. Set `NUXT_SITE_URL` to the public URL. Put the app behind an HTTPS reverse proxy with request body size limits, persistent logging/monitoring, network restrictions for the database and regular encrypted backups.

## Behavior and limitations

- Quote and contact submissions are validated and saved in MariaDB; no email notification is sent. Admin can view the latest 500 inquiries.
- Chat messages are stored in MariaDB; visitors use a random HttpOnly cookie to retrieve their own conversation. Clearing the cookie loses access to it. Admin refreshes the conversation list and selects a conversation to see replies; the visitor widget polls every 10 seconds while open. No online presence or notifications are provided.
- Admin authentication uses a single configured bcrypt password and a signed eight-hour cookie. Logout clears the browser cookie but cannot revoke a copied cookie; rotate `NUXT_SESSION_SECRET` to invalidate all sessions. Add individual accounts, MFA and revocable server-side sessions before production.
- Basic origin checking, parameterized queries, security headers and in-memory rate limits are included. Rate limiting is per process and uses the request IP, so configure trusted proxy handling and a shared rate limiter/WAF for real deployments. Add a privacy policy, retention/deletion policy, access controls and a security review before collecting personal data.
- SEO includes readable paths, basic metadata, robots and a sitemap. Validate redirects from every existing URL, source language-specific URLs/hreflang, metadata and structured data against the final content before launch.
- Security cannot be guaranteed or maintained automatically: regularly update dependencies, monitor advisories, test and patch the deployment. At the time of implementation `npm audit` reported unresolved transitive Nuxt 3 advisories (11 findings: 2 low and 9 moderate); review and remediate before deployment.
