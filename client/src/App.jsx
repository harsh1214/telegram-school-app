import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
// import { useState } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import Test from "./pages/Test";
import NavLayout from "./components/NavLayout";

export default function App() {

    // const [isAuth, setAuth] = useState(!!localStorage.getItem('token'));

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route element={
                        <ProtectedRoutes>
                            <Outlet />
                        </ProtectedRoutes>
                    }>
                    <Route element={
                            <NavLayout>
                                <Outlet />
                            </NavLayout>
                        }>
                        <Route path="/test/:subject" element={<Test />} />
                        <Route path="/" element={<Home />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}