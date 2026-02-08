import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Text } from "../context/Text";
import Loading from "../loadingLayer/loading";

export default function UpdateList() {
  const { id } = useParams();
  const { Token } = useContext(Text);
  const [Name, SetName] = useState();
  const [wait, Setwait] = useState(true);
  const nav = useNavigate();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/lists/${id}/edit`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) => {
        Setwait(false);
        SetName(e.data.data.name);
      })
      .catch((e) => console.log(e));
  }, [Token, id]);
  function handel() {
    axios
      .patch(
        `http://127.0.0.1:8000/api/lists/${id}`,
        {
          name: Name,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      )
      .then(() => nav("/dashbord/lists"))
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
          <label className="w-100" style={{ textAlign: "start" }}>
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={Name}
            onChange={(e) => SetName(e.target.value)}
          />
          <button className="btn btn-success my-3" onClick={() => handel()} disabled={!Name}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
