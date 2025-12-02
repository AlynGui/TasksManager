# TasksManager

A full-stack Task Management Web Application built with React, Vite, TailwindCSS, Node.js, Express, Prisma, and PostgreSQL.
Supports authentication, CRUD tasks, filtering, search, and drag-and-drop interface.

---

## 🌍 Live Demo

* ✅ Frontend (Vercel): [https://tasks-manager-eight.vercel.app/](https://tasks-manager-eight.vercel.app/)
* ✅ Backend (Railway): [https://tasksmanager-production-1bab.up.railway.app/health](https://tasksmanager-production-1bab.up.railway.app/health)

---

## ✨ Features
* Authentication:
  * Register
  * Login
  * Logout
  * Forgot Password
  * Reset Password
  * JWT Auth + HttpOnly Cookies
  * Protected Routes
* Task Management
  * Create, Read, Update, Delete
  * Task detail view
  * Update task status
  * Search by title/description
  * Filter by status
  * Due dates
  * Pagination
  * Drag-and-drop board view
* Frontend
  * React + Vite
  * TailwindCSS
  * React Router
  * Context API
* Backend
  * Node.js
  * Express
  * Prisma ORM
  * PostgreSQL
  * CORS
  * REST API

---

## 🧰 Tech Stack

### Frontend

* React 19.2.0
* Vite
* TailwindCSS 4.1.17
* React Router
* Context

### Backend

* Node.js 
* Prisma 4.16.2
* PostgreSQL
* Express
* Cors

---

## 📁 Project Structure

### Frontend

```
TasksManager/
├─ public/
│ ├─ login.png            # Login page screenshot
│ ├─ home1.png            # Home page(Grid) screenshot
│ ├─ home2.png            # Home page(Board) screenshot
│ ├─ add-task.png         # Add task page screenshot
│ └─ task-detail.png      # Task detail screenshot
├─ src/
│ ├─ api/                 # API service layer
│ │ ├─ AuthApi.jsx        # User request  api  (login, register, forgotPassword, logout, getCurrentUser)
│ │ └─ TasksApi.jsx       # Task request api (getCurrentUserTasks, addTask, updateTaskById, updateTaskStatusById...)
│ ├─ assets/              # image,svg
│ ├─ components/
│ │ ├─ Header.jsx         #header component
│ │ ├─ TaskList.jsx       #task list component, support pagination
│ │ ├─ TaskDragList.jsx   #task list component, support drag task
│ │ └─ TasksFilter.jsx    #filter component, filter by task status, search by task title and description
│ ├─ config/
│ │ └─ api.js             # API base URL endpoints
│ ├─ contexts/
│ │ ├─ AuthContext.jsx    #user global state Authentication
│ │ └─ TasksContext.jsx   #task Global state
│ ├─ hooks/
│ │ ├─ useAuth.jsx        # return AuthContext
│ │ └─ useTasks.js        # return TasksContext
│ ├─ layout/
│ │ └─ Layout.js          # layout for home page, add task page and task detail page
│ ├─ pages/
│ │ ├─ AddTask.jsx
│ │ ├─ ForgotPassword.jsx
│ │ ├─ Home.jsx
│ │ ├─ Login.jsx
│ │ ├─ Register.jsx
│ │ └─ TaskDetail.jsx
│ ├─ routes/
│ │ └─ ProtectedRoute.js  #ProtectedRoute component to guard routes that require authentication
│ ├─ utils/               #Utility function
│   ├─ common.jsx
│   ├─ request.jsx        #Utility function to make API requests with error handling
│   └─ validate.jsx
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
├─ controllers/             # controller layer
│ ├─ authController.jsx
│ └─ taskController.js
├─ middlewares/
│ └─ authMiddleware.js      # Authentication middleware to protect routes
├─ prisma/
│ └─ schema.prisma          #postgreSql table structure
├─ routes/
│ ├─ authRoutes.jsx         #/user request route
│ └─ taskRoutes.js          #/task request route
├─ services/                #service layer
│ ├─ authService.jsx
│ └─ taskService.js
├─ utils/
│ └─ responseHandlers.prisma  #success response and error response
├─ index.js
├─ package.json
└─ package-lock.json
```

---

## 🖼 Screenshots

### Login Page

![Login Page](public/login.png)

### Home Page(Grid)

![Home Page](public/home1.png)

### Home Page(Board)

![Home Page](public/home2.png)

### Add Task Page

![Task Detail](public/add-task.png)

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
NODE_ENV=development
JWT_SECRET=JWTSecretKey
JWT_EXPIRES=1d
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
NODE_ENV=production
JWT_SECRET=JWTSecretKey
JWT_EXPIRES=1d
```

5. Deploy

Backend URL:
[https://tasksmanager-production-1bab.up.railway.app/tasks](https://tasksmanager-production-1bab.up.railway.app/health)

---

## 📌 Usage

* View tasks on Home page
* Filter tasks by status or search keywords
* Click a task card to view detailed information
* Change task status from dropdown
* Add new tasks
* Delete tasks when completed

---

## 👨‍💻 Author

**Lin Gui**
GitHub: [https://github.com/AlynGui](https://github.com/AlynGui)
