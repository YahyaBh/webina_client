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

    function fetchUserData() {
        fetch(`http://localhost:8000/api/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.access_token,
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    }

    if (loading) {
        return <DisplayLoading />
    } else {
        if (user != null) {
            return <DisplayData data={user} />
        } else {
            return (
                <div>
                    <DisplayData data={data} />
                    <div style={{ marginTop: 10 }}>
                        <button onClick={fetchUserData}>Fetch User</button>
                    </div>
                </div>
            );
        }
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}

function DisplayData(data) {
    return (
        <div>
            Welcome {data.first_name} {data.last_name}
        </div>
    );
}

export default GoogleCallback;