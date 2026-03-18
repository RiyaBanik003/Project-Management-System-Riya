import { useState } from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import TopBar from "./TopBar";
import MetricsRow from "./MetricsRow";
import ProjectProgress from "./ProjectProgress";
import SprintVelocityChart from "./SprintVelocityChart";
import TeamWorkload from "./TeamWorkload";
import ActivityFeed from "./ActivityFeed";
import TaskList from "./TaskList";
import { useUserStore } from "../store/userStore";
// const storedUser = JSON.parse(localStorage.getItem("user"));
// const CURRENT_USER = {
//   initials: storedUser?.name
//     ? storedUser.name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//     : "U",
//   name: storedUser?.name || "User",
//   role: "Admin", // or get from backend later
//   bg: "#9FE1CB",
//   color: "#085041",
// };
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

  const user = useUserStore((state) => state.user);

  const CURRENT_USER = {
    initials: user?.name
      ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      : "U",
    name: user?.name || "User",
    role: "Admin",
    bg: "#9FE1CB",
    color: "#085041",
  };
  console.log("Zustand user:", user);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        minHeight: "100vh",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "#f0ede5",
      }}
    >
      
      <SideNavbar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        user={CURRENT_USER}
      />

      {/* ── Main area ── */}
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar
          greeting={`${getGreeting()}, ${CURRENT_USER.name} 👋`}
          dateLabel="Monday, March 16 — Week 11"
          user={CURRENT_USER}
          onNewTask={() => console.log("new task")}
          onFilter={() => console.log("filter")}
          onExport={() => console.log("export")}
        />

        <div
          style={{
            padding: 24,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {/* Row 1 — KPI metrics */}
          <MetricsRow />

          {/* Row 2 — Tasks + Progress & Chart */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
            <TaskList />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <ProjectProgress />
              <SprintVelocityChart />
            </div>
          </div>

          {/* Row 3 — Team + Activity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <TeamWorkload />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}