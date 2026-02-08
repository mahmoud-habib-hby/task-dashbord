import { useContext } from "react";
import { Link } from "react-router-dom";
import { Text } from "../context/Text";
export default function Profile() {
  const { UserInfo } = useContext(Text);
  return (
    <div
      className="border-bottom-0"
      style={{
        width: "80vw",
        height: "100vh",
        background: "#1f2a44",
        border: "#1f2a44 20px solid",
      }}
    >
      <div
        className="d-flex bg-light rounded-top-2 align-items-center justify-content-center p-4 "
        style={{ width: "100%", height: "100%" }}
      >
        <div className=" h-50 rounded-3 d-flex align-items-center justify-content-center  flex-column my-3 w-75 ">
          <h3
            className="w-75 text-light  p-3 rounded-3"
            style={{ textAlign: "center",background:"#1F2A44" }}
          >
            Profile
          </h3>
          <div
            className=" h-auto p-3  rounded-3 bg-light  w-75 "
            style={{ border: "black 1px solid" }}
          >
            <div className="fw-bolder  p-1 rounded-2 ">
              <label className="w-100 fs-5 text-primary" style={{textAlign:"start"}}>Name</label>
              <p className="form-control fs-4">{UserInfo.name}</p>
              
            </div>
            <div className="fw-bolder p-1 rounded-2">
              <label className="w-100 fs-5 text-primary" style={{textAlign:"start"}}>Email</label>
              <p className="form-control fs-4">{UserInfo.email}</p>
              
            </div>
            <Link className="btn btn-primary" to={'/dashbord/UpdateProfile'}>Edit</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
