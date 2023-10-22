import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import {
  deleteData,
  fetchData,
  getAuthInfo,
  postData,
  updateData,
} from "../api";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setTasks } from "../store/features/tasksSlice";
import ConfirmModal from "./ConfirmModal";
import Comments from "./Comments";
import { setComments, setModal } from "../store/features/taskDetailsSlice";
import { useFormik } from "formik";
import { TaskSchema } from "../validation/validation_schema";
import { setAlert } from "../store/features/appGlobalSlice";

const Modal = () => {
  const [currentForm, setCurrentForm] = useState("details");
  const task = useSelector((state) => state.taskDetails.activeTask);
  const { users } = useSelector((state) => state.users);
  const [edit, setEdit] = useState(false);
  const { comments } = useSelector((state) => state.taskDetails);
  const [confModal, setConfModal] = useState(false);
  const dispatch = useDispatch();

  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: task,
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      updateData(`/tasks/${task.id}/`, data).then((res) => {
        dispatch(setAlert({alert:true,type:'success',message:'Successfully updated!'}))
        fetchData('/tasks/').then((res)=>{
          dispatch(setTasks(res.data))
        })
      });
    },
  });

  const closeModal = ()=>{

  }

  useEffect(() => {
    fetchData(`/comments/${task.id}`).then((res) => {
      dispatch(setComments(res.data));
      console.log(res.data)
    });
  }, []);

  const deleteTask = (confirmation) => {
    if (confirmation) {
      deleteData(`/tasks/${task.id}`).then((res) => {
        setModal(false);
        dispatch(removeTask(task.id));
        dispatch(setModal(false));
      });
    }
    setConfModal(false);
  };

  return (
    <div key={task.id} className="w-screen absolute flex justify-center items-center top-0 left-0 h-screen bg-[#00000080]">
      <div className="main max-sm:w-96 w-[544px] bg-[#FFFFFF] rounded-lg ">
        <div className="head px-[24px] items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
          <h1 className="text-[20px] ">Task Details</h1>
          <button
            onClick={() => dispatch(setModal(false))}
            className="text-[#999CA0] hover:opacity-70"
          >
            <AiOutlineClose className="w-[24px] h-[24px]" />
          </button>
        </div>

        <div className="p-[24px]">
          <div className="flex justify-between">
            <div className="flex w-[213px] flex-col items-center">
              <button
                onClick={() => setCurrentForm("details")}
                className="font-bold mb-[12px]"
              >
                Details
              </button>
              <div
                className={`h-[4px] rounded-full w-full ${
                  currentForm == "details" ? "bg-[#3F84F8]" : "bg-[#D9D9D9]"
                }`}
              ></div>
            </div>
            <div className="flex w-[213px] flex-col items-center">
              <button
                onClick={() => setCurrentForm("comments")}
                className="font-bold mb-[12px]"
              >
                Comments{" "}
                <label
                  className="bg-green-200 font-bold rounded-full text-xs px-3"
                  htmlFor=""
                >
                  {comments.length}
                </label>
              </button>
              <div
                className={`h-[4px] rounded-full w-full ${
                  currentForm == "comments" ? "bg-[#3F84F8]" : "bg-[#D9D9D9]"
                }`}
              ></div>
            </div>
          </div>
          {currentForm == "details" ? (
            <form onSubmit={handleSubmit}>
              <div className="details my-4">
                <div className="my-1 flex flex-col">
                  {!edit ? (
                    <div className="flex justify-between">
                      <h1 className="font-bold text-2xl">{task?.title}</h1>
                      {getAuthInfo.isAdmin ? (
                        <button
                          onClick={() => setEdit(true)}
                          className="rounded-[8px] flex justify-center items-center font-semibold bg-[#3E84F8] text-white px-3"
                        >
                          Edit <BiSolidEditAlt className="mx-[3px]" />
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <input
                      name="title"
                      placeholder="Eg. John Doe"
                      className="border rounded-md outline-none p-2"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  )}
                </div>
                <div className="my-[24px] flex flex-col">
                  <label htmlFor="">Description</label>
                  <textarea
                    name="description"
                    placeholder="Description here"
                    className="border mt-[8px] rounded-md outline-none p-2"
                    disabled={!edit}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={10}
                  ></textarea>
                </div>

                <div className="my-[24px] flex justify-between">
                  <div className="flex flex-col">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                      name="deadline"
                      id="deadline"
                      placeholder="Eg. John Doe"
                      className="border rounded-md outline-none p-2"
                      disabled={!edit}
                      value={values.deadline}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="">Assigned To</label>
                    {getAuthInfo().isAdmin ? (
                      <select
                        name="assignedToId"
                        defaultValue={values.assignedToId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="border-2 h-full cursor-pointer rounded"
                        id=""
                      >
                        <option value="">{task.assignedToId}</option>
                        {users?.map((u) => {
                          return <option value={u?.id}>{u.name}</option>;
                        })}
                      </select>
                    ) : null}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="">Status</label>
                    <select
                      defaultValue={values.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="border-2 h-full cursor-pointer rounded"
                      name="status"
                      id=""
                    >
                      <option value={'Assigned'}>Assigned</option>
                      <option value="In progress">In progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className={`rounded-[8px]
                     w-full flex justify-center items-center font-semibold bg-[#3E84F8] text-white px-[16px] py-[8px]`}
                  >
                    Save <FaSave className="mx-3" />
                  </button>
                  {getAuthInfo().isAdmin ? (
                    <button
                      type="button"
                      onClick={() => setConfModal(true)}
                      className="text-red-500 rounded-[8px] w-full flex justify-center items-center px-[16px] py-[8px]"
                    >
                      Delete <AiFillDelete className="mx-3" />
                    </button>
                  ) : null}
                </div>
                <div className="comments"></div>
              </div>
            </form>
          ) : (
            <Comments />
          )}
        </div>
      </div>
      {confModal ? (
        <ConfirmModal
          message={"Do you really want to delete this task?"}
          confirm={deleteTask}
        />
      ) : null}
    </div>
  );
};

export default Modal;
