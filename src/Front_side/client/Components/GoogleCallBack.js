import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

function GoogleCallback() {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/auth/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setLoading(false);
                setData(data);
            });

    }, []);

    if (loading) {
        return <DisplayLoading />
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}


export default GoogleCallback;