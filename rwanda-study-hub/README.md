# MaximizeHub

MaximizeHub is a production-ready educational SaaS platform built with Next.js, TypeScript, Tailwind CSS and Supabase.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

Create a Supabase project and configure the following environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Create a storage bucket named `resources` and make it public or configure the appropriate access policies.

Run the schema in `supabase/schema.sql` to create tables:

- `subjects`
- `resources`
- `mcqs`
- `users`

## Admin Access

Admin accounts must be assigned the `admin` role in the `users` table. Student accounts are created automatically when they sign in.

## Routes

- `/` — Landing page
- `/login` — Sign in / sign up
- `/subjects` — Topic overview
- `/resources` — Resource browser with filters
- `/mcqs` — MCQ practice
- `/past-papers` — Past paper library
- `/admin` — Admin dashboard
- `/admin/upload` — Upload PDFs
- `/admin/resources` — Manage uploaded resources
- `/admin/questions` — Create MCQs

## Notes

This project uses Supabase for:

- Auth
- Storage
- Database queries

All student-facing pages are database-driven and admin routes require role-based access.
