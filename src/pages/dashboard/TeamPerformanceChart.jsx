import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { user: "John", tasksCompleted: 12, comments: 24, statusUpdates: 10 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
  { user: "Jane", tasksCompleted: 15, comments: 18, statusUpdates: 12 },
];

const TeamPerformanceChart = () => {

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="user" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="tasksCompleted" fill="#4CAF50" name="Tasks Completed" />
        <Bar dataKey="comments" fill="#FF9800" name="Comments" />
        <Bar dataKey="statusUpdates" fill="#2196F3" name="Status Updates" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TeamPerformanceChart;
