import { COLORS, navItems, projects } from "../../constants/dashboardData";
import { Avatar, Icon } from "../ui/DashboardPrimitives";

/**
 * SideNavbar
 * Props:
 *   activeNav  {string}           – currently highlighted nav label
 *   onNavChange {(label) => void} – called when user clicks a nav item
 *   user        { initials, name, role } – logged-in user info
 */
export default function SideNavbar({ activeNav, onNavChange, user }) {
  return (
    <nav
      style={{
        background: "#fff",
        borderRight: "0.5px solid #e2dfd8",
        padding: "20px 0",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "0 20px 18px",
          borderBottom: "0.5px solid #e2dfd8",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            background: COLORS.teal,
            borderRadius: 7,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon type="logo" size={14} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1a1917" }}>Nexus PM</span>
      </div>

      {/* Nav items */}
      {navItems.map(({ icon, label }) => {
        const isActive = activeNav === label;
        return (
          <div
            key={label}
            onClick={() => onNavChange?.(label)}
            style={{
              padding: "8px 20px",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: isActive ? COLORS.tealDark : "#6b6965",
              background: isActive ? COLORS.tealLight : "transparent",
              borderRight: isActive ? `2px solid ${COLORS.teal}` : "2px solid transparent",
              fontWeight: isActive ? 500 : 400,
              transition: "all 0.15s",
            }}
          >
            <Icon type={icon} />
            {label}
          </div>
        );
      })}

      {/* Projects section */}
      <div
        style={{
          padding: "16px 20px 6px",
          fontSize: 11,
          fontWeight: 600,
          color: "#b0ada6",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginTop: 8,
        }}
      >
        Projects
      </div>

      {projects.map((p) => (
        <div
          key={p.id}
          style={{
            padding: "7px 20px",
            fontSize: 13,
            color: "#6b6965",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 9,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f3ed")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <div
            style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }}
          />
          {p.name}
        </div>
      ))}

      {/* User profile at bottom */}
      <div
        style={{
          marginTop: "auto",
          padding: "14px 20px 0",
          borderTop: "0.5px solid #e2dfd8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
          <Avatar initials={user?.initials ?? "SK"} bg="#9FE1CB" color="#085041" size={30} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#1a1917" }}>
              {user?.name ?? "Soham K."}
            </div>
            <div style={{ fontSize: 11, color: "#a8a59e" }}>{user?.role ?? "Admin"}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}