import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/SideNavbar/MainLayout";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Landing from "./components/Landing/Landing";
import CreateProject from "./features/project/pages/CreateProject";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import User from "./pages/User";
import Deployment from "./pages/Deployment";
import Service from "./pages/Service";

function App() {
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
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/project"
          element={
            <MainLayout>
              <Project />
            </MainLayout>
          }
        />

        <Route
          path="/user"
          element={
            <MainLayout>
              <User />
            </MainLayout>
          }
        />

        <Route
          path="/deployment"
          element={
            <MainLayout>
              <Deployment />
            </MainLayout>
          }
        />

        <Route
          path="/service"
          element={
            <MainLayout>
              <Service />
            </MainLayout>
          }
        />
    </Routes>
  );
}

export default App;
