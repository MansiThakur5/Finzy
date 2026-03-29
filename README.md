# 💰 Personal Finance Manager

A full-stack web application for tracking personal income and expenses, built with the **MERN stack** and **TypeScript**. Designed to provide real-time financial insights through an intuitive dashboard with dynamic charts and transaction management.

![Version](https://img.shields.io/badge/version-0.8.0-blue)
![Status](https://img.shields.io/badge/status-active%20development-green)
![Stack](https://img.shields.io/badge/stack-MERN-informational)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📸 Features

- 🔐 **Authentication** — Secure JWT-based login and registration
- 💸 **Expense Tracking** — Full CRUD with category filtering
- 💼 **Income Management** — Log salary and other income sources
- 📊 **Dashboard Analytics** — Real-time balance, charts, and transaction feed
- 📅 **Calendar View** — Browse transactions by date
- 🌙 **Dark Mode UI** — Deep-space dark theme throughout

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| State Management | Zustand |
| Charts | Recharts, Chart.js |
| Backend | Node.js, Express 5, TypeScript |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| API Client | Axios |

---

## 📁 Project Structure

```
Expense-Tracker/
├── backend/                  # Express + MongoDB API
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Route handlers (auth, expense, analytics)
│   │   ├── middleware/        # JWT auth middleware
│   │   ├── models/           # Mongoose schemas (User, Expense)
│   │   └── routes/           # API route definitions
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   └── charts/       # Chart components (Line, Bar, Doughnut)
│   │   ├── context/          # React context providers
│   │   ├── pages/            # Page-level components
│   │   ├── store/            # Zustand global state
│   │   └── utils/            # API helpers and utilities
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas cluster)
- npm >= 9

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses for user |
| POST | `/api/expenses` | Create a new expense/income |
| PUT | `/api/expenses/:id` | Update a transaction |
| DELETE | `/api/expenses/:id` | Delete a transaction |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/analytics/summary` | Get balance and category breakdown |

---

## 🗺️ Development Roadmap

- [x] Phase 1 — Auth system, Expense CRUD, Category tracking
- [x] Phase 2 — Income tracking, Real-time balance calculation
- [x] Phase 3 — Dashboard UI, Charts, Dark theme, Calendar view
- [ ] Phase 4 — Multi-currency support, Dark/Light toggle, Weekly chart granularity
- [ ] Phase 5 — AI insights, Expense prediction, PDF/CSV export

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
