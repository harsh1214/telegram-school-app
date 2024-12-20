import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
// import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";

export default function App() {

    // const [isAuth, setAuth] = useState(!!localStorage.getItem('token'));

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route element={
                        <ProtectedRoutes>
                            <Outlet />            
                        </ProtectedRoutes>
                    }>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}