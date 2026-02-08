import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../context/Text";
import Loading from "../loadingLayer/loading";

export default function UpdateTask() {
  const { id } = useParams();
  const { Token } = useContext(Text);
  const [wait, Setwait] = useState(true);
  const nav = useNavigate();
  const [list, SetList] = useState("");
  const [listApi, SetListApi] = useState([]);
  const [Title, SetTitle] = useState("");
  const [Description, Setdescription] = useState("");
  const [Time, SetTime] = useState("");
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tasks/${id}/edit`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) => {
        Setwait(false);
        SetTitle(e.data.tasks.title);
        Setdescription(e.data.tasks.description);
        SetTime(e.data.tasks.time);
        SetListApi(e.data.lists)
      })
      .catch((e) => console.log(e));
  }, [Token, id]);
  function handel() {
    axios
      .patch(
        `http://127.0.0.1:8000/api/tasks/${id}`,
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
      .then(() => nav('/dashbord/tasks'))
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
      {wait ? <Loading /> : ""}
      <div className="w-100 d-flex align-items-center bg-light h-100 flex-column justify-content-center">
        <h3
          className="fw-bolder text-light p-3 w-50 rounded-3 98pxmy-3"
          style={{ background: "#1F2A44" }}
        >
          Update List
        </h3>
        <div
          style={{ border: "#1F2A44 1px solid" }}
          className="w-50 p-4 rounded-3"
        >
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
            <option className="form-control "> </option>
            {listApi.map((e) => {
              return (
                <option className="form-control" key={e.id} value={e.id}>
                  {e.name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-success my-3" onClick={() => handel()} disabled={!Title || !Time || !Description || !list}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
