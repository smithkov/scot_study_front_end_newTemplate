import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/agent_dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },

  {
    _tag: "CSidebarNavItem",
    name: "Create a user",
    to: "/agent_applicant",
    icon: "cil-grid",
  },
  {
    _tag: "CSidebarNavItem",
    name: "User list",
    to: "/agent_users",
    icon: "cil-grid",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Submitted Applications",
    to: "/agent_submitted_Applications",
    icon: "cil-grid",
  },
];

export default _nav;
