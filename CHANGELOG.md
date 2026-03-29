# Changelog

All notable changes to the Personal Finance Manager project are documented here.
This project follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) conventions.

---

## [0.8.0] — 2026-03-27

### Added
- `CurrencySelector` component with dropdown for 10+ currencies
- `CalendarView` component for browsing transactions by date
- Bar chart for weekly expense comparison (in refinement)
- `AddTransactionModal` now distinguishes income vs. expense types

### Changed
- Redesigned sidebar navigation with icon labels and active-state indicators
- Improved `Dashboard` layout: summary cards now animate on mount
- Refactored API util (`utils/api.ts`) to centralize Axios interceptors

### Fixed
- Balance recalculation bug when deleting multiple transactions rapidly
- Chart tooltip z-index overlap with modal overlay

---

## [0.7.0] — 2026-03-18

### Added
- Line chart showing monthly income vs. expense trends (Recharts)
- Doughnut chart for category-wise expense breakdown
- `analyticsController.ts` — aggregates monthly totals from MongoDB
- Dashboard summary cards: Total Income, Total Expenses, Net Balance

### Changed
- Deep-space dark theme applied globally (CSS variables in `index.css`)
- Navbar redesigned with left-sidebar layout replacing top navigation
- Zustand store refactored to separate `authStore` and `expenseStore`

### Fixed
- JWT token not cleared on logout in some edge cases
- Expense list not refreshing after edit without page reload

---

## [0.6.0] — 2026-03-07

### Added
- Income entry support: transactions now accept a `type` field (`income` | `expense`)
- Real-time balance calculation: displayed in dashboard header
- Monthly income/expense aggregation endpoint (`GET /api/analytics/summary`)

### Changed
- `Expense` Mongoose model updated with `type`, `source`, and `currency` fields
- `expenseController.ts` updated to filter by `type` for balance calculation

---

## [0.5.0] — 2026-02-26

### Added
- Category filtering on expenses list page
- Date range filtering for transactions
- Pagination support on expense list (10 items per page)

### Changed
- Improved form validation on `AddTransactionModal` with inline error messages
- `Register.tsx` and `Login.tsx` redesigned with new card layout

---

## [0.4.0] — 2026-02-18

### Added
- Full CRUD for expenses: Create, Read, Update, Delete
- `Expenses.tsx` page with sortable, filterable table
- Delete confirmation prompt before removing a transaction

### Changed
- API error handling improved — all controllers return structured JSON errors

### Fixed
- Unprotected route access when JWT expires mid-session

---

## [0.3.0] — 2026-02-12

### Added
- Authentication middleware (`authMiddleware.ts`) for protected routes
- Route-level protection applied to all expense and analytics endpoints
- User profile stored in Zustand after login for persistent session

---

## [0.2.0] — 2026-02-08

### Added
- User registration and login with bcrypt password hashing
- JWT token generation and validation
- `authController.ts` with `register` and `login` handlers
- Initial `User` Mongoose model with email uniqueness constraint

---

## [0.1.0] — 2026-02-03

### Added
- Project initialized with Vite + React + TypeScript (frontend)
- Express + TypeScript backend scaffolded
- MongoDB connection via Mongoose with environment-based config
- ESLint, Tailwind CSS v4, and PostCSS configured
- Basic folder structure for controllers, models, routes, and pages
