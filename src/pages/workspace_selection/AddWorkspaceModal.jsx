import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace, setWorkspaces } from "@/store/features/workspaceSlice";
import { useNavigate } from "react-router-dom";
import { postData } from "@/api";

const AddWorkspaceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {workspaces} = useSelector(state => state.workspaceState)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      workspaceName: "",
      workspaceType: "personal",
      description: "",
    },
    validationSchema: Yup.object({
      workspaceName: Yup.string().required("Workspace Name is required"),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.workspaceName,
        type: values.workspaceType,
        description: values.description,
      }
      console.log(data)
      postData('/workspaces', data).then((res)=>{
        console.log(res)
        setIsOpen(false);
        dispatch(setWorkspaces([...workspaces, res.workspace]))
        dispatch(setCurrentWorkspace(values))
        // navigate('/projects')
      })
    },
  });

  const hasUnsavedChanges =
    formik.values.workspaceName || formik.values.description;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !hasUnsavedChanges && setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 dark:bg-slate-700"
        >
          Create Workspace
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Workspace</DialogTitle>
          <DialogClose asChild>
            <Button
              onClick={() => {
                setIsOpen(false);
                formik.resetForm();
              }}
              variant="ghost"
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-400"
            >
              ✖
            </Button>
          </DialogClose>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <Label>Workspace Name</Label>
            <Input
              name="workspaceName"
              value={formik.values.workspaceName}
              onChange={formik.handleChange}
              placeholder="Enter workspace name"
              className="mt-1"
            />
            {formik.errors.workspaceName && (
              <p className="text-red-500 text-sm">{formik.errors.workspaceName}</p>
            )}
          </div>
          <div>
            <Label>Workspace Type</Label>
            <Select
              onValueChange={(value) => formik.setFieldValue("workspaceType", value)}
              value={formik.values.workspaceType}
              className="mt-1"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="organization">Organization</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Description (Optional)</Label>
            <Input
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Brief description"
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 dark:bg-slate-700">
            Create Workspace
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWorkspaceModal;
