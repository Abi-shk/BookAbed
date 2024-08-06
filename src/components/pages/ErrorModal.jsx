import React from 'react';
import { MdClose } from 'react-icons/md';

// ErrorModal component to display an error message
const ErrorModal = ({ errorMessage, setErrorMessage }) => {
  return (
    // Overlay that covers the entire screen, with a semi-transparent background
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      {/* Modal container with padding, rounded corners, and shadow */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        {/* Header section with title and close button */}
        <div className="flex justify-between items-center mb-4">
          {/* Title of the modal */}
          <h2 className="text-xl font-bold">Error</h2>
          {/* Close button that clears the error message */}
          <button onClick={() => setErrorMessage('')}>
            <MdClose className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        {/* Display the error message */}
        <p>{errorMessage}</p>
        {/* Footer section with close button */}
        <div className="mt-4 flex items-center justify-center">
          <button
            className="bg-red-600 w-1/2 hover:bg-red-500 text-white text-lg font-bold py-2 px-4 rounded-lg"
            onClick={() => setErrorMessage('')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
