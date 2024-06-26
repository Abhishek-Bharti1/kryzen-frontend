import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
const CreateTask = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    id: "",
    name: "",
    status: "todo",
    date :Math.ceil(Date.now()/(1000*60*60*24)) //if you want to do self updated date otherwise put empty string
  });
const handleSubmit = async (e) => {
    e.preventDefault();
    if(newTask.name.length < 3){
      toast.error("Please enter at least 3 characters",{icon:"😒"});
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:3000/api/tasks", { name: newTask.name,id:newTask.id,status: newTask.status,date:newTask.date });
      const { task, message } = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);

      toast.success(message, { icon: "🙂🤞" });

      setNewTask({
        id: "",
    name: "",
    status: "todo",
    date:"",
      });
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task", { icon: "😡" });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        value={newTask.name}
        onChange={(e) =>
          setNewTask({ ...newTask, id: uuidv4(), name: e.target.value })
        }
      />
        <input
        type="date"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        value={newTask.date}
        onChange={(e) =>
          setNewTask({ ...newTask, date: e.target.value })
        }
      />
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
