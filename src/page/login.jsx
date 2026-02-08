import {   useContext, useState } from "react";
import axios from "axios";
import "../App.css"
import { Text } from "../component/context/Text";
import { Link, useNavigate } from "react-router-dom";
// mh355fff7@gmail
export function Login() {
  const [password, Setpassword] = useState("");
  const [email, Setemail] = useState("");
  const [error, seterror] = useState({});
  const { SetUserInfo, UserInfo, Token, SetToken } = useContext(Text);
  const nav=useNavigate();
  function ErrorHandel(Error){
    return <p style={{ borderLeft: "8px #f44336 solid" ,background:"#ffdddd"}} className="m-1  p-2 w-100">{Error}</p>
  }
  const checkLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/login", {
        email: email,
        password: password,
      })
      .then((e) => {
    nav("/dashbord/home")
      SetUserInfo(e.data.user);
      SetToken(e.data.token);
      })
      .catch((e) => {
        
        const err = {
           email : e.response?.data?.errors?.email?.[0]||"",
           password: e.response?.data?.errors?.password ?.[0] || "",
          data:e.response?.data?.errors? "":"البيانات غير صحيحة",
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
      <section className="w-auto m-lg-5 p-lg-5 d-flex flex-column rounded-4 bg-light align-items-center p-5 gap-3">
        <div className="d-flex flex-column align-items-start">
          <h1 style={{textAlign:"center" ,width:"100%"}}>Log in</h1>
          <label className="fw-bolder">Email</label>
          <input
            type="email"
            placeholder="email"
            className="form-control p-2"
            value={email}
            onChange={(e) => Setemail(e.target.value)}
          />
          {error.email ?ErrorHandel(error.email): ""}
        </div>
        <div className="d-flex flex-column align-items-start">
          <label className="fw-bolder">Password</label>
          <input
            type="password"
            placeholder="password"
            className="form-control p-2 "
            value={password}
            onChange={(e) => Setpassword(e.target.value)}
          />
          {error.password ? (
            ErrorHandel(error.password)
          ) : (
            ""
          )}
            {error.data? (
            ErrorHandel(error.data)
          ) : (
            ""
          )}
          {password.length <6?ErrorHandel("password less than 6"):""}
        </div>
        <Link to='register' >New Accont</Link>
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
