import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const ProjectPieChart = ({ project }) => {
  const data = [
    { name: "Completed", value: 20, color: "#4CAF50" },
    { name: "In Progress", value: 30, color: "#FF9800" },
    { name: "Pending", value: 50, color: "#F44336" },
  ];

  return (
    <div className="">
      <CardHeader>
        <CardTitle>{project?.name}</CardTitle>
      </CardHeader>
      {/* Wrap with ResponsiveContainer */}
      <ResponsiveContainer width={300} height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectPieChart;
