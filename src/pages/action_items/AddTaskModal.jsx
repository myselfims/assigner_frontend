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
import { motion, AnimatePresence } from "motion/react";
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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { projectId } = useParams();
  const {members} = useSelector(state=>state.actionItems)

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      setLoading(true);
      data["projectId"] = projectId;
      data["sprintId"] = sprint?.id;
      postData(`/tasks/`, data)
        .then((res) => {
          setLoading(false);
          setModal(false);
          console.log(res)
          addTask(res);
        })
        .catch((error) => {
          setLoading(false);
          const { data } = error?.response;
          dispatch(setAlert({ alert: true, type: "danger", message: data }));
        });
    },
  });

  useEffect(() => {
    fetchData("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleUserSelect = (user) => {
    console.log("user", user);
    let id = user[0].id;
    setFieldValue("assignedToId", id);
    console.log("ass called", id)
  };


console.log(errors)
console.log(values)


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
          className="main overflow-y- scrollbar-none max-sm:w-screen w-[544px] bg-[#FFFFFF] rounded-lg "
        >
          <div className="head px-[24px] items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
            <h1 className="text-[20px]">
              {sprint?.title ? sprint?.title : "Add new task"}
            </h1>
            <button
              onClick={() => setModal(false)}
              className="text-[#999CA0] hover:opacity-70"
            >
              <AiOutlineClose className="w-[24px] h-[24px]" />
            </button>
          </div>

          <div className="p-[24px]">
            <form onSubmit={handleSubmit}>
              <div className="details">
                <div className="my- flex flex-col">
                  <p>Title</p>
                  <InputField
                    name={"title"}
                    placeholder={"Enter title"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    error={errors.title}
                    touched={touched.title}
                  />
                </div>
                <div className="my-[24px] flex flex-col">
                  <label htmlFor="">Description (Optional) </label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    name="description"
                    placeholder="Description here"
                    className="border mt-[8px] rounded-md outline-none p-2"
                    rows={10}
                  ></textarea>
                </div>
                <div className="my-[24px] flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="">Deadline</label>
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
                    {/* <label className="text-red-500 my-1" htmlFor="">
                      {errors?.deadline}
                    </label> */}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Assign to</label>
                    <UserSearchBox
                      onSelect={handleUserSelect}
                      allowMultiple={false}
                      passedUsers={members}
                    />
                    {/* <label className="text-red-500 my-1" htmlFor="">
                      {errors?.assignedToId}
                    </label> */}
                  </div>
                </div>
                <div className="flex ">
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

export default AddTaskModal;
