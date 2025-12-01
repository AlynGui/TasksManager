import Layout from '../layout/Layout';
import TaskList from '../components/TaskList';
import TasksDragList from '../components/TasksDragList';
import TasksFilter from '../components/TasksFilter';
import useTasks from '../hooks/useTasks';
import { useState, useMemo } from 'react';

export default function Home() {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');  // 'grid' or 'board'
    const { tasks, loading, error } = useTasks();

    // Filtered tasks based on status filter and search query
    const filteredTasks = useMemo(() => tasks ? tasks.filter(task => {
        const matchesFilter = filter === 'all' || task.status === filter;
        const matchesQuery = (task.title?.toLowerCase() || '').includes(query.toLowerCase()) ||
            (task.description?.toLowerCase() || '').includes(query.toLowerCase());
        return matchesFilter && matchesQuery;
    }) : [], [tasks, filter, query]);

    return (
        <Layout>
            <div className="py-8">
                <TasksFilter
                    setFilter={setFilter}
                    query={query}
                    setQuery={setQuery}
                    filter={filter}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                />
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
                        <>
                            {viewMode === 'grid' ? (
                                <TaskList tasks={filteredTasks} />
                            ) : (
                                <TasksDragList tasks={filteredTasks} />
                            )}
                        </>
                    )
                }
            </div>
        </Layout>
    )
}
