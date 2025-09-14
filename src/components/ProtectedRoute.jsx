import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!currentUser) {
            alert("You must be logged in to access the cart.");
            navigate('/login');
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        // Optionally show a loading or null while redirecting
        return null;
    }

    return children;
}
