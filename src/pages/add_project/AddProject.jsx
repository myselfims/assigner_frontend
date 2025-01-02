import React, { useState } from "react";
import { useFormik } from "formik";
import { postData } from "../../api";
import Loader from "../../components/Loader";
import UserSearchBox from "../../components/UserSearchBox";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";


const AddProject = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      lead: 1,
      startDate: "",
      status: "Ongoing",
      priority: "Medium",
      budget: "",
      deadline: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log("New Project Data:", values);
      setLoading(true);
      values.lead = 1;
      postData("/projects/", values).then((res) => {
        setLoading(false);
        navigate('/projects')
      }).catch((error)=>{
        console.log(error)
        setLoading(false)
        dispatch(setAlert({alert:true,type:'danger',message:error.response.data}))

      })
    },
  });

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Project</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-6 items-center">
          {/* Project Name */}
          <label className="font-bold">Project Name</label>
          <input
            type="text"
            name="name"
            disabled={loading}
            value={formik.values.name}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
            required
          />

          {/* Project Lead */}
          <label className="font-bold">Project Lead</label>
          <UserSearchBox/>
          {/* <input
            type="text"
            name="lead"
            disabled={loading}
            value={formik.values.lead}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
            required
          /> */}

          {/* Start Date */}
          <label className="font-bold">Start Date</label>
          <input
            type="date"
            name="startDate"
            disabled={loading}
            value={formik.values.startDate}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
          />

          {/* Status */}
          <label className="font-bold">Status</label>
          <select
            name="status"
            disabled={loading}
            value={formik.values.status}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
          >
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          {/* Priority */}
          <label className="font-bold">Priority</label>
          <select
            name="priority"
            disabled={loading}
            value={formik.values.priority}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Budget */}
          <label className="font-bold">Budget (Optional) </label>
          <input
            type="number"
            name="budget"
            disabled={loading}
            value={formik.values.budget}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
            placeholder="Enter budget in USD"
          />

          {/* Deadline */}
          <label className="font-bold">Deadline</label>
          <input
            type="date"
            name="deadline"
            disabled={loading}
            value={formik.values.deadline}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full"
          />

          {/* Description */}
          <label className="font-bold col-span-2">Project Description</label>
          <textarea
            name="description"
            disabled={loading}
            value={formik.values.description}
            onChange={formik.handleChange}
            className="border-2 px-3 py-2 rounded-md w-full col-span-2"
            rows="4"
            placeholder="Provide a brief description of the project"
          ></textarea>
        </div>
        <div className="mt-6 text-center flex justify-center">
          <button
            type="submit"
            className="bg-[#4285F4] text-white font-bold py-2 px-6 rounded-md hover:opacity-80 flex items-center"
          >
            Add Project {loading && <Loader className={'ml-2'}/>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProject;
