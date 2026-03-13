<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/handshake.svg" width="80" alt="WithMe Logo" />
  <h1>WithMe</h1>
  <p><strong>A safe, anonymous peer support community for people going through hard times.</strong></p>
  
  <p>
    <a href="https://with-me-app.vercel.app/"><strong>🔴 Live Demo</strong></a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#local-development">Local Development</a>
  </p>
</div>

---

## 🌟 About The Project

WithMe is a premium, modern web application designed to help people connect over shared struggles. It's built on the premise that sometimes the most profound relief comes simply from knowing **you are not alone**. 

Unlike traditional social media, WithMe strips away performance and advice in favor of pure empathy. With a beautiful dark-glassmorphism UI, real-time presence, and complete anonymity, it provides a safe haven for authentic human connection.

**Live Deployment:** [with-me-app.vercel.app](https://with-me-app.vercel.app/)

---

## ✨ Features

- 🎭 **100% Anonymous Venting** — A judgment-free global space to let it out. Shield avatars protect identity.
- 🤝 **Support Circles** — Dedicated group feeds for Anxiety, Grief, Burnout, Loneliness, and more.
- 💬 **Real-time Chat & Reactions** — Fluid, instant messaging with supportive micro-interactions ("I hear you", "Sending warmth").
- 📎 **File Attachments** — Users can share images and documents directly within their Circles.
- 📞 **Voice & Video Ready** — Built-in UI to start instant real-time calls with the support group.
- 🟢 **Live Presence indicators** — Displays how many circle members are actively online.
- 📅 **Daily Check-ins** — Users can track their mood and build healthy habits over time.
- 👤 **Customizable Profiles** — Secure photo uploads (via Supabase Storage), journey stats tracking, and privacy controls.
- 🎨 **World-class Design** — A breathtaking dark UI featuring glassmorphism, responsive bottom-nav routing for mobile, and butter-smooth micro-animations.

---

## 🛠️ Architecture & Tech Stack

WithMe was architected for speed, security, and scalability using modern web technologies.

**Frontend:**
* **React 18 + Vite** for a lightning-fast development environment and optimized production builds.
* **React Router v6** for seamless, declarative client-side routing.
* **Vanilla CSS (Custom Properties)** for a lightweight, deeply customized design system without UI framework bloat.
* **Lucide React** for crisp, scalable SVG iconography.

**Backend & Database (Supabase):**
* **PostgreSQL Database** — Complex relational data modeling across Users, Circles, Posts, Reactions, and Check-ins.
* **Supabase Auth** — Secure email/password authentication with protected client routing.
* **Supabase Storage** — Scalable cloud storage for user avatars and chat file attachments.
* **Real-time Subscriptions** — Websocket integrations for live chat and instant reaction updates.
* **Row Level Security (RLS)** — Granular database-level security ensuring users can only read/write authorized data.

---

## 🚀 Local Development

Want to run this project locally? Follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/alhosseinjr/withme.git
cd withme
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Create a free project in [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Run the contents of `SUPABASE_SETUP.sql` from this repository. This executes the schema creation, RLS policies, triggers, and seed data.
4. Go to **Storage** and create two public buckets: `avatars` and `attachments`.

### 4. Setup Environment Variables
Connect the app to your database. In a production environment, use a `.env` file. For immediate local testing, update `src/lib/supabase.js`:
```js
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';
```

### 5. Run the dev server
```bash
npm run dev
```
Open **http://localhost:5173** to see the app!

---
<div align="center">
  <p>Built by <a href="https://github.com/alhosseinjr">alhosseinjr</a></p>
</div>
