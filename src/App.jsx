import Home from './pages/Home';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TasksProvider } from './contexts/TasksContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AuthProvider from './contexts/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TasksProvider>
          <ToastContainer position="top-center" autoClose={3000} pauseOnFocusLoss={false}/>
          <Routes>
            {/* Protected Routes */} 
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
            />
            <Route path="/add-task" element={
              <ProtectedRoute>
                <AddTask />
              </ProtectedRoute>
            }
            />
            <Route path="/task/:id" element={
              <ProtectedRoute>
                <TaskDetail />
              </ProtectedRoute>
            }
            />
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </Router>
  )
}
export default App;
