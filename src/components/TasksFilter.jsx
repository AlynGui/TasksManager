import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import square from '../assets/square.svg';
import verticalBar from '../assets/vertical-bar.svg';

export default function TasksFilter({ filter = 'all', setFilter, query, setQuery, viewMode, setViewMode }) {
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'To Do', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Done', value: 'COMPLETED' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4 gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            {filterOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg transition font-medium text-sm cursor-pointer ${filter === option.value
                  ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle and Add Task Button */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to grid view"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${viewMode === 'grid'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  }`}
              >
                <img src={square} alt="Grid View" className="w-4 h-4 inline-block mr-1" />
                Grid
              </button>
              <button
                onClick={() => setViewMode('board')}
                aria-label="Switch to board view"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${viewMode === 'board'
                  ? 'bg-white text-sky-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
                  }`}
              >
                <img src={verticalBar} alt="Board View" className="w-4 h-4 inline-block mr-1" />
                Board
              </button>
            </div>
            {/* Add Task Button */}
            <Link to="/add-task" className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white px-4 py-2 rounded-lg transition font-semibold flex items-center gap-2 cursor-pointer whitespace-nowrap">+ Add Task</Link>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          aria-label="Search tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50"
        />
      </div>
    </div>
  )
}

// PropTypes validation
TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
  setFilter: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  viewMode: PropTypes.oneOf(['grid', 'board']).isRequired,
  setViewMode: PropTypes.func.isRequired,
};

// Default props
TasksFilter.defaultProps = {
  filter: 'all',
};
