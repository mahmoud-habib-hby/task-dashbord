import { useContext, useState } from "react";
import axios from "axios";
import "../App.css";
import { Text } from "../component/context/Text";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [Name, SetName] = useState("");
  const { SetUserInfo, SetToken } = useContext(Text);
  const [error, seterror] = useState({});

  function ErrorHandel(Error){
    return <p style={{ borderLeft: "8px #f44336 solid" ,background:"#ffdddd"}} className="m-1  p-2 w-100">{Error}</p>
  }
  const nav=useNavigate();
  const checkLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/register", {
        name: Name,
        email: email,
        password: password,
      })
      .then((e) => {
        SetToken(e.data.token);
        SetUserInfo(e.data.user);
        nav("/dashbord/home");
      })
      .catch((e) => {

        const err = {
          email: e.response?.data?.errors?.email?.[0] || "",
          name: e.response?.data?.errors?.name?.[0] || "",
          data: e.response?.data?.errors ? "" : "البيانات غير صحيحة",
        };
        seterror(err);
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
      className="bg w-100  d-flex align-items-center justify-content-center gap-lg-5"
    >
      <section
        style={{ width: "40%" }}
        className=" m-lg-5 p-lg-3 d-flex flex-column rounded-4 bg-light align-items-center p-3 gap-2"
      >
        <h2 style={{ textAlign: "center", width: "100%" }}>Register</h2>
        <div className="d-flex flex-column align-items-start w-75">
          <label className="fw-medium">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="form-control p-2 "
            value={Name}
            onChange={(e) => SetName(e.target.value)}
          />
          {error.name ? ErrorHandel(error.name) : ""}
        </div>
        <div className="d-flex flex-column align-items-start w-75">
          <label className="fw-medium">Email</label>
          <input
            type="email"
            placeholder="email"
            className="form-control p-2 "
            value={email}
            onChange={(e) => Setemail(e.target.value)}
          />
          {error.email ? ErrorHandel(error.email) : ""}
        </div>
        <div className="d-flex flex-column align-items-start w-75">
          <label className="fw-medium">Password</label>
          <input
            type="password"
            placeholder="password"
            className="form-control p-2 "
            value={password}
            onChange={(e) => Setpassword(e.target.value)}
          />
          {password.length < 6 && password.length > 0 ?ErrorHandel("password less than 6") : ""}
        </div>
        <a href="">You Have An Acount ?</a>
        <button
          disabled={password.length < 6}
          className="btn btn-primary"
          onClick={() => {
            checkLogin();
          }}
        >
          Log in
        </button>
      </section>
    </div>
  );
}
