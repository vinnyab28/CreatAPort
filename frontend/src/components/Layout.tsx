import { Outlet } from "react-router";
import Sidebar from "./Sidebar";



const Layout = () => {
  return <div className="w-full h-full grid grid-cols-5">
    <Sidebar></Sidebar>
    <div className="container overflow-auto px-5 col-span-4">
      <Outlet />
    </div>
  </div>
}

export default Layout;