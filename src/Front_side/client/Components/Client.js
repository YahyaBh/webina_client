import { Fragment } from "react";



import Navbar from "./Navbar";





function App() {

    const auth = {
        token: localStorage.getItem('token'),
        setToken: (token) => {
            localStorage.setItem('token', token);
        },
    };

    return (
        <Fragment>
            <Navbar />

            
        </Fragment>);
}

export default App;