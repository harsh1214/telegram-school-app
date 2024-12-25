import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function NavLayout() {
  return (
    <div className="w-full relative z-[1]">
        <Navbar />
        <div className="relative z-[1]">
            <Outlet />
        </div>
    </div>
  )
}
