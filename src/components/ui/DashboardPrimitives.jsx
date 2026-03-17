// import { COLORS } from "../constants/dashboardData";
import { COLORS } from "../../constants/dashboardData";

// ── Icon ────────────────────────────────────────────────────────────────────
export function Icon({ type, size = 14, style = {} }) {
  const s = { width: size, height: size, flexShrink: 0, ...style };
  const map = {
    home: (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    calendar: (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    check: (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    users: (
      <svg style={s} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    chart: (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    plus: (
      <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    logo: (
      <svg style={s} viewBox="0 0 24 24" fill="white">
        <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm7 4l-5 5 2 2 3-3 5 5 2-2z" />
      </svg>
    ),
  };
  return map[type] || null;
}

// ── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initials, bg, color, size = 30 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        color,
        fontSize: size * 0.36,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── StatusDot ────────────────────────────────────────────────────────────────
export function StatusDot({ status }) {
  const colors = {
    online: COLORS.teal,
    away: COLORS.amber,
    offline: "#c0bdb5",
  };
  return (
    <div
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: colors[status] || colors.offline,
        flexShrink: 0,
      }}
    />
  );
}

// ── ProgressBar ──────────────────────────────────────────────────────────────
export function ProgressBar({ value, color, height = 5 }) {
  return (
    <div
      style={{
        height,
        background: "#e8e6e0",
        borderRadius: 3,
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${value}%`,
          background: color,
          borderRadius: 3,
          transition: "width 0.6s ease",
        }}
      />
    </div>
  );
}

// ── MetricCard ───────────────────────────────────────────────────────────────
export function MetricCard({ label, value, badge, badgeText, subText }) {
  return (
    <div style={{ background: "#f5f3ed", borderRadius: 8, padding: "16px 18px" }}>
      <div style={{ fontSize: 12, color: "#888780", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 600, color: "#1a1917", lineHeight: 1, marginBottom: 6 }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: "#a8a59e", display: "flex", alignItems: "center", gap: 5 }}>
        <span
          style={{
            background: badge === "up" ? COLORS.tealLight : COLORS.coralLight,
            color: badge === "up" ? COLORS.tealDark : "#993C1D",
            padding: "1px 6px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 500,
          }}
        >
          {badgeText}
        </span>
        {subText}
      </div>
    </div>
  );
}