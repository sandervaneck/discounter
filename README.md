# Discounter

A Next.js application for influencers and restaurants to manage discount codes with Instagram authentication.

## Prerequisites

- Node.js 18+
- PostgreSQL database
- npm
- Facebook/Instagram developer credentials

## Installation

1. **Clone and install dependencies**
   ```bash
   npm install
   ```
2. **Environment variables**
   - Copy `.env.local.example` to `.env.local` and fill in the values.
3. **Apply database migrations and generate Prisma client**
   ```bash
   npx prisma migrate dev
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```

## Important URLs

- `/` – Landing page with login and registration.
- `/user` – Influencer dashboard.
- `/restaurant` – Restaurant dashboard.
- `/cashier` – Discount code scanner.
- `/instagram-callback` – Handles Instagram token delivery.
- `/api/auth/signup` – User registration API.
- `/api/auth/me` – Fetch current session user.
- `/api/meta/login` – Initiates Facebook login.
- `/api/meta/callback` – Handles Facebook OAuth callback.

## Building for Production

```bash
npm run build
npm start
```

