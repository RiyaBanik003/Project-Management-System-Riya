import { useState } from "react";
import SideNavbar from "../components/SideNavbar/SideNavbar";
import TopBar from "./TopBar";
import MetricsRow from "./MetricsRow";
import ProjectProgress from "./ProjectProgress";
import SprintVelocityChart from "./SprintVelocityChart";
import TeamWorkload from "./TeamWorkload";
import ActivityFeed from "./ActivityFeed";

const CURRENT_USER = {
  initials: "SK",
  name: "Soham K.",
  role: "Admin",
  bg: "#9FE1CB",
  color: "#085041",
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");

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
      {/* ── Sidebar ── */}
      <SideNavbar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        user={CURRENT_USER}
      />

      {/* ── Main area ── */}
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar
          greeting="Good morning, Soham 👋"
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