import { useContext, useEffect, useState } from "react";
import { Text } from "../context/Text";
import axios from "axios";
import Task from "@/assets/task.png";
import list from "@/assets/list.png";
import { Link, Links } from "react-router-dom";
import Loading from "../loadingLayer/loading";
export function Home() {
  const { Token } = useContext(Text);
  const [wait,Setwait]=useState(true);
  const [Tasks, SetTasks] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/tasks", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) => {
        Setwait(false);
        SetTasks(e.data.data);
      })
      .catch((e) => console.log(e));
  },[Token] );
const DoneTask = Tasks
  .filter(e => e.completed)
  .map(e => {
    const taskDate = new Date(e.time);
    const day = taskDate.getDate() + 1;
    const month = taskDate.getMonth() + 1;
    const year = taskDate.getFullYear();

    return (
      <div
        key={e.id}
        className="rounded-4 bg-light m-2 flex-column d-flex p-2 align-items-start"
        style={{ border: "5px solid #95a5ff" }}
      >
        <h5>{e.title}</h5>
        <p className="text-success">{`${day}/${month}/${year}`}</p>
        <Link className="btn btn-primary" to={`/dashbord/UpdateTask/${e.id}`}>Edit</Link>
      </div>
    );
  });

const FailTask = Tasks
  .filter(e => !e.completed && new Date(e.time) < new Date())
  .map(e => {
    const taskDate = new Date(e.time);
    const day = taskDate.getDate() + 1;
    const month = taskDate.getMonth() + 1;
    const year = taskDate.getFullYear();

    return (
      <div
        key={e.id}
        className="rounded-4 bg-light m-2 flex-column d-flex p-2 align-items-start"
        style={{ border: "5px solid #95a5ff" }}
      >
        <h5>{e.title}</h5>
        <p className="text-danger text-decoration-line-through">{`${day}/${month}/${year}`}</p>
        <Link className="btn btn-primary" to={`/dashbord/UpdateTask/${e.id}`}>Edit</Link>
      </div>
    );
  });

const WaitTask = Tasks
  .filter(e => !e.completed && new Date(e.time) > new Date())
  .map(e => {
    const taskDate = new Date(e.time);
    const day = taskDate.getDate() + 1;
    const month = taskDate.getMonth() + 1;
    const year = taskDate.getFullYear();

    return (
      <div
        key={e.id}
        className="rounded-4 bg-light m-2 flex-column d-flex p-2 align-items-start"
        style={{ border: "5px solid #95a5ff" }}
      >
        <h5>{e.title}</h5>
        <p className="text-warning">{`${day}/${month}/${year}`}</p>
        <Link className="btn btn-primary" to={`/dashbord/UpdateTask/${e.id}`}>Edit</Link>
      </div>
    );
  });

 const task = (name, color, tasks) => {
  const isEmpty = tasks.length === 0;

  return (
    <div className="m-2">
      <div className="fw-bolder d-flex gap-2 mb-2 align-items-center">
        <div
          className={color}
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
        ></div>
        {name}
      </div>

      <div
        className="p-1 rounded-3"
        style={{
          overflow: "auto",
          height: "65vh",
          background: "#cdd4fd",
          minWidth: "fit-content",
          width: "20vw",
        }}
      >
        {isEmpty ? (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column">
           <p className="fw-bolder m-0 fs-4 border-5  text-light px-2" style={{background:"#1f2a446d",borderLeft:"#1F2A44 5px solid"}}> Empty Tasks</p>
          </div>
        ) : (
          tasks
        )}
      </div>
    </div>
  );
};

  return (
    <div
      className="border-bottom-0"
      style={{
        width: "80vw",
        height: "100vh",
        background: "#1f2a44",
        border: "#1f2a44 9px solid",
      }}
    >
      <div
        className="bg-light rounded-top-3 d-flex flex-column align-items-start justify-content-between  "
        style={{ width: "100%", height: "100%" }}
        >
        {wait?<Loading /> :""}
        <div className="d-flex align-items-center w-100  justify-content-around gap-1 px-2" style={{height:"20vh"}}>
          <h3 className="w-50 fw-bolder " style={{ textAlign: "start" }}>
            All Tasks
          </h3>
          <div
            className="h-auto p-2 d-flex align-items-center justify-content-center w-auto gap-2 rounded-3"
            style={{ background: "#1F2A44" }}
          >
            <img src={Task} alt="" className="w-25" />
            <Link to={"/dashbord/AddTask"} className="btn btn-primary" style={{width:"fit-content"}}  >Add Task</Link>
          </div>
          <div
            className="h-auto p-2  d-flex align-items-center justify-content-center w-auto gap-2 rounded-3"
            style={{ background: "#1F2A44" }}
          >
            <img src={list} alt="" className="w-25" />
            <Link to={"/dashbord/AddList"} className="btn btn-primary "  style={{width:"fit-content"}}  >Add List</Link>
          </div>
        </div>
        <hr className="w-75 m-auto my-2" />
        <div className="  w-100 h-75 d-flex align-content-center justify-content-around">
          {task("fail Tasks","bg-danger",FailTask)}
          {task("wait Task","bg-warning",WaitTask)}
          {task("Done Task","bg-success",DoneTask)}
        </div>
      </div>
    </div>
  );
}
