import React, { useState } from "react";
import ModalBase from "../../components/ModalBase";
import InputBox from "../../components/InputBox";
import { AiOutlineClose } from "react-icons/ai";
// import Button from "../../components/Button";
import {Button} from "@/components/ui/button";
import { useFormik } from "formik";
import {postData} from '../../api'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";
import Dropdown from "../../components/Dropdown";
import { setMembers } from "@/store/features/actionItemsSlice";
import Loader from "@/components/Loader";

const AddTeamMemberModal = ({ setModal }) => {
  const {projectId } = useParams()
  const dispatch = useDispatch()
  const {currentWorkspace} = useSelector(state=>state.workspaceState)
  const {members} = useSelector(state=>state.actionItems)
  const [loading, setLoading] = useState(false)
  const { values, errors, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
    },
    onSubmit: (data) => {
      console.log(data);
      setLoading(true)
      data['projectId'] = projectId;
      // data['roleId'] = 1;
      data['workspaceId'] = currentWorkspace.id;
      postData('/users/add-member/', data).then((res)=>{
        console.log(res)
        setModal(false)
        dispatch(setMembers([...members, res]))
        resetForm()
        dispatch(setAlert({ alert: true, message: "User successfully added!", type: "success" }));
        setLoading(false)
      }).catch((error)=>{
        setLoading(false)
        dispatch(setAlert({ alert: true, message: error.response.data, type: "danger" }));
      })
    },
  });

  const handleAddAnother = async () => {
    try {
      await handleSubmit(); // Ensure handleSubmit is awaited
    } catch (error) {
      console.error("Error adding another team member:", error);
    }
  };
  

  return (
    <ModalBase>
      <div className="p-4">
        <div className="head items-center py-[16px] border-b border-slate-200 flex justify-between text-[20px]">
          <h1 className="text-[20px]">Add Team Member</h1>
          <button
            onClick={() => setModal(false)}
            className="text-[#999CA0] hover:opacity-70"
          >
            <AiOutlineClose className="w-[24px] h-[24px]" />
          </button>
        </div>
        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <InputBox value={values.name} name={'name'} handler={{handleChange, handleBlur}} label={"Name"} placeholder={"John Deo"} />
            <InputBox value={values.email} name={'email'} handler={{handleChange, handleBlur}} label={"Email"} placeholder={"example@xyz.com"} />
            <div className="flex justify-between items-end">
          </div>
            <InputBox value={values.designation} name={'designation'} handler={{handleChange, handleBlur}}
              label={"Designation or Title"}
              placeholder={"Project Manager"}
              className='w-full'
            />
            <div className="flex justify-between mt-6">
              <Button disabled={loading} className="mr-2 w-full text-white bg-blue-600">Save {loading && <Loader />}</Button>
              <button onClick={handleAddAnother} className="ml-2 w-full hover:bg-slate-100 rounded-lg">Save and add another</button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default AddTeamMemberModal;
