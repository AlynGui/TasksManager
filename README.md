# ✅ TasksManager

A simple yet practical **Task Management Web Application** built with **React + Vite + TailwindCSS + Node.js + Prisma + PostgreSQL**.

It supports full **CRUD operations** (Create, Read, Update, Delete) and allows users to efficiently manage daily work and personal tasks.

---

## 🌍 Live Demo

* ✅ Frontend (Vercel): [https://tasks-manager-eight.vercel.app/](https://tasks-manager-eight.vercel.app/)
* ✅ Backend (Railway): [https://tasksmanager-production-1bab.up.railway.app/tasks](https://tasksmanager-production-1bab.up.railway.app/tasks)

---

## ✨ Features

* Display tasks with:

  * Title
  * Description
  * Status
  * Due Date
  * Assignee
* Filter tasks by:

  * Status (`not_started`, `in_progress`, `completed`)
  * Search query (title / description / assignee)
* Add new tasks
* Update task status
* Delete tasks
* Responsive UI using **TailwindCSS**
* Global state management via **React Context API**
* RESTful API powered by **Node.js + Prisma + PostgreSQL**

---

## 🧰 Tech Stack

### Frontend

* React 19.2.0
* Vite
* TailwindCSS 4.1.17
* React Router

### Backend

* Node.js (Express)
* Prisma 4.16.2
* PostgreSQL

---

## 📁 Project Structure

### Frontend

```
TasksManager/
├─ public/
│ ├─ home.png           # Home page screenshot
│ └─ task-detail.png    # Task detail screenshot
├─ src/
│ ├─ api/
│ │ └─ TasksApi.jsx     # API service layer
│ ├─ components/
│ │ ├─ Header.jsx
│ │ ├─ TaskList.jsx
│ │ └─ TasksFilter.jsx
│ ├─ config/
│ │ └─ api.js           # API base URL config
│ ├─ contexts/
│ │ └─ TasksContext.jsx # Global state
│ ├─ hooks/
│ │ └─ useTasks.js      # Custom hook wrapping context
│ ├─ pages/
│ │ ├─ AddTask.jsx
│ │ ├─ Home.jsx
│ │ └─ TaskDetail.jsx
├─ App.jsx
├─ main.jsx
├─ index.html
├─ index.css
├─ eslint.config.js
├─ package.json
├─ package-lock.json
└─ vite.config.js
```

### Backend

```
TasksManager/server/
├─ controllers/
│ └─ taskController.js
├─ prisma/
│ └─ schema.prisma
├─ routes/
│ └─ taskRoutes.js
├─ services/
│ └─ taskService.js
├─ index.js
├─ package.json
└─ package-lock.json
```

---

## 🖼 Screenshots

### Home Page

![Home Page](public/home.png)

### Task Detail Page

![Task Detail](public/task-detail.png)

---

## ⚙️ Installation & Local Development

### Frontend

1. Clone the repository:

```bash
git clone git@github.com:AlynGui/TasksManager.git
cd TasksManager
```

2. Install dependencies:

```bash
npm install
```

3. Create environment file:

```bash
vim .env
```

```env
VITE_API_BASE_URL=http://localhost:3000
```

4. Run frontend locally:

```bash
npm run dev
```

Open: [http://localhost:5173](http://localhost:5173)

---

### Backend

1. Install backend dependencies:

```bash
cd server
npm install
```

2. Create environment file:

```bash
vim .env
```

```env
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
FRONTEND_URL=http://localhost:5173
```

3. Run database migration:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start backend server:

```bash
npm start
```

Backend runs on: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deployment Guide

### Frontend (Vercel)

1. Push code to GitHub
2. Login to Vercel
3. Import GitHub repository
4. Set framework preset: **Vite**
5. Add environment variable:

```
VITE_API_BASE_URL=https://tasksmanager-production-1bab.up.railway.app
```

6. Deploy

---

### Database (Railway)

1. Create a new Railway project
2. Add Plugin → PostgreSQL
3. Copy the generated connection string

---

### Backend (Railway)

1. Login to Railway
2. Import from GitHub
3. Set **Root Directory** to:

```
/server
```

4. Add environment variables:

```
DATABASE_URL=<Railway PostgreSQL URL>
FRONTEND_URL=https://tasks-manager-eight.vercel.app
```

5. Deploy

Backend URL:
[https://tasksmanager-production-1bab.up.railway.app/tasks](https://tasksmanager-production-1bab.up.railway.app/tasks)

---

## 📌 Usage

* View tasks on Home page
* Filter tasks by status or search keywords
* Click a task card to view detailed information
* Change task status from dropdown
* Add new tasks
* Delete tasks when completed

---

## ✅ Future Improvements

* User authentication (JWT)
* Task priority levels
* Drag-and-drop task sorting
* Dark mode
* Pagination or infinite scroll

---

## 👨‍💻 Author

**Lin Gui**
GitHub: [https://github.com/AlynGui](https://github.com/AlynGui)

---

If you find this project helpful, feel free to ⭐ star the repository!
