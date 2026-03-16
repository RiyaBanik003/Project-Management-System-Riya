// import { COLORS } from "../../constants/dashboardData";
import { COLORS } from "../constants/dashboardData";
// import { Avatar, Icon } from "../ui/DashboardPrimitives";
import { Avatar, Icon } from "../components/ui/DashboardPrimitives";

/**
 * TopBar
 * Props:
 *   greeting   {string}  – e.g. "Good morning, Soham 👋"
 *   dateLabel  {string}  – e.g. "Monday, March 16 — Week 11"
 *   user       { initials, bg, color }
 *   onNewTask  {() => void}
 *   onFilter   {() => void}
 *   onExport   {() => void}
 */
export default function TopBar({ greeting, dateLabel, user, onNewTask, onFilter, onExport }) {
  const btnBase = {
    padding: "6px 14px",
    fontSize: 12,
    borderRadius: 7,
    cursor: "pointer",
    fontFamily: "inherit",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "0.5px solid #e2dfd8",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#1a1917" }}>
          {greeting ?? "Good morning 👋"}
        </div>
        <div style={{ fontSize: 12, color: "#a8a59e", marginTop: 2 }}>
          {dateLabel ?? ""}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={onFilter}
          style={{ ...btnBase, border: "0.5px solid #c8c5be", background: "transparent", color: "#3d3c39" }}
        >
          Filter
        </button>
        <button
          onClick={onExport}
          style={{ ...btnBase, border: "0.5px solid #c8c5be", background: "transparent", color: "#3d3c39" }}
        >
          Export
        </button>
        <button
          onClick={onNewTask}
          style={{
            ...btnBase,
            border: "none",
            background: COLORS.teal,
            color: "#fff",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Icon type="plus" size={12} />
          New Task
        </button>
        <Avatar
          initials={user?.initials ?? "SK"}
          bg={user?.bg ?? "#9FE1CB"}
          color={user?.color ?? "#085041"}
          size={28}
        />
      </div>
    </div>
  );
}