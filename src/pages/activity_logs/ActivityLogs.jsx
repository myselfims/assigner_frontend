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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "@/store/features/appGlobalSlice";
import { Toggle } from "@/components/ui/toggle";
import DateRangePicker from "@/components/DateRangePicker";
import { fetchData } from "@/api";
import { formatChatTimestamp, formatDate } from "@/globalFunctions";
import CustomAvatar from "@/components/Avatar";
import { FaUsers } from "react-icons/fa6";
import ToggleBtn from "@/components/ToggleBtn";
import LogCard from "./LogCard";
import { setLogs } from "@/store/features/activityLogsSlice";
import { useParams } from "react-router-dom";
import Loader from "@/components/Loader";

const ActivityLogs = () => {
  const [search, setSearch] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [logType, setLogType] = useState("all");
  const [dateFilter, setDateFilter] = useState({ from: null, to: null });
  const { currentWorkspace } = useSelector((state) => state.workspaceState);
  const {logs} = useSelector(state=>state.activityLogsState)
  const [filteredLogs, setFilteredLogs] = useState([]);
  const { members } = useSelector((state) => state.actionItems);
  const {projectId} = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    setLoading(true)
    let url = projectId ? `/projects/${projectId}/activity-logs` : `/workspaces/${currentWorkspace?.id}/activity-logs`
    fetchData(url).then(
      (res) => {
        console.log(res);
        setLoading(false)
        dispatch(setLogs(res))
        setFilteredLogs(res);
      }
    );
  }, [currentWorkspace?.id]);

  useEffect(() => {
    dispatch(setCurrentPage("Activity Logs"));
  }, []);


  useEffect(() => {
    let filtered = [...logs];
  
    if (userFilter !== "all") {
      filtered = filtered.filter((log) => log.user?.id === parseInt(userFilter));
    }
  
    if (logType !== "all") {
      filtered = filtered.filter((log) => log?.entityType?.includes(logType));
    }
  
    if (search.trim()) {
      console.log('searching...')
      filtered = filtered.filter((log) =>
        log?.message?.toLowerCase().includes(search.toLowerCase())
      );
    }
  
    if (dateFilter?.from && dateFilter?.to) {
      filtered = filtered.filter((log) => {
        const logDate = new Date(log?.createdAt);
        return logDate >= new Date(dateFilter?.from) && logDate <= new Date(dateFilter?.to);
      });
    }
  
    setFilteredLogs(filtered);
  }, [logs, userFilter, logType, search, dateFilter]);
  

  return (
    <div className="max-w-3xl mx-auto md:p-6">
      <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>

      <div className="flex flex-wrap gap-4 mb-6 justify-between  select-none">
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
            <SelectItem value="all">
              <div className="flex items-center">
                <FaUsers className="w-4 h-4 mr-2" />
                <p>All Users</p>
              </div>
            </SelectItem>
            {members?.map((m) => (
              <SelectItem value={m?.id}>
                <div className="flex items-center">
                  <CustomAvatar
                    src={m?.avatar}
                    fallback={"CN"}
                    className={"cursor-pointer border-[3px] w-6 h-6 mr-1"}
                  />
                  <p>{m?.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setLogType} value={logType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Task Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Ascending</SelectItem>
            <SelectItem value="Task">Decending</SelectItem>
          </SelectContent>
        </Select>
        <DateRangePicker
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="flex items-center">
          <p className="mr-2">Real-time</p>
          <ToggleBtn
            className="ml-2"
            value={false}
            handler={(v) => console.log(v)}
          />
        </div>
      </div>
      <div className="">
        <button
          onClick={() => setLogType("all")}
          className={`px-4 text-sm py-2 rounded-t-xl ${
            logType === "all" && "bg-gray-200 font-semibold"
          }`}
        >
          All
        </button>
        {!projectId && 
        <>
        <button
          onClick={() => setLogType("workspace")}
          className={`px-4 text-sm py-2 rounded-t-xl ${
            logType === "workspace" && "bg-gray-200 font-semibold"
          }`}
        >
          Workspaces
        </button>
        <button
          onClick={() => setLogType("project")}
          className={`px-4 text-sm py-2 rounded-t-xl ${
            logType === "project" && "bg-gray-200 font-semibold"
          }`}
        >
          Projects
        </button>
        </>
}
        <button
          onClick={() => setLogType("task")}
          className={`px-4 text-sm py-2 rounded-t-xl ${
            logType === "task" && "bg-gray-200 font-semibold"
          }`}
        >
          Tasks
        </button>
        <button
          onClick={() => setLogType("action")}
          className={`px-4 text-sm py-2 rounded-t-xl ${
            logType === "action" && "bg-gray-200 font-semibold"
          }`}
        >
          Actions
        </button>
      </div>
      <Card className="rounded-t-none">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {loading &&
            <li className="flex items-center">
              <Loader className={'mr-2'}/>Fetching
            </li>}
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => <LogCard key={log?.id} log={log} />)
            ) : (
              !loading &&
              <li className="text-sm text-gray-500">No activities found.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
