import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../store/features/appGlobalSlice";
import { fetchData } from "../../api";
import { setUsers } from "../../store/features/usersSlice";
import { setTasks } from "../../store/features/actionItemsSlice";
import { setUser } from "../../store/features/userDetailsSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TeamPerformanceChart from "./TeamPerformanceChart";
import ProjectPieChart from "./ProjectPieChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });
  const [projects, setProjects] = useState([])
  const {members} = useSelector(state=>state.actionItems)

  useEffect(() => {
    dispatch(setCurrentPage("Dashboard"));
     fetchData("/projects")
          .then((res) => {
            setProjects(res || []);
          })
          .catch((error) => {
            console.log(error);
          });

    fetchData("/tasks/").then((res) => {
      dispatch(setTasks(res.data));
      const completed = res.data.filter(task => task.status === "Completed").length;
      const inProgress = res.data.filter(task => task.status === "Ongoing").length;
      const pending = res.data.filter(task => task.status === "On Hold").length;

      setTaskStats({
        total: res.data.length,
        completed,
        inProgress,
        pending
      });
    });

    fetchData("/users/self").then((res) => {
      dispatch(setUser(res.data));
    });
  }, []);

 
  return (
    <div className="p-6 space-y-6 w-full h-full text-black">
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{projects?.length}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{taskStats.completed}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl font-bold">{taskStats.pending}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Project Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(taskStats.completed / taskStats.total) * 100} />
        </CardContent>
      </Card>

      {/* Pie Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Task Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 flex">
              {projects?.map((p)=>(
                <ProjectPieChart project={p} />
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
      <CardHeader>
          <CardTitle>Team Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamPerformanceChart />
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-sm">✅ Task "Fix API Issue" was completed</li>
            <li className="text-sm">📌 New Project "Redesign Website" was created</li>
            <li className="text-sm">🚀 John assigned a task to you</li>
          </ul>
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;
