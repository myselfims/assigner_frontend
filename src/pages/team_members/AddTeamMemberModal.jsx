import React from "react";
import ModalBase from "../../components/ModalBase";
import InputBox from "../../components/InputBox";
import { AiOutlineClose } from "react-icons/ai";
import Button from "../../components/Button";
import { useFormik } from "formik";
import {postData} from '../../api'
import { useParams } from "react-router-dom";

const AddTeamMemberModal = ({ setModal }) => {
  const {projectId } = useParams()
  const { values, errors, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
    },
    onSubmit: (data) => {
      console.log(data);
      data['projectId'] = projectId;
      postData('/users/add-member/', data).then((res)=>{
        console.log(res)
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
            <InputBox value={values.designation} name={'designation'} handler={{handleChange, handleBlur}}
              label={"Designation or Title"}
              placeholder={"Project Manager"}
            />
            <div className="flex justify-between mt-6">
              <Button btnType="submit" className="mr-2 w-full">Save</Button>
              <Button className="ml-2 w-full">Save and add another</Button>
            </div>
          </form>
        </div>
      </div>
    </ModalBase>
  );
};

export default AddTeamMemberModal;
