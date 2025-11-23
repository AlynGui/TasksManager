import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TasksFilter from '../components/TasksFilter';
import useTasks from '../hooks/useTasks';
import { useState, useMemo } from 'react';

export default function Home() {

    const { tasks, loading, error } = useTasks();
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');

    const filteredTasks = useMemo(() => tasks ? tasks.filter(task => {
        const matchesFilter = filter === 'all' || task.status === filter;
        const matchesQuery = (task.title?.toLowerCase() || '').includes(query.toLowerCase()) ||
                             (task.description?.toLowerCase() || '').includes(query.toLowerCase()) ||
                             (task.assignee?.toLowerCase() || '').includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    }) : [], [tasks, filter, query]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <div className="py-8">
                <TasksFilter setFilter={setFilter} query={query} setQuery={setQuery} filter={filter}/>
                {
                    loading ? (
                        <div className="max-w-6xl mx-auto text-center py-12">
                            <p className="text-lg text-gray-600">Loading tasks...</p>
                        </div>
                    ) : error ? (
                        <div className="max-w-6xl mx-auto text-center py-12">
                            <p className="text-lg text-red-600">Error: {error}</p>
                        </div>
                    ) : (
                        <TaskList tasks={filteredTasks} />
                    )       
                }
            </div>
        </div>
  )
}
