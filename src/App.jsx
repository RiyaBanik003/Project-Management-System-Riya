import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Landing from "./components/Landing/Landing";
import CreateProject from "./features/project/pages/CreateProject";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import Deployment from "./pages/Deployment";
import Service from "./pages/Service";
import { useEffect } from "react";
// import { useUserStore } from '../../../store/userStore.js'
import { useUserStore } from "./store/userStore";
import ViewProject from "./pages/ViewProject";
import Projects from "./features/project/pages/projectList";
import RoleList from "./features/role/pages/RoleList";
import CreateRole from "./features/role/pages/CreateRole";

import CreateThread from './features/thread/pages/CreateThread';
import Threads from "./pages/Threads";

function App() {
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/role" element={<RoleList/>}/>
      <Route path="/roles/create" element={<CreateRole />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/editor" element={<CreateProject />} /> */}

      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <Dashboard />
        }
      />

      {/* <Route
        path="/project"
        element={
          <Project />
        }
      /> */}

      <Route
        path="/user"
        element={
          <User />
        }
      />

      <Route
        path="/deployment"
        element={
          <Deployment />
        }
      />

      <Route
        path="/service"
        element={
          <Service />
        }
      />
      <Route path="/editor" element={<CreateProject />} />
      <Route path="/view-project" element={<Projects/>} />
       <Route path="/project/view" element={<Projects/>} />
       <Route path="/project/:id" element={<ViewProject />} />
       <Route path="/project/:projectId/create-thread" element={<CreateThread />} />
       <Route path="/threads" element={<Threads />} />
<Route path="/projects/:projectId/threads" element={<Threads />} />
    </Routes>
  );
}

export default App;
