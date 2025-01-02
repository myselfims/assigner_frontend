import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { fetchData, postData } from "../api";
import { useFormik } from "formik";
import { TaskSchema } from "../validation/validation_schema";
import { useDispatch } from "react-redux";
import { addTask } from "../store/features/tasksSlice";
import { setAlert } from "../store/features/appGlobalSlice";
import Loader from '../components/Loader'
import InputField from "./InputField";
import UsersDropdown from "./UsersDropdown";

const initialValues = {
  title: "",
  description: "",
  deadline: "",
  assignedToId: "",
};

const AddTaskModal = ({ setModal }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  const {
    values,
    errors,
    touched,
    resetForm,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      setLoading(true)
      postData(`/tasks/`, data)
        .then((res) => {
          setLoading(false)
          setModal(false);
          
          dispatch(addTask(res.data));
        })
        .catch((error) => {
          setLoading(false)
          dispatch(setAlert({alert:true,type:'danger',message:'Server not responding!'}))
        });
    },
  });

  useEffect(() => {
    fetchData("/users").then((res) => {
      
      setUsers(res.data);
    });
  }, []);

  

  return (
    <div className="w-screen z-40 absolute flex justify-center items-center top-0 left-0 h-screen bg-[#00000080]">
      <div className="main overflow-y-scroll max-sm:w-screen w-[544px] bg-[#FFFFFF] rounded-lg ">
        <div className="head px-[24px] items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
          <h1 className="text-[20px] ">Add New Task</h1>
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
                name={'title'}
                placeholder={'Enter title'}
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
                    name={'deadline'}
                    placeholder={''}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.deadline}
                    error={errors.deadline}
                    touched={touched.deadline}
                    type="date"
                  />
                   <label className="text-red-500 my-1" htmlFor="">{errors?.deadline}</label>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="">Assign to</label>
                  <UsersDropdown />
                  <label className="text-red-500 my-1" htmlFor="">{errors?.assignedToId}</label>
                </div>
              </div>
              <div className="flex ">
                <button
                  disabled={loading}
                  type="submit"
                  className="rounded-[8px] w-full flex justify-center items-center font-semibold bg-[#3E84F8] text-white px-[16px] py-[8px]"
                >
                  Save {loading?<Loader/>:<FaSave className="mx-3" />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
