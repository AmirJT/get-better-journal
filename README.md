# 📝 Get Better: Smart Personal Journal

Welcome to **Get Better** — a full-stack journaling app designed to help users become **1% better every day** through daily reflections, guided challenges, and an immersive meditation experience.

---

## 🚀 Features

### 🧠 Journaling Dashboard
- Add, edit, and delete personal journal entries
- Mood selector with 5-level rating (visualized)
- Tracks affirmation, gratitude, improvement, tasks, happiness
- Automatic date logging per user entry

### 🧘 Meditation Experience (Profile Page)
- Breathing circle animation synced to meditation pace
- Nature background audio with play/pause toggle
- Inspirational quote generator (on click avatar)
- 5-minute meditation timer
- Interactive Lottie character (peaceful animations)

### 🌱 Discover Page
- Psychology reminders
- Daily Quotes
- Daily surprises


### 🔐 Authentication & Protection
- Register / Login via JWT
- Apollo Client handles secured GraphQL queries
- User-specific journaling data only

### 🎨 Interface & Theme
- Fully responsive for mobile & desktop
- Light/dark mode toggle
- Hover effects & animated transitions
- Lottie + sound integration

### 🔁 Motivation Boosters
- Daily motivational quote (local)


---

## ⚙️ Tech Stack

### 🧩 Frontend
- React
- Lottie-react
- Custom CSS (no framework)
- Apollo Client
- React Router

### 🔧 Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- GraphQL + Apollo Server
- JWT authentication

### 🔁 DevOps
- GitHub Actions (CI on frontend build)
- Render (for backend deployment)
- Netlify or local (frontend)

---

## 📂 Folder Structure

```
get-better-journal/
├── backend/              # Express + GraphQL + MongoDB
├── frontend/             # React app
├── public/               # Lottie files, audio files
└── .github/workflows/    # GitHub Actions
```

---

## 📦 Installation

```bash
git clone https://github.com/AmirJT/get-better-journal.git
cd get-better-journal
```

### 🔧 Backend
```bash
cd backend
npm install
npm start
```

### 💻 Frontend
```bash
cd ../frontend
npm install
npm start
```

Make sure your `.env` file in `/backend` includes:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=8000
```

---

## ✅ GitHub Actions

A simple CI workflow to check if the React frontend builds successfully on every push to `main`.

📁 Located in:
```
.github/workflows/build.yml
```

Action Steps:
- Checks out code
- Installs frontend dependencies
- Runs `npm run build`

✅ Pass = React app builds successfully

---


## 🙏 Acknowledgements

- [LottieFiles](https://lottiefiles.com)
- [ZenQuotes.io](https://zenquotes.io)
- [OpenAI GPT](https://openai.com)

---

## 📄 License

This project is built for academic and showcase purposes.  
Created as part of a Full-Stack Web Development Bootcamp Final Project.

---

## ✨ Created By

**Amir Jafari**

**Arman Abadian** 

