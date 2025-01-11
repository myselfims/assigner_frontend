import React, { useState } from "react";
import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBriefcase,
  FaHospitalAlt,
} from "react-icons/fa";
import { MdOutlineEngineering, MdOutlineScience } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";
import { GiCookingPot, GiFactory } from "react-icons/gi";
import { BsMegaphoneFill } from "react-icons/bs";
import Loader from "../../components/Loader";

const industries = [
  { id: 1, name: "Software Development", icon: <FaLaptopCode /> },
  { id: 2, name: "Marketing", icon: <BsMegaphoneFill /> },
  { id: 3, name: "Education", icon: <FaChalkboardTeacher /> },
  { id: 4, name: "Healthcare", icon: <FaHospitalAlt /> },
  { id: 5, name: "Retail & E-commerce", icon: <AiFillShop /> },
  { id: 6, name: "Engineering", icon: <MdOutlineEngineering /> },
  { id: 7, name: "Science & Research", icon: <MdOutlineScience /> },
  { id: 8, name: "Manufacturing", icon: <GiFactory /> },
  { id: 9, name: "Hospitality & Food", icon: <GiCookingPot /> },
  { id: 10, name: "Business & Consulting", icon: <FaBriefcase /> },
];

const IndustrySelection = () => {
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (id) => {
    if (selectedIndustries.includes(id)) {
      setSelectedIndustries(
        selectedIndustries.filter((industry) => industry !== id)
      );
    } else {
      setSelectedIndustries([...selectedIndustries, id]);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-[90%] max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Select Your Industry
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className={`flex items-center justify-center gap-2 p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all ${
                selectedIndustries.includes(industry.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
              onClick={() => handleSelect(industry.id)}
            >
              <span className="text-2xl">{industry.icon}</span>
              <span className="text-sm font-medium">{industry.name}</span>
            </div>
          ))}
        </div>
        <button
          className="mt-6 flex text-center items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          onClick={() =>
            setLoading(true)
          }
        >
          {loading && <Loader className={"mr-2"} />}
          Submit
        </button>
      </div>
    </div>
  );
};

export default IndustrySelection;
