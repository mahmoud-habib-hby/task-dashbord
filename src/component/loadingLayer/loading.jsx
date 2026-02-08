import loading from "@/assets/loading.png"
export default function Loading(){
    return(
        <div className="bg-secondary bg-opacity-75 position-fixed top-0 d-flex align-items-center justify-content-center" style={{ zIndex:"3", width:"80vw",height:"100vh"}}>
            <img src={loading} alt=""  className="wait"/>
        </div>
    );
}