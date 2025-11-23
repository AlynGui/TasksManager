import { Link } from 'react-router-dom';

/**
 * Header component displays the main title and a link to add a new task.
 */
export default function Header() {
  return (
    <header className="bg-white text-slate-800 p-4 shadow-sm border-b border-slate-200">
        <nav className="flex justify-between items-center max-w-6xl mx-auto">
            <Link to='/' className="text-2xl font-bold hover:text-indigo-600 transition">Tasks Manager</Link>
            <Link to="/add-task" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition font-semibold flex items-center gap-2 cursor-pointer">+ add task</Link>
        </nav>
    </header>
  )
}
