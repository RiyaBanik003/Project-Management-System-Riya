import { Routes, Route } from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Landing from "./components/Landing/Landing";
import CreateProject from "./features/project/pages/CreateProject";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import User from "./pages/User";
import Deployment from "./pages/Deployment";
import Service from "./pages/Service";
import { useEffect } from "react";
// import { useUserStore } from '../../../store/userStore.js'
import { useUserStore } from "./store/userStore";

function App() {
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser(); 
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/editor" element={<CreateProject />} />

           {/* Dashboard Layout */}
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />

        <Route
          path="/project"
          element={
              <Project />
          }
        />

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
    </Routes>
  );
}

export default App;
