import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { postData } from "../../api";
import { useFormik } from "formik";
import { SprintSchema } from "../../validation/validation_schema"; // Assuming you have a schema for sprint validation
import { useDispatch } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";
import Loader from "../../components/Loader";
import InputField from "../../components/InputField";
import { motion, AnimatePresence } from "motion/react";
import { useParams } from "react-router-dom";

const initialValues = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
};

const AddSprintModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: SprintSchema,
    onSubmit: (data) => {
      setLoading(true);
      data["projectId"] = projectId;

      postData(`/sprints/`, data)
        .then((res) => {
          setLoading(false);
          setModal(false);
          // You can dispatch actions to update your state here, if needed
          // dispatch(addSprint(res.data)); 
        })
        .catch((error) => {
            console.log(error)
          setLoading(false);
          dispatch(setAlert({ alert: true, type: "danger", message: "Server not responding!" }));
        });
    },
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
        className="w-screen z-40 absolute flex justify-center items-center top-0 left-0 h-screen bg-[#00000080]"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ scale: 0 }}
          className="main overflow-y-scroll scrollbar-none max-sm:w-screen w-[544px] bg-[#FFFFFF] rounded-lg"
        >
          <div className="head px-[24px] items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
            <h1 className="text-[20px]">Create New Sprint</h1>
            <button
              onClick={() => setModal(false)}
              className="text-[#999CA0] hover:opacity-70"
            >
              <AiOutlineClose className="w-[24px] h-[24px]" />
            </button>
          </div>

          <div className="p-[24px]">
            <form onSubmit={handleSubmit}>
              <div className="details my-2">
                <div className="my-1 flex flex-col">
                  <p>Title</p>
                  <InputField
                    name={"title"}
                    placeholder={"Enter sprint title"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    error={errors.title}
                    touched={touched.title}
                  />
                </div>
                <div className="my-[24px] flex flex-col">
                  <label htmlFor="">Description (Optional)</label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                    placeholder="Sprint description here"
                    className="border mt-[8px] rounded-md outline-none p-2"
                    rows={6}
                  ></textarea>
                </div>
                <div className="my-[24px] flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="">Start Date</label>
                    <InputField
                      name={"startDate"}
                      placeholder={""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.startDate}
                      error={errors.startDate}
                      touched={touched.startDate}
                      type="date"
                    />
                    <label className="text-red-500 my-1" htmlFor="">
                      {errors?.startDate}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">End Date</label>
                    <InputField
                      name={"endDate"}
                      placeholder={""}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.endDate}
                      error={errors.endDate}
                      touched={touched.endDate}
                      type="date"
                    />
                    <label className="text-red-500 my-1" htmlFor="">
                      {errors?.endDate}
                    </label>
                  </div>
                </div>
                <div className="flex">
                  <button
                    disabled={loading}
                    type="submit"
                    className="rounded-[8px] w-full flex justify-center items-center font-semibold bg-[#3E84F8] text-white px-[16px] py-[8px]"
                  >
                    Save {loading ? <Loader /> : <FaSave className="mx-3" />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddSprintModal;
