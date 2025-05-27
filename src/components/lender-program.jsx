import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../api.js"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";

export default function LenderProgramForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await fetch(`${API_BASE_URL}/api/lender-program`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      navigate("/"); // Redirect to the list of lender programs
      alert("Lender Program created successfully: " + result.data.lenderProgramName);
    } else {
      const error = await response.json();
      alert("Error creating Lender Program: " + error.message);
    }
    console.log("Form submitted:", data);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4 py-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 text-center">Create Lender Program</h2>
      <p className="text-gray-600 mb-6 text-center">
        Please enter the points for each condition below except for program name & credit score
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lender Program Name</label>
          <input
            type="text"
            {...register("lenderProgramName", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.lenderProgramName && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Credit Score</label>
          <input
            type="text"
            {...register("creditScore", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.creditScore && <p className="text-red-500 text-sm mt-1">This field is required</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Less than Credit Score Points</label>
            <input
              {...register("lessThanCreditScorePoint", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.lessThanCreditScorePoint && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">More Than Credit Score Points</label>
            <input
              {...register("moreThanCreditScorePoint", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.moreThanCreditScorePoint && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
        </div>

        {[
          ["all4RequiredDocs", "All 4 Required Documents"],
          ["any3Docs", "Any 3 Required Documents"],
          ["any2Docs", "Any 2 Required Documents"],
          ["crDocument", "Only CR Document"],
          ["auditedFinancialReport", "Audited Financial Report"],
          ["bankStatement", "Bank Statement"],
        ].map(([name, label]) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              {...register(name, { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">This field is required</p>}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
