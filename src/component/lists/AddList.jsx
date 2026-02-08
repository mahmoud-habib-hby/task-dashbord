import axios from "axios";
import { useContext,  useState } from "react";
import { Text } from "../context/Text";
import {useNavigate} from "react-router-dom";

export default function AddList() {
  const [Name, SetName] = useState("");
  const { Token,UserInfo } = useContext(Text);
  const Nav=useNavigate();
    function Handel() {
    axios.post(
      "http://127.0.0.1:8000/api/lists",
      {
        name: Name,
        user_id: UserInfo.id,
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      },
    )
    .then(()=>Nav("/dashbord/home"))
    .catch((e)=>console.log(e));
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
          className="fw-bolder  w-50 p-1 text-light rounded-2 m-0"
          style={{ background: "#1f2a44" }}
        >
          Add List
        </h3>
        <form
          action=""
          className="d-flex flex-column gap-2 p-3 w-50  "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={Name}
            onChange={(e) => SetName(e.target.value)}
          />

          <button className="btn btn-success" onClick={()=>Handel()}>Add List</button>
        </form>
      </div>
    </div>
  );
}
