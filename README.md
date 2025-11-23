# TasksManager

A simple **React + Vite + TailwindCSS** task management app for daily work and life tasks.  
Supports **viewing, adding, updating, and deleting tasks** (CRUD) using local JSON data or backend API.

Live Demo: [TasksManager on Vercel](https://tasks-manager-eight.vercel.app/)  

---

## Features

- Display tasks with **title, description, status,due date, assignee** 
- Filter tasks by **status**(`not_started`, `in_progress`, `completed`) or **search query**
- Add new tasks
- Update task status
- Delete tasks
- Responsive UI using **TailwindCSS**
- Uses **React Context** for global tasks state management
- Fetch tasks from `public/data.json` (static)

---

## Tech Stack

- React 19.2.0 + Vite
- TailwindCSS 4.1.17
- React Router
- Context API + useState
- Development backend: JSON Server(npx json-server --watch data.json --port 3001)

---

## Project Structure

TasksManager/
├─ public/
│ └─ data.json # Mock tasks data
├─ src/
│ ├─ api/
│ │ └─ TasksApi.jsx   # API service layer 
│ ├─ components/
│ │ ├─ Header.jsx
│ │ ├─ TaskList.jsx
│ │ └─ TasksFilter.jsx
│ ├─ config/
│ │ └─ api.js         #url config
│ ├─ contexts/
│ │ └─ TasksContext.jsx   
│ ├─ hooks/
│ │ └─ useTasks.js   #export TasksContext by a hook
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

---

## Screenshots

**Home Page**

[Home Page](public/home.png)

**Task Detail Page**

[Task Detail](public/task-detail.png)

---

## Installation

1. Clone the repository:
git clone git@github.com:AlynGui/TasksManager.git
cd TasksManager

2.Install dependencies:
npm install
or
yarn

3.Run locally:
npm run dev
or
yarn dev

Open http://localhost:5173 in your browser
The app fetches tasks from public/data.json by default

---

## Deployment

The project can be deployed to Vercel directly from GitHub:

Push your repository to GitHub

Sign in to Vercel

Import the project from GitHub

Set framework preset: Vite

Deploy

Live Demo: https://tasks-manager-eight.vercel.app/

---

## Usage

View the list of tasks on the home page

Filter tasks by status or search by title, description, or assignee

Click a task to view details

Change status using the dropdown

Add or delete tasks