import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Text } from "../context/Text";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../loadingLayer/loading";

export function Lists() {
  const { Token, SetNameList } = useContext(Text);
  const [wait, Setwiat] = useState(true);
  const [Lists, SetList] = useState([]);
  const nav=useNavigate();

  function delet(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/lists/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then(() => nav('/dashbord/home'))
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/lists", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((e) => {
        SetList(e.data.data);
        Setwiat(false);
      })
      .catch((e) => console.log(e));
  }, [Token]);
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
      <div className=" h-100 bg-light rounded-top-3 d-flex flex-column align-items-center p-3">
        <h1
          className=" rounded-3 p-2 text-light mt-3"
          style={{
            background: "#1f2a44",
            boxShadow: "0px 0px 4px black",
            width: "fit-content",
          }}
        >
          {" "}
          All Lists
        </h1>
        <hr className="w-75 m-auto my-3" />
        <div
          className="d-flex flex-wrap gap-3 p-4 overflow-auto rounded-3 "
          style={{ width: "fit-contnet", background: "#cdd4fd" }}
        >
          {Lists.map((e) => {
            return (
              <div
                className="bg-light p-4 rounded-3  bg-opacity-7 d-flex flex-column gap-2"
                style={{ border: "5px solid #95a5ff", minWidth: "auto" }}
              >
                <h4 className="fw-bolder mb-4">{e.name}</h4>
                <Link
                  className="btn btn-success w-auto fs-6"
                  to={`/dashbord/UpdateList/${e.id}`}
                >
                  {" "}
                  update List
                </Link>
                <Link
                  to={`/dashbord/task/${e.id}`}
                  className="btn btn-warning w-auto fs-6"
                  onClick={() => SetNameList(e.name)}
                >
                  {" "}
                  Show Tasks
                </Link>
                <Link
                  className="btn btn-outline-danger w-auto fs-6"
                  onClick={() => delet(e.id)}
                >
                  {" "}
                  Delet List
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
