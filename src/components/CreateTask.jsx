import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";
const CreateTask = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState({
    id: "",
    name: "",
    status: "todo",
  });
const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      const response = await axios.post("https://apis-puce.vercel.app/api/tasks", { name: newTask.name,id:newTask.id,status: newTask.status });
      const { task, message } = response.data;
      setTasks((prevTasks) => [...prevTasks, task]);

      toast.success(message, { icon: "🙂🤞" });

      setNewTask({
        id: "",
    name: "",
    status: "todo",
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
      <button className="bg-cyan-500 rounded-md px-4 h-12 text-white">
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
