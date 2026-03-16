# Sumz-Ai

**SumzAI** — AI-powered PDF summarizer. Upload PDFs, get dual AI summaries (OpenAI GPT-4o + Google Gemini 1.5 Flash) in one place.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/atulmint/Sumz-Ai)

---

## ✨ Features

- 📤 **Drag & Drop PDF Upload** — powered by UploadThing
- 🤖 **Dual AI Summarization** — OpenAI GPT-4o + Google Gemini 1.5 Flash
- 🔐 **Authentication** — Clerk (Google OAuth + Email/Password)
- 💳 **Freemium Payments** — Stripe subscriptions with webhooks
- 🗃️ **Database** — Supabase (PostgreSQL) with full history
- 📱 **Responsive** — mobile-first design
- ⚡ **Fast** — serverless on Vercel

---

## 🧱 Tech Stack

| Layer           | Technology                           |
|----------------|--------------------------------------|
| Framework      | Next.js 15 (App Router)              |
| Language       | TypeScript                           |
| Styling        | Tailwind CSS v4 + shadcn/ui (Radix)  |
| Auth           | Clerk                                |
| File Upload    | UploadThing                          |
| AI             | OpenAI GPT-4o, Google Gemini 1.5     |
| DB             | Supabase (PostgreSQL)                |
| Payments       | Stripe                               |
| Deployment     | Vercel                               |
| Animations     | Framer Motion, Motion                |
| PDF Parsing    | pdf-parse                            |
| Validation     | Zod                                  |

---

## 📁 Project Structure

```
Sumz-Ai/
├── public/
│   ├── favicon/
│   ├── SumaristaAI-logo.webp
│   ├── opengraph-image.png
│   └── site.webmanifest
│
├── src/
│   ├── actions/
│   │   ├── summary-actions.ts    # Summary CRUD, AI processing
│   │   ├── upload-actions.ts     # PDF upload flow
│   │   └── user-actions.ts       # User / payment actions
│   │
│   ├── app/
│   │   ├── (logged-in)/
│   │   │   ├── dashboard/        # Dashboard overview
│   │   │   ├── summaries/[id]/   # Single summary view
│   │   │   ├── upload/           # Upload PDF page
│   │   │   └── layout.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── cron/             # Cron jobs
│   │   │   ├── payments/         # Stripe webhook
│   │   │   ├── sign-up/          # Clerk webhook
│   │   │   └── uploadthing/      # File upload API
│   │   │
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── common/               # Header, footer, nav, gradients
│   │   ├── home/                 # Hero, demo, how-it-works, pricing
│   │   ├── summaries/            # Summary viewer, cards, controls
│   │   ├── ui/                   # Button, card, dialog, badge, etc.
│   │   └── upload/               # Upload form, dropzone
│   │
│   ├── lib/
│   │   ├── db.ts                 # Supabase client
│   │   ├── gemini.ts
│   │   ├── langchain.ts
│   │   ├── openai.ts
│   │   ├── payments.ts
│   │   ├── summaries.tsx
│   │   └── user.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── demo-summary.ts
│   │   ├── format-utils.ts
│   │   ├── helpers.ts
│   │   ├── prompts.ts
│   │   ├── summary-helpers.tsx
│   │   └── uploadthing.ts
│   │
│   └── middleware.ts             # Clerk auth + route protection
│
├── schema.sql                    # Supabase schema
├── next.config.ts
├── package.json
└── tailwind.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase
- Clerk
- UploadThing
- OpenAI API key
- Google Gemini API key
- Stripe (for payments)

### Install

```bash
git clone https://github.com/atulmint/Sumz-Ai.git
cd ai-saas-summarizer
npm install
``

### Configure

Copy `.env.example` to `.env.local` and set your keys:

- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
- `UPLOADTHING_TOKEN`
- `OPENAI_API_KEY` / `GEMINI_API_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` / `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`

Run the schema in Supabase:

```bash
# Apply schema.sql in Supabase SQL Editor
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📜 Scripts

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Dev server (Turbopack)|
| `npm run build`| Production build      |
| `npm run start`| Start production      |

---

## 🛠 Push to GitHub

```bash
git remote add origin https://github.com/atulmint/Sumz-Ai.git
git branch -M main
git push -u origin main
``

---

## 📄 License

MIT
