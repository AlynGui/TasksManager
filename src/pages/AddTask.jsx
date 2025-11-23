import { useState, useCallback } from 'react';
import useTasks from '../hooks/useTasks.jsx';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [dueDate, setDueDate] = useState('');
    const status = 'not_started';
    const { error, addNewTask } = useTasks();
    const navigate = useNavigate();

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        await addNewTask({ title, description, status, assignee, dueDate })
        if (error) {
            console.error('Error adding task:', error);
        } else {
            console.log('Task added successfully');
        }
        setTitle('');
        setDescription('');
        setAssignee('');
        setDueDate('');
        navigate(`/`);
    }, [title, description, assignee, dueDate, addNewTask]);

    return (
      <div className="min-h-screen bg-slate-50">
          <Header />
          <div className="max-w-2xl mx-auto py-8 px-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                  <h1 className="text-3xl font-bold mb-6 text-slate-800">Add a New Task</h1>
                  <form onSubmit={onSubmit} className="space-y-4">
                      <div>
                          <label htmlFor="task-title" className="block text-sm font-semibold text-slate-700 mb-2">Title:</label>
                          <input 
                              required 
                              id="task-title" 
                              type="text" 
                              value={title} 
                              onChange={(e) => setTitle(e.target.value)} 
                              placeholder='Enter task title...'
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                          />
                      </div>
                      <div>
                          <label htmlFor="task-description" className="block text-sm font-semibold text-slate-700 mb-2">Description:</label>
                          <textarea 
                              required 
                              id="task-description" 
                              value={description} 
                              onChange={(e) => setDescription(e.target.value)} 
                              placeholder='Enter task description...'
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 resize-none"
                              rows="4"
                          />
                      </div>
                      <div>
                          <label htmlFor="task-assignee" className="block text-sm font-semibold text-slate-700 mb-2">Assignee:</label>
                          <input 
                              required 
                              id="task-assignee" 
                              type="text" 
                              value={assignee} 
                              onChange={(e) => setAssignee(e.target.value)} 
                              placeholder='Enter assignee name...'
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                          />
                      </div>
                      <div>
                          <label htmlFor="task-due-date" className="block text-sm font-semibold text-slate-700 mb-2">Due Date:</label>
                          <input 
                              required 
                              id="task-due-date" 
                              type="date" 
                              value={dueDate} 
                              onChange={(e) => setDueDate(e.target.value)}
                              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                          />
                      </div>
                      <div className="flex gap-2 pt-4">
                          <button 
                              type="submit"
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                          >
                              Add Task
                          </button>
                          <button 
                              type="button"
                              onClick={() => navigate(-1)}
                              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
                          >
                              Cancel
                          </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
}