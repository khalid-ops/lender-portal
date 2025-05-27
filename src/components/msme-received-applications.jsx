import React, { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../api.js';
import OfferPopup from './offer-popup.jsx';

const MoreVertical = ({ size = 20, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const Edit = ({ size = 16, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const Trash2 = ({ size = 16, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const Eye = ({ size = 16, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


const ActionDropdown = ({ recordId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const popupRef = useRef();

  const openWithId = (id) => {
    popupRef.current.open(id);
  };
  return (
    <>
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <MoreVertical size={20} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-2xl z-20 border border-gray-200 overflow-hidden">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); openWithId(recordId); }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-colors"
          >
            <Eye size={18} className="text-indigo-500" />Get Lender Offers
          </a>
          {/* <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleAction('edit'); }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition-colors"
          >
            <Edit size={18} className="text-green-500" /> Edit Record
          </a>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleAction('delete'); }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} className="text-red-500" /> Delete Record
          </a> */}
        </div>
      )}
    </div>
    <OfferPopup ref={popupRef} recordId={recordId} />
    </>
  );
};

const RecordTable = ({ records }) => {


  const headers = [
    "Business Name",
    "Credit Score",
    "Commercial Registration",
    "Trade License",
    "Tax Card",
    "Establishment Certificate",
    "Audited Financials",
    "Bank Statement",
    "Status",
    "Actions"
  ];

  return (
    <>
    {records.length === 0 && (
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-gray-600">No records found.</p>
        </div>
      </div>
    )
    }
    <div className="bg-white shadow-xl rounded-xl overflow-hidden">
      <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider ${header === "Actions" ? "text-right" : ""}`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-indigo-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{record.businessName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{record.creditScore}</td>
                {[record.commercialRegistrationCertificateSubmitted, record.tradeLicenseSubmitted, record.taxCardSubmitted,
                  record.establishmentCertificateSubmitted, record.auditedFinancialStatementSubmitted, record.bankStatementSubmitted].map((value, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={value}
                      readOnly
                      disabled
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded-sm focus:ring-indigo-500 disabled:opacity-80 cursor-not-allowed"
                    />
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                    ${record.status === 'approved' ? 'bg-green-100 text-green-800' :
                      record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      record.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <ActionDropdown recordId={record._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default function MSMEReceivedApplications() {
  const [recordsData, setRecordsData] = useState([]);

    const fetchRecords = async () => {
      const response = await fetch(`${API_BASE_URL}/api/msme-application`,{
        method: 'GET',
      }
      )
      if (!response.ok) {
        console.error('Failed to fetch records');
        return;
      }
      const data = await response.json();
      setRecordsData(data);
      console.log('Fetched records:', data);
    };

    useEffect(() => {
      fetchRecords();
    }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 pb-2">
            MSME Application Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Oversee and manage all your MSME applications efficiently.
          </p>
        </div>
        <RecordTable records={recordsData} />
      </div>
    </div>
  );
}