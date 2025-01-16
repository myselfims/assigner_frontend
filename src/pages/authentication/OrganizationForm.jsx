import React, { useState } from "react";
import Loader from "../../components/Loader";
import { postData } from "../../api";

const OrganizationForm = () => {
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    const organizationDetails = {
      companyName,
      companySize,
      industry,
      website,
    };
    console.log("Saved Data:", organizationDetails);
    // Perform API call or other save logic here
    postData('/organizations/', organizationDetails).then((res)=>{
        console.log(res)
    })
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          Organization Details
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Size
            </label>
            <select
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={companySize}
              onChange={(e) => setCompanySize(e.target.value)}
              required
            >
              <option value="" disabled>
                Select company size
              </option>
              <option value="1-10">1-10 Employees</option>
              <option value="11-50">11-50 Employees</option>
              <option value="51-200">51-200 Employees</option>
              <option value="201-500">201-500 Employees</option>
              <option value="500+">500+ Employees</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Website
            </label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
          >
            Save
            {loading && (
              <Loader className={'ml-2'}/>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizationForm;
