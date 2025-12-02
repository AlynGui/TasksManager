   // get status color classes
   export const getStatusColor = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    // Helper to get status translation
   export const getStatusTranslation = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return 'To Do';
            case 'IN_PROGRESS':
                return 'In Progress';
            case 'COMPLETED':
                return 'Done';
            default:
                return '';
        }
    };