import React from 'react';
import { MdClose } from 'react-icons/md';

const ErrorModal = ({ errorMessage, setErrorMessage }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Error</h2>
          <button onClick={() => setErrorMessage('')}>
            <MdClose className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <p>{errorMessage}</p>
        <div className="mt-4">
          <button
            className="bg-red-600 hover:bg-red-500 text-white text-lg font-bold py-2 px-4 rounded-lg w-full"
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
