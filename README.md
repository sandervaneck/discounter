# Discounter

Discounter is a Next.js application that streamlines how influencers partner with restaurants to offer Instagram-powered discount codes. The platform authenticates both parties through Meta (Facebook/Instagram) and tracks which discount codes are claimed and redeemed in real time.

## Purpose

- **Influencers** can register, connect their Instagram accounts, and generate unique discount codes to promote restaurant partners.
- **Restaurants** gain a dashboard that tracks influencer performance, code redemptions, and enables staff to validate codes at the point of sale.
- **Cashiers** receive a focused scanning interface so they can confirm codes quickly without exposing administrative data.

## Prerequisites

- Node.js 18+
- npm
- A PostgreSQL database instance
- Facebook/Instagram developer credentials to configure OAuth

## Project Structure

| Path | Description |
| --- | --- |
| `src/app` | Next.js routes, layouts, and page components. |
| `src/components` | Shared UI components used across dashboards. |
| `prisma` | Prisma schema, migrations, and seed scripts. |
| `public` | Static assets served by Next.js. |

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local` and provide the required database connection string and Meta app credentials.
3. **Set up the database**
   ```bash
   npx prisma migrate dev
   ```
   Optionally seed sample data with:
   ```bash
   npx prisma db seed
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to access the landing page.

## Using the Application

### 1. Sign up & authenticate
- Navigate to `/` and sign up as either an influencer or restaurant.
- Follow the prompts to connect your Instagram account using Meta OAuth (configured via your credentials in `.env.local`).

### 2. Influencer dashboard (`/user`)
- Create or manage discount campaigns.
- Share the automatically generated discount codes via social media posts.
- Monitor code engagement metrics in real time.

### 3. Restaurant dashboard (`/restaurant`)
- Review which influencers are driving the most redemptions.
- Configure discounts, redemption rules, and monitor inventory if applicable.
- Export performance reports or sync data to external BI tools through the API.

### 4. Cashier scanner (`/cashier`)
- Enter or scan a discount code presented by a customer.
- Confirm validity, mark the code as redeemed, and provide immediate feedback to the guest.

## API Reference

These endpoints power the dashboards and can be consumed programmatically:

- `POST /api/auth/signup` – Register a new influencer or restaurant account.
- `GET /api/auth/me` – Fetch the currently authenticated user session.
- `GET /api/meta/login` – Start the Meta OAuth flow.
- `GET /api/meta/callback` – Handle the OAuth response and exchange for tokens.

## Deployment

1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```
3. Configure your hosting provider with the same environment variables used locally.

## Troubleshooting

- **OAuth errors**: Double-check the redirect URIs configured in your Meta app match `/api/meta/callback`.
- **Database connection failures**: Ensure the Postgres connection string in `.env.local` is reachable from the running environment.
- **Prisma client issues**: Re-run `npx prisma generate` after updating the schema.

