import React from "react";
import wave from "../../assets/wave-haikei.svg";
import team from "../../assets/team.svg";
import progressSvg from "../../assets/progress_tracking.svg";
import taskSvg from "../../assets/task_management.svg";
import collabSvg from "../../assets/team_collabration.svg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Footer from '../../components/Footer'

const LandingPage = () => {
  const points = [
    {
      svg: taskSvg,
      title:
        "Task Management: Easy-to-Use Task Boards with Drag-and-Drop Functionality",
      description:
        "Stay organized with flexible, intuitive task boards that help you visually manage projects. Simply drag and drop tasks across columns (e.g., To Do, In Progress, Done) to update progress in real-time. This effortless system keeps everyone aligned, ensuring that priorities and project status are clear at a glance.",
    },
    {
      svg: collabSvg,
      title: "Collaboration Tools: Real-Time Comments and Team Messaging",
      description:
        "Communicate seamlessly with built-in collaboration tools. Leave comments directly on tasks, discuss updates in real time, and receive instant notifications. With fast, in-platform messaging, your team can reduce time spent on email, get feedback quickly, and ensure every team member is in the loop—even when working remotely.",
    },
    {
      svg: progressSvg,
      title: "Progress Tracking: Dashboards and Reports for Project Insights",
      description:
        'Gain actionable insights with our powerful dashboards and reports. Track your project’s progress, identify potential bottlenecks, and view completion metrics—all in one place. With data-driven insights, make informed decisions to keep projects on track and align resources effectively."',
    },
  ];

  return (
    <div className="w-full relative">
      <div className="top-nav sticky z-10 flex items-center justify-between py-6 px-8">
        <div className="flex items-center">
          <img className="w-[100px]" src={logo} alt="" />
          <h1 className="text-5xl font-extrabold text-black">EasyAssigns</h1>
        </div>
        <div className=""></div>
        <div className="">
          <Link to={"/login"} className="mx-6 text-xl text-blue-600">
            Sign in
          </Link>
          <Link
            to={"/signup"}
            className="bg-blue-600 p-2 px-3 text-white font-semibold rounded-full text-xl hover:opacity-75 cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </div>
      <img src={wave} className="absolute top-8 w-full z-0" alt="" />
      <div className="content flex-col relative z-10">
        <div className="s-1 h-[80vh] flex items-center p-8">
          <div className="w-7/12">
            <h1 className="text-7xl font-semibold">
              Effortless Project Management for Teams and Organizations.
            </h1>
          </div>
          <div className="w-8/12">
            <img className="w-[1300px]" src={team} alt="" />
          </div>
        </div>

        <div className="s-2 bg-[#0066FF] my-12 w-full">
          <div className="flex flex-col p-16 w-full items-center justify-center text-white">
            {points?.map((p, index) => (
              <div
                key={index}
                className={`m-6 flex justify-between w-full my-12 ${
                  index % 2 == 0 ? null : "flex-row-reverse"
                }`}
              >
                <img src={p?.svg} className="w-6/12" alt="" />
                <div className="w-full mx-8">
                  <h1 className="text-4xl font-semibold">{p?.title}</h1>
                  <p className="text-2xl leading-10 my-4">{p?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="s-3 my-14">
          <h1 className="text-6xl text-center">Testimonals</h1>

          <div className="flex my-8 justify-between">
            {[9, 3, 4, 4].map((t) => (
              <div className="max-w-sm mx-8 p-6 bg-white shadow-lg rounded-lg">
                <div className="flex items-center space-x-4">
                  <img className="w-16 h-16 rounded-full" src={""} alt={""} />
                  <div>
                    <h3 className="text-lg font-semibold">Imran Shaikh</h3>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
                  omnis quo soluta et a laboriosam neque, reprehenderit, totam
                  deserunt voluptatum enim sapiente ratione ad similique sit
                  adipisci corporis repellat fuga debitis nostrum sunt nobis
                  sequi, delectus culpa? Ut, ipsum nobis?
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

     <Footer />
    </div>
  );
};

export default LandingPage;
