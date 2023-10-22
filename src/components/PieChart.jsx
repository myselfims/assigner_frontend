import React from "react";
import { Doughnut,Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

// ChartJS.register(ArcElement,Tooltip,Lengend)


const PieChart = () => {
  const {tasks} = useSelector((state) => state.tasks);

  console.log(tasks)
  const data = {
    labels: ["Assigned", "In progress", "Done"],
    datasets: [
      {
        label: 'Tasks',
        data: [
          20,
          44,
          20
        ],
        borderRadius: 2,
        backgroundColor: ["#EE8484", "#F6DC7D", "#98D89E"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
        align: "center",
        padding: 300,
        labels: {
          font: {
            size: 14,
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };


  return (
    <div className="chart w-[400px] h-[400px]">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
