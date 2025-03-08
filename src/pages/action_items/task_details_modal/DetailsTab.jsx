import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsWorkspaceOwner } from "@/customHooks";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { TaskSchema } from "@/validation/validation_schema";
import FileCard from "@/pages/group_chat/files/FileCard";
import { AiOutlineClose } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEditAlt } from "react-icons/bi";
import { fetchData, updateData } from "@/api";
import UserSearchBox from "@/components/UserSearchBox";
import Dropdown from "@/components/Dropdown";
import LogCard from "@/pages/activity_logs/LogCard";
import Tooltip from "@/components/Tooltip";
import CustomAvatar from "@/components/Avatar";
import { formatDate, getInitials } from "@/globalFunctions";

const files = [
  {
    id: 1,
    name: "Vacation Photo 1",
    type: "image",
    date: "2024-01-15T08:30:00Z",
    url: "https://via.placeholder.com/150",
    size: "2 MB",
  },
  {
    id: 2,
    name: "Project Proposal.pdf",
    type: "pdf",
    date: "2024-01-10T14:30:00Z",
    url: "https://via.placeholder.com/150",
    size: "1.5 MB",
  },
  {
    id: 3,
    name: "Budget Report.xlsx",
    type: "excel",
    date: "2024-02-20T09:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "500 KB",
  },
  {
    id: 4,
    name: "Team Meeting Video.mp4",
    type: "video",
    date: "2024-02-25T16:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "15 MB",
  },
  {
    id: 5,
    name: "Monthly Newsletter.pdf",
    type: "pdf",
    date: "2024-03-01T11:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "3 MB",
  },
  {
    id: 6,
    name: "Design Mockups.jpg",
    type: "image",
    date: "2024-03-10T10:30:00Z",
    url: "https://via.placeholder.com/150",
    size: "2.5 MB",
  },
  {
    id: 7,
    name: "Invoice 12345.pdf",
    type: "pdf",
    date: "2024-03-15T13:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "1 MB",
  },
  {
    id: 8,
    name: "Client Feedback.txt",
    type: "text",
    date: "2024-04-05T14:30:00Z",
    url: "https://via.placeholder.com/150",
    size: "250 KB",
  },
  {
    id: 9,
    name: "Conference Slides.pptx",
    type: "pptx",
    date: "2024-04-10T12:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "10 MB",
  },
  {
    id: 10,
    name: "Team Outing Photos",
    type: "image",
    date: "2024-05-15T08:00:00Z",
    url: "https://via.placeholder.com/150",
    size: "5 MB",
  },
];

const DetailsTab = () => {
  const [currentForm, setCurrentForm] = useState("details");
  const task = useSelector((state) => state.taskDetails.activeTask);
  const { members, statuses } = useSelector((state) => state.actionItems);
  const [logs, setLogs] = useState([]);
  const [edit, setEdit] = useState(false);
  const isOwner = useIsWorkspaceOwner();

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: task,
    validationSchema: TaskSchema,
    onSubmit: (data) => {
      updateData(`/tasks/${task.id}/`, data).then((res) => {
        dispatch(
          setAlert({
            alert: true,
            type: "success",
            message: "Successfully updated!",
          })
        );
        fetchData("/tasks/").then((res) => {
          dispatch(setTasks(res.data));
        });
      });
    },
    enableReinitialize: true,
  });

  const handleUserSelect = (user) => {
    console.log(user);
    setFieldValue("assignedToId", user[0].id);
  };

  const updateStatus = (status) => {
    setFieldValue("status", status[0]);
  };

  const fetchActivity = async () => {
    try {
      let response = await fetchData(`/tasks/${task?.id}/activity-logs/`);
      console.log(response);
      setLogs(response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <TabsContent value="details" className="mt-4 h-full">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center">
          {!edit ? (
            <div className="flex justify-between items-center w-full">
              <h1 className="font-semibold text-xl ">{task?.title}</h1>
              {true && (
                <div className="flex items-center">
                  <Tooltip content="Edit">
                    <BiSolidEditAlt
                      className="w-7 h-7 rounded-full hover:bg-slate-300 active:bg-slate-300 cursor-pointer p-1 "
                      onClick={() => setEdit(true)}
                    />
                  </Tooltip>

                  <Tooltip content="Delete">
                    <AiFillDelete className="ml-2 text-red-600 w-7 h-7 rounded-full hover:bg-slate-300 active:bg-slate-300 cursor-pointer p-1" />
                  </Tooltip>
                </div>
              )}
            </div>
          ) : (
            <Input
              name="title"
              placeholder="Task Title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className="text-xl"
            />
          )}
        </div>

        <div className="flex flex-col my-2">
          <Dropdown
            name={statuses?.find((s) => s.id == task?.status)?.name}
            selectedColor={"bg-white"}
            showCount={false}
            options={statuses}
            onSelect={updateStatus}
            className={"py-[5px]"}
            disabled={!edit}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm font-medium">Description</label>
          <div className="relative">
            <Textarea
              name="description"
              placeholder="Description here"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 text-black bg-gray-100 opacity-100"
              rows={6}
            />
            {!edit && (
              <div className="absolute inset-0 cursor-not-allowed bg-transparent"></div>
            )}
          </div>
        </div>

        <div className="my-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-medium">Attachments</h1>
            <Button>Add Attachments</Button>
          </div>
          <div className="flex w-full overflow-x-auto pb-2">
            {files?.map((file, idx) => (
              <FileCard key={idx} className={"mx-2 min-w-[250px]"} file={file} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Deadline</label>
            <div className="relative">
              <Input
                name="deadline"
                type="date"
                value={values.deadline}
                onChange={handleChange}
                onBlur={handleBlur}
                className="bg-white text-black" // Ensure consistent text and background color
              />
              {!edit && (
                <div className="absolute inset-0 cursor-not-allowed bg-transparent"></div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className={`block text-sm font-medium ${
                errors?.assignedToId && "text-red-500"
              }`}
            >
              Assign to
            </label>
            <UserSearchBox
              onSelect={handleUserSelect}
              allowMultiple={false}
              passedUsers={members}
              selected={members?.filter((m) => m?.id === values?.assignedToId)}
              disabled={!edit}
            />
          </div>
        </div>

        <div className="flex mt-4 text-sm">
          <div className="">
            <h1 className="font-medium">Reporter</h1>
            <div className="flex items-center">
              <CustomAvatar fallback={getInitials(task?.assignedBy?.name)} className={'w-4 h-4 mr-1 font-medium border border-slate-400 p-2 tex-[2px]'}/>
              <p>{task?.assignedBy?.name}</p>
            </div>
          </div>

          <div className="mx-4 text-sm">
            <h1 className="font-medium">Reporting date</h1>
           <p>{formatDate(task?.createdAt)}</p>
          </div>
        </div>

        {edit && (
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              {<FaSave />} Save Changes
            </Button>
          </div>
        )}
      </form>

      <Separator className="mt-8" />
      <div className="mt-8">
        <h1 className="font-medium">Activity Logs</h1>
        <div>
          {logs?.map((l) => (
            <LogCard key={l?.id} log={l} />
          ))}
        </div>
      </div>
    </TabsContent>
  );
};

export default DetailsTab;
