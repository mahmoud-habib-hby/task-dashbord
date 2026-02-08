import axios from "axios";
import { useContext,  useState } from "react";
import { useNavigate} from "react-router-dom";
import { Text } from "../context/Text";
import ErrorHandel from "../error/ErrorHandel";


export  default function UpdateProfile(){
  const { Token ,UserInfo ,SetUserInfo } = useContext(Text);
  const [Name, SetName] = useState(UserInfo.name);
  const [Email, SetEmail] = useState(UserInfo.email);
  const [Error,SetError]=useState({})
  const nav = useNavigate();
  function handel() {
    axios
      .put(
        `http://127.0.0.1:8000/api/update`,
        {
          name: Name,
          email:Email
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        },
      )
      .then((e) => {
    SetUserInfo(e.data.user)
    nav("/dashbord/profile")
    }
    )
      .catch((e) => SetError(e.response.data.errors));
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
      <div className="w-100 d-flex align-items-center bg-light h-100 flex-column justify-content-center">
        <h3
          className="fw-bolder text-light p-3 w-50 rounded-3 my-3"
          style={{ background: "#1F2A44" }}
        >
          Update Profile
        </h3>
          <div
            className=" h-auto p-3  rounded-3 bg-light  w-50 "
            style={{ border: "black 1px solid" }}
          >
          {Object.values(Error).map((e)=>{
            return(
                <div>
            {ErrorHandel(e)}

                </div>
            )
          })}
            <div className="fw-bolder  p-1 rounded-2  ">
              <label className="w-100 fs-5 text-primary" style={{textAlign:"start"}}>Name</label>
              <input type="text"  className="form-control fs-4" value={Name} onChange={(e)=>SetName(e.target.value)} />
              
            </div>
            <div className="fw-bolder  p-1 rounded-2">
              <label className="w-100 fs-5 text-primary" style={{textAlign:"start"}}>Email</label>
              <input type="text" className="form-control fs-4" value={Email} onChange={(e)=>SetEmail(e.target.value)} />
            </div>
            <button className="btn btn-primary my-2" onClick={()=>handel()}>Update</button>
          </div>
      </div>
    </div>
  );
}