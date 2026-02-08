import axios from "axios";
import { useContext, useEffect, useState } from "react";
import check from "@/assets/circle.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import Done from "@/assets/check_circle.png";
import Loading from "../loadingLayer/loading";
import { Text } from "../context/Text";

export function Task() {
  const { Token, NameList } = useContext(Text);
  const [Tasks, SetTasks] = useState([]);
  const [wait,Setwiat]=useState(true);
  const { id } = useParams();
    const nav=useNavigate();
  function delet(id){
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`,{
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }).then(()=>nav("/dashbord/home"))
      .catch((e)=>console.log(e))
  }
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) => {
        SetTasks(e.data.data);
        Setwiat(false)
      })
      .catch((e) => console.log(e));
  }, [id, Token]);
    function Toggle(id){
    Setwiat(true)
    axios.post(`http://127.0.0.1:8000/api/tasks/${id}/toggle`,{},{
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((res) => {
      Setwiat(false)
    const updatedTask = res.data.data;
    SetTasks(prev =>
      prev.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      ))
      })
      .catch((e) => console.log(e));
  }
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
    {wait? <Loading />:""}
   
      <div className="bg-light h-100 rounded-top-3 d-flex flex-column p-3 align-items-center">
        <h1
          className="rounded-3 p-2 text-light mt-3"
          style={{
            background: "#1F2A44",
            boxShadow: "0px 0px 4px black",
            width: "fit-content",
          }}
        >
          {" "}
          {NameList}
        </h1>
        <hr className="w-75 m-auto my-3" />
        <div className="d-flex flex-wrap gap-3 p-3 overflow-auto rounded-3 " style={{ background:'#cdd4fd',width:"fit-content"}}>
          {Tasks.map((e) => {
            return (
              <div
                className="bg-light p-4 rounded-3 bg-opacity-7 d-flex flex-column gap-2 align-items-start"
                style={{border:"5px solid #95a5ff" , minWidth: "auto" }}
              >
                <h4 className="fw-bolder w-100 ">{e.title}</h4>
                <pre
                  style={{ border: "1px solid black" }}
                  className="w-75 m-auto"
                />
                <p className="fw-bold">Description / {e.description}</p>
                <p className="text-success fw-bold">
                  Time / {e.time.split("T")[0]}
                </p>
                 <div onClick={()=>Toggle(e.id)} className=" fw-medium" style={{cursor:'pointer'}}>
                                  {!e.completed ? (
                                    <div>
                                      <img src={check} alt="" /> uncomplete
                                    </div>
                                  ) : (
                                    <div>
                                      <img src={Done} alt="" /> complete
                                    </div>
                                  )}
                                </div>
                <div className="w-100 d-flex gap-3 ">
                  <Link className="btn btn-success w-50 m-auto fs-6" to={`/dashbord/UpdateTask/${e.id}`}>
                    {" "}
                    update
                  </Link>
                  <button onClick={()=>delet(e.id)} className="btn btn-outline-danger w-50  m-auto fs-6">
                    {" "}
                    Delet
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
