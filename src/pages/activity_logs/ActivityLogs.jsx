import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import { Toggle } from "@/components/ui/toggle";
import DateRangePicker from "@/components/DateRangePicker";
import { fetchData } from "@/api";
import { formatChatTimestamp, formatDate } from "@/globalFunctions";

const activities = [
  {
    id: 1,
    type: "Task",
    message: "✅ Task 'Fix API Issue' was completed",
    user: "John",
    date: "2024-02-07",
  },
  {
    id: 2,
    type: "Project",
    message: "📌 New Project 'Redesign Website' was created",
    user: "Alice",
    date: "2024-02-06",
  },
  {
    id: 3,
    type: "Assignment",
    message: "🚀 John assigned a task to you",
    user: "John",
    date: "2024-02-05",
  },
];

const ActivityLogs = () => {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [taskType, setTaskType] = useState("all");
  const [dateFilter, setDateFilter] = useState({ from: null, to: null });
  const {currentWorkspace} = useSelector(state => state.workspaceState);
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])

  const dispatch = useDispatch()

  useEffect(()=>{
    fetchData(`/workspaces/${currentWorkspace?.id}/activity-logs`).then((res)=>{
      console.log(res)
      setLogs(res)
      setFilteredLogs(res)
    })
  },[currentWorkspace?.id])

  const filteredActivities = logs?.filter((activity) => {
    return (
      (search === "" ||
        activity.message.toLowerCase().includes(search.toLowerCase())) &&
      (userFilter === "all" || activity.user === userFilter) &&
      (taskType === "all" || activity.type === taskType) &&
      (dateFilter === "" || activity.date === dateFilter)
    );
  });

  useEffect(()=>{
    dispatch(setCurrentPage('Activity Logs'))
  },[])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search activity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select onValueChange={setUserFilter} value={userFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by User" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="John">John</SelectItem>
            <SelectItem value="Alice">Alice</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setTaskType} value={taskType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Task Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Task">Task</SelectItem>
            <SelectItem value="Project">Project</SelectItem>
            <SelectItem value="Assignment">Assignment</SelectItem>
          </SelectContent>
        </Select>
      <DateRangePicker dateFilter={dateFilter} setDateFilter={setDateFilter} />

      </div>
      <div className="">
      <Toggle
        className="px-4 py-2"
      >
        Projects
      </Toggle>

      <Toggle
        className="px-4 py-2"
      >
        Tasks
      </Toggle>

      <Toggle
        className="px-4 py-2"
      >
        Actions
      </Toggle>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {filteredLogs.length > 0 ? (
              filteredLogs.map((activity) => (
                <li key={activity.id} className="text-sm border-b py-1 hover:bg-slate-100">
                  <div className="">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center hover:text-blue-500 cursor-pointer">
                        <Avatar
                          className={`cursor-pointer border-[3px] w-5 h-5`}
                        >
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h1 className="text-xs">{activity?.user?.name}</h1>
                      </div>
                      <h1 className="text-xs">{formatChatTimestamp(activity?.createdAt)}</h1>
                    </div>
                    {activity.message}
                  </div>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">No activities found.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
