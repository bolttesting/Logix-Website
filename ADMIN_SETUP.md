# Admin Panel Setup

The admin panel lets you manage portfolio projects, blog posts, team members, testimonials, contact info, and view contact form submissions.

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (choose a name, password, region)
3. Wait for the project to finish provisioning

## 2. Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy the contents of `supabase/schema.sql` and paste it
4. Click **Run**
5. (Optional) Run `supabase/seed.sql` to add sample data

## 3. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter your email and a secure password
4. This user can log in at `/admin`

## 4. Configure Environment

1. Copy `.env.example` to `.env`
2. In Supabase, go to **Settings** → **API**
3. Copy the **Project URL** and **anon public** key
4. In `.env`:
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
5. Restart the dev server: `npm run dev`

## 5. Access Admin

- Go to **http://localhost:5173/admin** (or your deployed URL + /admin)
- Log in with the email and password you created
- Use the sidebar to manage content

## What You Can Manage

| Section | Actions |
|---------|---------|
| **Portfolio** | Add, edit, delete projects |
| **Blog** | Add, edit, delete posts |
| **Team** | Add, edit, delete team members |
| **Testimonials** | Add, edit, delete testimonials |
| **Services** | View service menu (full editing coming soon) |
| **Settings** | Update email, phone, address, hours |
| **Contacts** | View and delete form submissions |

## Notes

- Contact form submissions are saved to Supabase when configured
- Images: Use URLs (e.g. `/portfolio/1.jpg` or full URLs). For file uploads, you can add Supabase Storage later.
- The site works without Supabase using static data. Admin CRUD only works when Supabase is configured.
