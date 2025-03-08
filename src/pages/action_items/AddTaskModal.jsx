import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { fetchData, postData } from "../../api";
import { useFormik } from "formik";
import { TaskSchema } from "../../validation/validation_schema";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../store/features/actionItemsSlice";
import { setAlert } from "../../store/features/appGlobalSlice";
import Loader from "../../components/Loader";
import InputField from "../../components/InputField";
import { motion, AnimatePresence } from "framer-motion";
import UserSearchBox from "../../components/UserSearchBox";
import { useParams } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
  deadline: "",
  assignedToId: "",
};

const AddTaskModal = ({ setModal, sprint = null, addTask }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const { members, statuses } = useSelector((state) => state.actionItems);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      setLoading(true);
      data["projectId"] = projectId;
      data["sprintId"] = sprint?.id;
      data["status"] = statuses[0].id;
    
      postData(`/tasks/`, data)
        .then((res) => {
          setLoading(false);
          setModal(false);
          addTask(res);
        })
        .catch((error) => {
          setLoading(false);
          const { data } = error?.response;
          dispatch(setAlert({ alert: true, type: "danger", message: data }));
        });
    },
  });

  const handleUserSelect = (user) => {
    console.log("user", user)
    setFieldValue("assignedToId", user[0]?.id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          className="w-full max-w-lg bg-white rounded-lg shadow-xl overflow-"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-5 bg-gray-100 border-b rounded-l-lg rounded-r-lg">
            <h1 className="text-lg font-semibold">
              {sprint?.title || "Add New Task"}
            </h1>
            <button
              onClick={() => setModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Title"
                name="title"
                placeholder="Enter title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                error={errors.title}
                touched={touched.title}
                className="w-full"
              />

              <div>
                <label className="block text-sm font-medium">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Enter task description"
                  className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                  rows={4}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="">
                <label className={`block text-sm font-medium ${errors?.deadline && 'text-red-500'}`}>Deadline</label>
                  <InputField
                    name={"deadline"}
                    placeholder={""}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.deadline}
                    error={errors.deadline}
                    touched={touched.deadline}
                    type="date"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium ${errors?.assignedToId && 'text-red-500'}`}>Assign to</label>
                  <UserSearchBox
                    onSelect={handleUserSelect}
                    allowMultiple={false}
                    passedUsers={members}
                  />
                </div>
              </div>

              <div className="flex justify-start mt-6">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                  disabled={loading}
                >
                  {loading ? <Loader /> : <FaSave />} Save Task
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddTaskModal;
