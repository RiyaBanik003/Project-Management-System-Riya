export const COLORS = {
  teal: "#1D9E75",
  tealLight: "#E1F5EE",
  tealDark: "#0F6E56",
  blue: "#378ADD",
  blueLight: "#E6F1FB",
  coral: "#D85A30",
  coralLight: "#FAECE7",
  amber: "#BA7517",
  amberLight: "#FAEEDA",
  pink: "#D4537E",
  pinkLight: "#FBEAF0",
  green: "#3B6D11",
  greenLight: "#EAF3DE",
  red: "#E24B4A",
  gray: "#888780",
  grayLight: "#F1EFE8",
};

export const projects = [
  { id: 1, name: "Website Redesign", color: COLORS.blue, progress: 72 },
  { id: 2, name: "Mobile App v2", color: COLORS.teal, progress: 45 },
  { id: 3, name: "API Integration", color: COLORS.coral, progress: 88 },
  { id: 4, name: "Q2 Marketing", color: COLORS.amber, progress: 31 },
];

export const initialTasks = [
  { id: 1, text: "Finalize homepage wireframes", tag: "Design", tagColor: COLORS.blue, tagBg: COLORS.blueLight, due: "Mar 14", done: true },
  { id: 2, text: "Set up CI/CD pipeline", tag: "Dev", tagColor: COLORS.green, tagBg: COLORS.greenLight, due: "Mar 15", done: true },
  { id: 3, text: "Implement auth module", tag: "Urgent", tagColor: COLORS.coral, tagBg: COLORS.coralLight, due: "Mar 17", done: false },
  { id: 4, text: "Review API documentation", tag: "Review", tagColor: COLORS.amber, tagBg: COLORS.amberLight, due: "Mar 18", done: false },
  { id: 5, text: "Write unit tests for payment flow", tag: "Dev", tagColor: COLORS.green, tagBg: COLORS.greenLight, due: "Mar 20", done: false },
  { id: 6, text: "Stakeholder presentation deck", tag: "Design", tagColor: COLORS.blue, tagBg: COLORS.blueLight, due: "Mar 21", done: false },
  { id: 7, text: "User testing session — round 2", tag: "Review", tagColor: COLORS.amber, tagBg: COLORS.amberLight, due: "Mar 24", done: false },
];

export const teamMembers = [
  { initials: "AR", name: "Anika Roy", role: "Frontend Dev", tasks: 8, load: 78, loadColor: COLORS.blue, bg: COLORS.blueLight, color: "#185FA5", status: "online" },
  { initials: "MJ", name: "Marcus J.", role: "Backend Dev", tasks: 11, load: 92, loadColor: COLORS.red, bg: COLORS.greenLight, color: COLORS.green, status: "online" },
  { initials: "PS", name: "Priya S.", role: "Designer", tasks: 6, load: 55, loadColor: COLORS.teal, bg: COLORS.amberLight, color: COLORS.amber, status: "away" },
  { initials: "TL", name: "Tom L.", role: "QA Engineer", tasks: 5, load: 40, loadColor: COLORS.teal, bg: COLORS.pinkLight, color: COLORS.pink, status: "offline" },
];

export const activityFeed = [
  { initials: "AR", bg: COLORS.blueLight, color: "#185FA5", parts: ["Anika", " completed ", "Hero section mockup", " in Website Redesign"], time: "2 min ago" },
  { initials: "MJ", bg: COLORS.greenLight, color: COLORS.green, parts: ["Marcus", " opened a PR for ", "auth middleware"], time: "28 min ago" },
  { initials: "TL", bg: COLORS.pinkLight, color: COLORS.pink, parts: ["Tom", " flagged ", "checkout bug", " as high priority"], time: "1 hr ago" },
  { initials: "PS", bg: COLORS.amberLight, color: COLORS.amber, parts: ["Priya", " uploaded new assets to ", "Q2 Marketing"], time: "3 hr ago" },
  { initials: "SK", bg: "#9FE1CB", color: "#085041", parts: ["You", " created sprint ", "Sprint 15", " with 14 tasks"], time: "Yesterday" },
];

export const sprintData = [
  { label: "Sp9", planned: 55, done: 62 },
  { label: "Sp10", planned: 70, done: 58 },
  { label: "Sp11", planned: 80, done: 90 },
  { label: "Sp12", planned: 65, done: 72 },
  { label: "Sp13", planned: 90, done: 84 },
  { label: "Sp14", planned: 75, done: 100 },
];

export const navItems = [
  { icon: "home", label: "Overview" },
  { icon: "calendar", label: "Timeline" },
  { icon: "check", label: "My Tasks" },
  { icon: "users", label: "Team" },
  { icon: "chart", label: "Analytics" },
];

export const metrics = [
  { label: "Total tasks", value: "148", badge: "up", badgeText: "+12", subText: "this week" },
  { label: "Completed", value: "93", badge: "up", badgeText: "63%", subText: "completion rate" },
  { label: "Overdue", value: "7", badge: "down", badgeText: "+3", subText: "since last week" },
  { label: "Team velocity", value: "84%", badge: "up", badgeText: "+5%", subText: "vs last sprint" },
];