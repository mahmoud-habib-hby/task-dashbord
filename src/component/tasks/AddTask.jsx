import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Text } from "../context/Text";
import {useNavigate} from "react-router-dom";
import Loading from "../loadingLayer/loading";
import ErrorHandel from "../error/ErrorHandel";

export default function AddTask() {
  const [ListApi, SetListApi] = useState([]);
  const [wait, Setwait] = useState(true);
  const [list, SetList] = useState("");
  const [Title, SetTitle] = useState("");
  const [Description, Setdescription] = useState("");
  const [Time, SetTime] = useState("");
  const { Token } = useContext(Text);
  const [Error,SetError]=useState({});
  const Nav=useNavigate();
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/lists", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) =>{
        SetListApi(e.data.data);
        Setwait(false);
      })
      .catch((e) => console.log(e));
  },[Token]);

  function Handel() {
    axios.post(
      "http://127.0.0.1:8000/api/tasks",
      {
        title: Title,
        description: Description,
        time: Time,
        list_id: list,
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    )
    .then(()=>Nav("/dashbord/home"))
    .catch((e)=>SetError(e.response.data.errors));
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
      <div className="bg-light w-100 h-100 rounded-top-3 flex-column d-flex align-items-center justify-content-center">
        <h3
          className="fw-bolder  w-50 p-1 text-light"
          style={{ background: "#1f2a44" }}
        >
          Add Task
        </h3>
        <form
          action=""
          className="d-flex flex-column gap-2 p-3 w-50  "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
                {Object.values(Error).map((e)=>{
            return(
          <div>
            {ErrorHandel(e)}
          </div>
            );
          })}
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            value={Title}
            onChange={(e) => SetTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descreption"
            className="form-control"
            value={Description}
            onChange={(e) => Setdescription(e.target.value)}
          />
          <input
            type="date"
            placeholder="time"
            className="form-control"
            value={Time}
            onChange={(e) => SetTime(e.target.value)}
          />
          <select
            className="form-select"
            onChange={(e) => SetList(e.target.value)}
            value={list}
          >
            <option className="form-control"></option>
            {ListApi.map((e) => {
              return (
                <option className="form-control" key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-success" onClick={()=>Handel()}>Add Task</button>
        </form>
        {wait ? <Loading /> : ""}
      </div>
    </div>
  );
}
