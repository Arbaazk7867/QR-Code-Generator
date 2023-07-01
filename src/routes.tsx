import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  // MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  // MdOutlineShoppingCart,
} from "react-icons/md";
import {BsUpcScan,BsClockHistory} from 'react-icons/bs'

// Admin Imports
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
// import Register from "./components/register/UserRegister"
// import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn/login";
// import AllUsers from "views/admin/dataTables/components/AllUsersTable";
import UserData from "views/admin/dataTables/UserData";
// import { NavLink, useHistory } from "react-router-dom";
// const handleSignOut = () =>{
//   localStorage.removeItem("token")
// }

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "QR Generator",
    layout: "/admin",
    path: "/allusers",
    // path: "/userregister",
    icon: (
      <Icon
        as={BsUpcScan}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    // component: Register,
    component:UserData,
    secondary: true,
  },
  {
    name: "QR History",
    layout: "/admin",
    icon: <Icon as={BsClockHistory} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
//   {
//     name: "My DropDown",
//     layout: "/admin",
//     icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
//     path: "/custom-drop-down-table",
//     component: DataTables,
//   },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign Out",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    // onClick: handleSignOut
  },
//   {
//     name: "RTL Admin",
//     layout: "/rtl",
//     path: "/rtl-default",
//     icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
//     component: RTL,
//   },
];

export default routes;
