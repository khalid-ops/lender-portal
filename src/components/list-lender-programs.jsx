import React from 'react';
import { API_BASE_URL } from '../api.js';
import { useNavigate } from 'react-router-dom';


export default function LenderProgramsList() {

  const [lenderPrograms, setLenderPrograms] = React.useState([]);
  const navigate = useNavigate();
  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/lender-program`);
      const data = await response.json();
      setLenderPrograms(data);
    } catch (error) {
      console.error('Error fetching lender programs:', error);
    }
  };
  React.useEffect(() => {
    fetchPrograms();
  }
  , []);

    const handleDelete = async (id) => {
      try {
        await fetch(`${API_BASE_URL}/api/lender-program/${id}`, {
          method: 'DELETE',
        });
        fetchPrograms();
      } catch (error) {
        console.error('Error deleting lender program:', error);
      }
    };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Lender Programs</h2>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-md text-sm font-medium shadow hover:bg-indigo-700 transition duration-200" onClick={() => navigate('/lender-program-create')}>
          Add New Program
        </button>
      </div>
      { lenderPrograms.length === 0 && (
        <div className="text-center text-gray-500">
          <p className="text-lg">No lender programs available.</p>
          <p className="text-sm">Click the button above to create a new program.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {lenderPrograms.map((program) => (
          <div
            key={program._id}
            className="relative bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="absolute top-3 right-3 z-10">
              <button
                onClick={() => handleDelete(program._id)}
                className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition"
              >
                Delete
              </button>
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">
              {program.lenderProgramName}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Credit Score: {program.creditScore}
            </p>
            <ul className="text-sm space-y-1 text-gray-700">
                <li><span className="font-medium">Less Than Credit Score Points:</span> <span className='text-black font-bold'>{program.lessThanCreditScorePoint} </span></li>
                <li><span className="font-medium">More Than Credit Score Points:</span> <span className='text-black font-bold'>{program.moreThanCreditScorePoint} </span></li>
              <li><span className="font-medium">All 4 Required Docs Points:</span> <span className='text-black font-bold'>{program.all4RequiredDocs} </span></li>
              <li><span className="font-medium">Any 3 Docs Points:</span> <span className='text-black font-bold'>{program.any3Docs} </span></li>
              <li><span className="font-medium">Any 2 Docs Points:</span> <span className='text-black font-bold'>{program.any2Docs} </span></li>
              <li><span className="font-medium">Only CR Document Points:</span> <span className='text-black font-bold'>{program.crDocument} </span></li>
              <li><span className="font-medium">Financial Report Points:</span> <span className='text-black font-bold'>{program.auditedFinancialReport} </span></li>
              <li><span className="font-medium">Bank Statement Points:</span> <span className='text-black font-bold'>{program.bankStatement} </span> </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
