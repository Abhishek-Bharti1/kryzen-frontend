import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDrag, DndProvider,useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [rework, setRework] = useState([]);
  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInprogress = tasks.filter((task) => task.status === "inprogress");
    const fDone = tasks.filter((task) => task.status === "done");
    const fRework = tasks.filter((task) => task.status === "rework");

    setTodos(fTodos);
    setInProgress(fInprogress);
    setDone(fDone);
    setRework(fRework);
  }, [tasks]);
  const statuses = ["todo", "inprogress", "done", "rework"];
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
          rework={rework}
        />
      ))}
    </div>
  </DndProvider>
  );
};

export default ListTasks;

const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  done,
  rework,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop:(item)=>addItemToSection(item.id,item._id,item.date),
        collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos;
  if (status === "inprogress") {
    text = "In progress";
    bg = "bg-purple-500";
    tasksToMap = inProgress;
  }
  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }
  if (status === "rework") {
    text = "Rework";
    bg = "bg-yellow-500";
    tasksToMap = rework;
  }
  const addItemToSection = async (id,_id,date) => {
    try {
      setTasks((prev) => {
       return prev.map((task) => {
         if (task.id === id) {
           return { ...task, status,date };
         }
         return task;
       });
     });
      await axios.put(`http://localhost:3000/api/tasks/${_id}`, { status:status,date:date });

      toast.success("Task updated successfully", { icon: "🙌" });
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task", { icon: "😡" });
    }
  };
  return (
    <div ref={drop} className={`w-64 rounded-md p-2 ${isOver?"bg-slate-200":""}`}>
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} tasks={tasks} setTasks={setTasks} task={task} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}
    >
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [isEditDate,setIsDate] = useState(false);
  const [newDate,setNewDate] = useState("");
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item:{id:task.id,_id:task._id,date:task.date},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
const handleEditDate=()=>{
  setIsDate(!isEditDate);
}
  const handleRemove = async (_id,id) => {
    try {
      await axios.delete(`https://apis-puce.vercel.app/api/tasks/${_id}`);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); 

      toast.success("Task deleted successfully", { icon: "😒" });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task", { icon: "😡" });
    }
  };

const handleChangeDate=(e)=>{
setNewDate(e.target.value);
addItemToSection(newDate);
}

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md ${isDragging ? "opacity-25":"opacity-100"} cursor-grab`}
    >
      <p>{task.name} </p>
      <p>Date: {task.date}</p>
<button onClick={handleEditDate} style={{border:"1px solid red"}}>
  Edit Date
</button>
{isEditDate ? 
  <input
        type="date"
        className="border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1"
        value={newDate}
        onChange={(e) =>
         handleChangeDate(e)
        }
      />
: null}
      <button
        className="absolute bottom-1 right-1 text-slate-400"
        onClick={() => handleRemove(task._id,task.id)
      
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
