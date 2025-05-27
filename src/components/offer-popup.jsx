import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { X } from 'lucide-react';
import { API_BASE_URL } from '../api.js'; 

const fetchData = async (recordId) => {
    try {
      // Ensure API_BASE_URL is defined. If not, this will throw an error.
      if (!API_BASE_URL) {
        console.error('API_BASE_URL is not defined.');
        throw new Error('API configuration error.');
      }
      const response = await fetch(`${API_BASE_URL}/api/msme-application/lender-offers/${recordId}`);
      if (!response.ok) {
        // More specific error handling based on status code could be added here
        const errorData = await response.text(); // Try to get more error info
        console.error('API Error Response:', errorData);
        throw new Error(`Failed to fetch lender offers. Status: ${response.status}`);
      }
      const data = await response.json();
      return data.data; // Assuming the API returns an object with a 'data' property containing the offers
    } catch (error) {
      console.error('Error fetching lender offers:', error.message);
      throw error;
    }
};

const OfferPopup = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); // Store error message string

  const handleOpen = async (id) => {
    setOpen(true);
    setLoading(true);
    setError(null); // Clear previous errors
    setData(null); // Clear previous data
    try {
      const result = await fetchData(id);
      setData(result);
    } catch (err) {
      // Store the error message for display
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Optionally reset states when closing
    // setLoading(false);
    // setData(null);
    // setError(null);
  };

  useImperativeHandle(ref, () => ({
    open: (id) => handleOpen(id),
    close: handleClose,
  }));

  // Render nothing if not open
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-in-out">
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg transform transition-all duration-300 ease-in-out scale-100 p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close offer details"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Best Proposed Offer
        </h2>

        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 min-h-[150px] flex flex-col justify-center items-center">
          {loading ? (
            // Loading State
            <div className="flex flex-col items-center justify-center text-center h-full py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-sky-600 mb-3"></div>
              <p className="text-sky-700 font-medium">Loading Offer Details...</p>
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-red-600 font-semibold text-lg">Oops! Something went wrong.</p>
              <p className="text-red-500 text-sm mt-1">{error}</p>
              <button
                onClick={() => props.recordId && handleOpen(props.recordId)} // Added check for props.recordId
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          ) : data ? (
            <div className="space-y-3 text-gray-700 text-center">
              <div>
                <span className="font-semibold text-gray-800 block text-sm">Lender Program:</span>
                <span className="text-gray-600 text-lg">{data.lenderProgramName || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-800 block text-sm">Offer Value:</span>
                <span className="text-green-600 font-bold text-xl">
                  QAR {(data.offerValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-800 block text-sm">Status:</span>
                <span className={`capitalize px-3 py-1 text-sm rounded-full font-medium ${
                  data.status && data.status.toLowerCase() === 'approved' ? 'bg-green-100 text-green-700' :
                  data.status && data.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  data.status && data.status.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {data.status || 'N/A'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No offer details available at the moment.</p>
            </div>
          )}
        </div>
        <div className="mt-6 text-right">
            <button
                onClick={handleClose}
                className="px-6 py-2.5 bg-sky-600 text-white font-medium text-sm rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
});

OfferPopup.displayName = 'OfferPopup'; // Adding display name for better debugging

export default OfferPopup;
