
export default function TasksFilter({ setFilter, query, setQuery, filter = 'all' }) {
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Not Started', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Completed', value: 'COMPLETED' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 mb-4 flex-wrap">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value)}
                  className={`px-4 py-2 rounded-lg transition font-medium text-sm cursor-pointer ${
                    filter === option.value
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              placeholder="Search tasks..."  
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
            />
        </div>
    </div>
  )
}
