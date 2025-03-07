import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postData } from "../../api";
import { useMatch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/features/appGlobalSlice";
import { setMembers } from "@/store/features/actionItemsSlice";
import Loader from "@/components/Loader";
import UserSearchBox from "@/components/UserSearchBox";
import { Textarea } from "@/components/ui/textarea";
import RequestCard from "@/components/RequestCard";

const TransferOwnershipModal = ({ setModal, request, onSent }) => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { currentWorkspace } = useSelector((state) => state.workspaceState);
  const [loading, setLoading] = useState(false);
  const [existingUser, setExistingUser] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    message: Yup.string().optional(),
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      setLoading(true);
      try {
        const res = await postData(`/workspaces/${currentWorkspace?.id}/transfer-ownership`, data);
        onSent(res)
        resetForm();
        dispatch(
          setAlert({
            alert: true,
            message: "Request sent!",
            type: "success",
          })
        );
        setModal(false);
      } catch (error) {
        dispatch(
          setAlert({
            alert: true,
            message: error.response.data,
            type: "danger",
          })
        );
      } finally {
        setLoading(false);
      }
    },
  });


  const handleEmailBlur = async (e) => {
    handleBlur(e);
    const email = e.target.value;
    if (!errors.email && email) {
      try {
        const response = await postData("/users/check-user", { email });
        if (response) {
          console.log("User exists:", response);
          setExistingUser(response);
          setFieldValue("name", response?.name);
        } else {
          console.log("User does not exist");
        }
      } catch (error) {
        setFieldValue("name", "");
        setExistingUser(null);
        console.error("API call failed:", error);
      }
    }
  };

  console.log(errors)

  return (
    <Dialog open={true} onOpenChange={setModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Ownership</DialogTitle>
        </DialogHeader>
        {request?
        <RequestCard request={request}/>
        :
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              disabled={existingUser}
              value={values.name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              label="Name"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-sm">{errors.name}</div>
            )}
            {existingUser && (
              <p className="text-xs my-1 text-green-600">Existing user found</p>
            )}
          </div>
          <div>
            <Input
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleEmailBlur}
              placeholder="example@xyz.com"
              label="Email"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-sm">{errors.email}</div>
            )}
          </div>
          <div>
            <Textarea
              value={values.message}
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Message (optional)"
              label="Message"
            />
            {errors.message && touched.message && (
              <div className="text-red-500 text-sm">{errors.message}</div>
            )}
          </div>
          <DialogFooter className="flex gap-4">
            <Button
              disabled={loading}
              type="submit"
              className="bg-blue-600 w-full"
            >
              Send Request {loading && <Loader />}
            </Button>
            <Button
              variant="outline"
              onClick={() => setModal(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>}
        
      </DialogContent>
    </Dialog>
  );
};

export default TransferOwnershipModal;
