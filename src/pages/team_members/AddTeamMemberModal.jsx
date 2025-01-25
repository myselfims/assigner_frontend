import React from "react";
import ModalBase from "../../components/ModalBase";
import InputBox from "../../components/InputBox";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../components/Button";
import { useFormik } from "formik";
import {postData} from '../../api'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";
import Dropdown from "../../components/Dropdown";

const AddTeamMemberModal = ({ setModal, roles }) => {
  const {projectId } = useParams()
  const dispatch = useDispatch()
  const { values, errors, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
      roleId : ""
    },
    onSubmit: (data) => {
      console.log(data);
      data['projectId'] = projectId;
      postData('/users/add-member/', data).then((res)=>{
        console.log(res)
        setModal(false)
        dispatch(setAlert({ alert: true, message: "User successfully added!", type: "success" }));
      }).catch((error)=>{
        dispatch(setAlert({ alert: true, message: error.response.data, type: "danger" }));
      })
    },
  });

  console.log(errors)

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
            <Dropdown
              allowMultiple={false}
              showCount={false}
              name={"Select permission"}
              options={roles}
              // onSelect={handleRoleUpdate}
              className={'ml-4'}
            />
          </div>
            <InputBox value={values.designation} name={'designation'} handler={{handleChange, handleBlur}}
              label={"Designation or Title"}
              placeholder={"Project Manager"}
              className='w-full'
            />
            <div className="flex justify-between mt-6">
              <Button btnType="submit" className="mr-2 w-full">Save</Button>
              <button className="ml-2 w-full hover:bg-slate-100 rounded-lg">Save and add another</button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default AddTeamMemberModal;
