<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/handshake.svg" width="80" alt="WithMe Logo" />
  <h1>WithMe</h1>
  <p><strong>A safe, anonymous peer support community for people going through hard times.</strong></p>
  
  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#deployment">Deployment</a>
  </p>
</div>

---

## 🌟 About WithMe

WithMe is a premium, modern web application designed to help people connect over shared struggles. It's not about advice or therapy—it's about the profound relief of knowing **you are not alone**. 

With a beautiful dark-glassmorphism UI, real-time chats, voice/video call integration, and complete anonymity, WithMe provides a safe haven for authentic human connection.

---

## ✨ Premium Features

- 🎭 **100% Anonymous Venting** — A judgment-free space to let it out. Shield avatars protect your identity.
- 🤝 **Support Circles** — Dedicated groups for Anxiety, Grief, Burnout, Loneliness, and more.
- 💬 **Real-time Chat & Reactions** — Fluid, instant messaging with supportive micro-interactions ("I hear you", "Sending warmth").
- 📎 **File Attachments** — Share images and documents directly within your Circles.
- 📞 **Voice & Video Ready** — Built-in UI to start instant calls with your support group.
- 🟢 **Live Presence indicators** — See how many members are actively online right now.
- 📅 **Daily Check-ins** — Track your mood and build healthy habits over time.
- 👤 **Customizable Profiles** — Upload an avatar, track your journey stats, and manage your privacy.
- 🎨 **World-class Design** — A breathtaking dark theme with glassmorphism, gradient glows, and butter-smooth micro-animations.

---

## 🛠️ Tech Stack

WithMe is built for speed, security, and scalability.

- **Frontend Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Styling:** Vanilla CSS with custom properties & glassmorphism
- **Icons:** Lucide React
- **Backend & Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Email/Password)
- **File Storage:** Supabase Storage
- **Real-time:** Supabase Channels & Subscriptions

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- Node.js (v18 or newer)
- A free [Supabase](https://supabase.com) account

### 2. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/withme.git
cd withme
```

### 3. Install dependencies
```bash
npm install
```

### 4. Setup Supabase Database
1. Create a new project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `SUPABASE_SETUP.sql` from this repository and run it. This creates all tables, Row Level Security (RLS) policies, and seed data.

### 5. Setup Environment Variables
Connect the app to your database. Open `src/lib/supabase.js` and add your project URL and anon public key:
```js
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```
*(For production, these should be moved to a `.env` file!)*

### 6. Run the app
```bash
npm run dev
```
Open **http://localhost:5173** to see the app!

---

## 🌍 Launching to the World (Deployment)

To launch WithMe to the public, we recommend deploying the frontend on **Vercel** or **Netlify**, while keeping the backend on Supabase.

### Deploying to Vercel (Easiest)

1. Connect your GitHub repository to [Vercel](https://vercel.com/new).
2. Vercel will automatically detect that it's a Vite + React project.
3. Add any necessary Environment Variables (if using `.env`).
4. Click **Deploy**. In less than 2 minutes, your app will be live globally!

### Supabase Production Readiness
- Ensure your Row Level Security (RLS) policies are active (already handled in `SUPABASE_SETUP.sql`).
- Set up Supabase Storage buckets:
  - Create a public bucket named `avatars`
  - Create a public bucket named `attachments`

---

## 🛡️ Privacy & Safety
WithMe prioritizes user safety. It uses strict PostgreSQL Row Level Security to ensure users can only modify their own data, while maintaining the anonymity required for a vulnerable support space.

---
<div align="center">
  <p>Built with ❤️ for those who need a safe space.</p>
</div>
