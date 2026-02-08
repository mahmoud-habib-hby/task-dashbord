import "./App.css";
import Provider from "./component/context/provider";
import { Login } from "./page/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Register } from "./page/Register";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import { Home } from "./component/home/Home";
import AddTask from "./component/tasks/AddTask";
import AddList from "./component/lists/AddList";
import { Lists } from "./component/lists/AllList";
import { Tasks } from "./component/tasks/AllTasks";
import { Task } from "./component/tasks/ShowTask";
import UpdateList from "./component/lists/UpdateList";
import Profile from "./component/profile/profile";
import UpdateProfile from "./component/profile/UpdateProfile";
import UpdateTask from "./component/tasks/UpdateTask";

function App() {
  return (
      <Provider>
    <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<Dashboard />} path="/dashbord">
        <Route element={<Home />} path="home" />
        <Route element={<AddTask />} path="AddTask" />
        <Route element={<AddList />} path="AddList" />
        <Route element={<Lists />} path="lists" />
        <Route element={<Tasks />} path="tasks" />
        <Route element={<Task />} path="task/:id" />
        <Route element={<UpdateList />} path="UpdateList/:id" />
        <Route element={<UpdateTask />} path="UpdateTask/:id" />
        <Route element={<Profile />} path="profile" />
        <Route element={<UpdateProfile />} path="UpdateProfile" />
        </Route>
    </Routes>
    </Provider>
  );
}

export default App;
