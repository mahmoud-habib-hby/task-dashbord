import { NavLink } from "react-router-dom";

import home from "../assets/home.png"
import list from "../assets/list.png"
import task from "../assets/task.png"
import profile from "../assets/account.png"
import { Text } from "../component/context/Text"
import { Link, Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
export default function Dashboard(){
    const {Token ,SetToken ,SetUserInfo}=useContext(Text);
    const nav=useNavigate();
    function Logout(){
        axios.post("http://127.0.0.1:8000/api/logout",{},{
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },)
        .then(()=>{
            SetUserInfo("");
            SetToken("");
            nav("/");
        })
        .catch((e)=>console.log(e))
    }

const SideBar = (name, img) => {
  return (
    <NavLink
      to={`/dashbord/${name}`}
      className={({ isActive }) =>
        `d-flex align-items-center text-decoration-none justify-content-center my-2 mx-3 
        ${isActive ? " border-start border-3 border-light px-2" : ""}`
      }
      style={{ cursor: "pointer" }}
    >
      <img src={img} alt={name} />
      <p className="m-0 text-light mx-1">{name}</p>
    </NavLink>
  );
};
    
    return(
       <div className="d-flex flex-nowrap" >
        <div style={{height:"100vh" ,background:"#1F2A44" ,width:"20vw"}}
         className="d-flex flex-column justify-content-start align-items-start p-3" >
         <div className=" p-1 my-4">
             <span className="text-light fw-bolder fs-4 border-start border-5 border-primary p-2" style={{background:"#0d6dfd45"}}>TaskDashboard</span>
         </div>
            {SideBar("home",home)}
            {SideBar("lists",list)}
            {SideBar("tasks",task)}
            {SideBar("profile",profile)}
           
            <button onClick={()=>Logout()} className="btn btn-danger position-absolute bottom-0 fw-bolder mx-3 my-3">Log out</button>
        </div>
        <main>
            <Outlet  />
        </main>
       </div>
    );
}