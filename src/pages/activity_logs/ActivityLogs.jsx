import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

const activities = [
  { id: 1, type: "Task", message: "✅ Task 'Fix API Issue' was completed", user: "John", date: "2024-02-07" },
  { id: 2, type: "Project", message: "📌 New Project 'Redesign Website' was created", user: "Alice", date: "2024-02-06" },
  { id: 3, type: "Assignment", message: "🚀 John assigned a task to you", user: "John", date: "2024-02-05" },
];


const ActivityLogs = () => {
    const [search, setSearch] = useState("");
    const [userFilter, setUserFilter] = useState("");
    const [taskType, setTaskType] = useState("");
    const [dateFilter, setDateFilter] = useState("");
  
    const filteredActivities = activities.filter((activity) => {
      return (
        (search === "" || activity.message.toLowerCase().includes(search.toLowerCase())) &&
        (userFilter === "" || activity.user === userFilter) &&
        (taskType === "" || activity.type === taskType) &&
        (dateFilter === "" || activity.date === dateFilter)
      );
    });
  
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Activity Logs</h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <Input placeholder="Search activity..." value={search} onChange={(e) => setSearch(e.target.value)} />
          
          <Select onValueChange={setUserFilter}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Filter by User" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Users</SelectItem>
              <SelectItem value="John">John</SelectItem>
              <SelectItem value="Alice">Alice</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={setTaskType}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Filter by Task Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="Task">Task</SelectItem>
              <SelectItem value="Project">Project</SelectItem>
              <SelectItem value="Assignment">Assignment</SelectItem>
            </SelectContent>
          </Select>
          
          <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <li key={activity.id} className="text-sm">{activity.message}</li>
                ))
              ) : (
                <li className="text-sm text-gray-500">No activities found.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  
}

export default ActivityLogs

