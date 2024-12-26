import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid } from "./auth";

export default function useTokenValidation() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!isTokenValid(token)) {
            localStorage.removeItem('token'); // Remove invalid token
            navigate('/login'); // Redirect to login
        }
    }, [navigate]);
}