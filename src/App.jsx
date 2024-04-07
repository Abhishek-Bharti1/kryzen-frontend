import React, { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import toast,{ Toaster } from "react-hot-toast";
import axios from "axios";
const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://apis-puce.vercel.app/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to fetch tasks", { icon: "😡" });
      }
    };

    fetchTasks();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get("https://apis-puce.vercel.app/api/tasks/download-pdf", {
        responseType: "blob", 
      });
  
      const blob = new Blob([response.data], { type: "application/pdf" });
  
      const url = window.URL.createObjectURL(blob);
  
      window.open(url);
  
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
  return (
    <>
      <Toaster />
      <div className="bg-slate-100 w-screen h-screen flex flex-col items-center pt-32 gap-16">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      <button onClick={handleDownload} className="bg-cyan-500 rounded-md px-4 h-12 text-white flex float-end items-center justify-center">Download task as PDF</button>
      </div>
    </>
  );
};

export default App;
