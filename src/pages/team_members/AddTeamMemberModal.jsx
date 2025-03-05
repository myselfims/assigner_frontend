import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from '../../api';
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";
import { setMembers } from "@/store/features/actionItemsSlice";
import Loader from "@/components/Loader";
import UserSearchBox from "@/components/UserSearchBox";

const AddTeamMemberModal = ({ setModal }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector(state => state.workspaceState);
  const { members } = useSelector(state => state.actionItems);
  const [loading, setLoading] = useState(false);
  const [existingUser, setExistingUser] = useState(null)
const isProjectRoute = useMatch("/:workspaceId/project/:project_id/*");

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    designation: Yup.string().required("Designation is required"),
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm, setFieldValue } = useFormik({
    initialValues: {
      name: "",
      email: "",
      designation: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      setLoading(true);
      data['projectId'] = projectId;
      data['workspaceId'] = currentWorkspace.id;
      try {
        const res = await postData('/users/add-member/', data);
        dispatch(setMembers([...members, res]));
        resetForm();
        dispatch(setAlert({ alert: true, message: "User successfully added!", type: "success" }));
        setModal(false);
      } catch (error) {
        dispatch(setAlert({ alert: true, message: error.response.data, type: "danger" }));
      } finally {
        setLoading(false);
      }
    },
  });

  const handleAddAnother = async () => {
    await handleSubmit();
  };

  const handleEmailBlur = async (e) => {
    handleBlur(e);
    const email = e.target.value;
    if (!errors.email && email) {
      let userExist = members.find((m)=>m.email.includes(email))
      if (!userExist){
        try {
          const response = await postData('/users/check-user', {email});
          if (response) {
            console.log("User exists:", response);
            setExistingUser(response)
            setFieldValue('name', response?.name)       
          } else {
            console.log("User does not exist");
          }
        } catch (error) {
          setFieldValue('name', "")       
          setExistingUser(null)
          console.error("API call failed:", error);
        }

      } else {
        alert('User is already invited!')
        setFieldValue('email', "")
      }
    }
  };

  return (
    <Dialog open={true} onOpenChange={setModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        {isProjectRoute ?
          <div className="flex flex-col">
            <UserSearchBox allowMultiple={true} className='w-full py-2 h-auto'/>
            <Button disabled={loading} type="submit" className="bg-blue-600 mt-4 w-48">Invite {loading && <Loader />}</Button>
          </div>
        :
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input disabled={existingUser} value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} placeholder="John Doe" label="Name" />
            {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
            {existingUser && <p className="text-xs my-1 text-green-600">Existing user found</p>}
          </div>
          <div>
            <Input value={values.email} name="email" onChange={handleChange} onBlur={handleEmailBlur} placeholder="example@xyz.com" label="Email" />
            {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div>
            <Input value={values.designation} name="designation" onChange={handleChange} onBlur={handleBlur} placeholder="Project Manager" label="Designation or Title" />
            {errors.designation && touched.designation && <div className="text-red-500 text-sm">{errors.designation}</div>}
          </div>
          <DialogFooter className="flex gap-4">
            <Button disabled={loading} type="submit" className="bg-blue-600 w-full">Invite {loading && <Loader />}</Button>
            <Button variant="outline" onClick={handleAddAnother} className="w-full">Send and Invite Another</Button>
          </DialogFooter>
        </form>}
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamMemberModal;
