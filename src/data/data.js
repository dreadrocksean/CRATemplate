// const transition = { transition: 'opacity .25s ease' };
export const animationStyles = {
  enterLeft: {
    enter: { opacity: 1, transform: "translateX(0%)" },
    from: { opacity: 0, transform: "translateX(-100%)" },
    leave: { opacity: 0 }
  },
  enterRight: {
    enter: { opacity: 1, transform: "translateX(0%)" },
    from: { opacity: 0, transform: "translateX(100%)" }
  },
  enterTop: {
    enter: { opacity: 1, transform: "translateY(0%)" },
    from: { opacity: 0, transform: "translateY(-100%)" }
  },
  enterBottom: {
    enter: { opacity: 1, transform: "translateY(0%)" },
    from: { opacity: 0, transform: "translateY(100%)" }
  },
  leaveFade: {
    leave: { opacity: 0 }
  },
  leaveTop: {
    leave: { opacity: 0, transform: "translateY(-100%)" }
  },
  leaveRight: {
    leave: { opacity: 0, transform: "translateX(100%)" }
  }
};

export const dashboardSections = [
  {
    name: "Equipment",
    apps: [
      { name: "Transfer", route: "/assign" },
      { name: "Batch", route: "/assign/batch" },
      { name: "Move", route: "" },
      { name: "Swap", route: "" },
      { name: "Returns", route: "" },
      { name: "History", route: "" }
    ]
  },
  {
    name: "Inventory",
    apps: [{ name: "List", route: "" }, { name: "Scan", route: "" }]
  },
  {
    name: "Search",
    apps: [
      { name: "One-Step Install Search", route: "" },
      { name: "PSR Search", route: "" }
    ]
  },
  {
    name: "Utilities",
    apps: [
      { name: "DHCT Tools", route: "" },
      { name: "Location Management", route: "" },
      { name: "Mac Address Import", route: "" }
    ]
  }
];
