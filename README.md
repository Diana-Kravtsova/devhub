# DevHub: Dashboard & Chat Platform
[DEMO](https://devhub-navy.vercel.app?_vercel_share=EbAcbrJZ5G5PRLIuIf2GA5rH7HPMTZgF)

A modern Single Page Application (SPA) built with **React**, **Vite**, and **TypeScript**, featuring robust routing, state management, and real-time communication.

## 🚀 Features

* **User Management:** Fetching and displaying user data using **TanStack Query** (integrating with REST API).
* **Role-Based Access Control (RBAC):** Protected routes and UI elements based on user roles (Admin, Moderator, User).
* **Real-time Chat:** Fully functional WebSocket chat module connected to `wss://ws.ifelse.io`.
* **GraphQL Integration:** Dedicated page fetching data from a **GraphQL API** (Apollo Sandbox).
* **Advanced Routing:** Type-safe routing and breadcrumbs using **TanStack Router**.
* **Testing Suite:** Comprehensive test coverage including **Unit**, **Modular**, and **Snapshot** tests.

## 🛠 Tech Stack

### Core

* **React 18** + **Vite**
* **TypeScript** 
* **Tailwind CSS** + **Shadcn UI**

### State & Data

* **TanStack Router:** File-based, type-safe routing.
* **TanStack Query (React Query):** Server state management and caching.
* **Apollo Client:** GraphQL data fetching.
* **Context API:** Global Auth state management.

### Testing & Quality

* **Vitest:** Test runner.
* **React Testing Library:** Component testing.
* **JSDOM:** Browser environment for Node.

---

## 📁 Project Structure (Overview)

* `src/api`: REST service definitions.
* `src/components`: Reusable UI elements (Shadcn) and Layouts.
* `src/hooks`: Custom hooks for permissions and Auth.
* `src/routes`: File-based routing tree (Chat, Users, User Details).
* `src/tests`: Unit, Modular, and Snapshot test suites.

---

## 🏃 Getting Started

### Prerequisites

* Node.js (v18+)
* npm / yarn

### Installation

1. Clone the repository:
```bash
  git clone <your-repo-url>
```

2. Install dependencies:
```bash
  npm install
```

### Development

Start the development server:

```bash
  npm run dev
```

### Testing

Run the test suite (Unit, Modular, Snapshots):

```bash
  npm run test
```

---

* **API Reference:** [DummyJSON](https://dummyjson.com/) / [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer)
