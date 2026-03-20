import { useContext, useEffect, useState } from "react"; 
import { Text } from "../context/Text"; 
import axios from "axios"; 
import { Link } from "react-router-dom"; 
import Loading from "../loadingLayer/loading"; 

export function Home() { 
  const { Token } = useContext(Text); 
  const [wait, Setwait] = useState(true); 
  const [Tasks, SetTasks] = useState([]); 

  useEffect(() => { 
    axios 
      .get("http://127.0.0.1:8000/api/tasks", { 
        headers: { Authorization: `Bearer ${Token}` }, 
      }) 
      .then((e) => { 
        Setwait(false); 
        SetTasks(e.data.data); 
      }) 
      .catch((e) => console.log(e)); 
  }, [Token]); 

  const DoneTask = Tasks.filter(e => e.completed).map(e => {
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

  const FailTask = Tasks.filter(e => !e.completed && new Date(e.time) < new Date()).map(e => {
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

  const WaitTask = Tasks.filter(e => !e.completed && new Date(e.time) > new Date()).map(e => {
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
      <div className="m-2" style={{ flex: 1, minWidth: 250, maxWidth: 400 }}>
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
            height: "70vh",
            background: "#cdd4fd",
          }}
        >
          {isEmpty ? (
            <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column">
              <p
                className="fw-bolder m-0 fs-4 border-5 text-light px-2"
                style={{ background: "#1f2a446d", borderLeft: "#1F2A44 5px solid" }}
              >
                Empty Tasks
              </p>
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
      style={{
        width: "80vw",
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {wait && <Loading />}

      <div
        className="d-flex bg-white align-items-center justify-content-around gap-1 p-3"
        style={{ height: "fit-content", flexWrap: "wrap",boxShadow:"0px 0px 1px black" }}
      >
       <span className="fs-4">All Tasks</span>
        <div
          className="h-auto d-flex align-items-center justify-content-center gap-2 rounded-3"
        >
          <Link to={"/dashbord/AddTask"} className="btn btn-primary">
            Add Task
          </Link>
        </div>
        <div
          className="h-auto p-2 d-flex align-items-center justify-content-center gap-2 rounded-3"
        >
          <Link to={"/dashbord/AddList"} className="btn btn-primary">
            Add List
          </Link>
        </div>
      </div>


      <div
        className="overflow-auto d-flex flex-wrap justify-content-around align-items-start"
        style={{ gap: "1rem",height:'80vh' }}
      >
        {task("Fail Tasks", "bg-danger", FailTask)}
        {task("Wait Tasks", "bg-warning", WaitTask)}
        {task("Done Tasks", "bg-success", DoneTask)}
      </div>
    </div>
  );
}