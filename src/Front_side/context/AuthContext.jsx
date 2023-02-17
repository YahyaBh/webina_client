import { createContext, useContext, useState } from "react";
import AuthUser from "../AuthUser";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const { http, csrf } = AuthUser();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();


    const [user, setUser] = useState(null);
    const [googleUrl, setGoogleUrl] = useState(null);


    csrf();

    const getUser = async () => {
        const { data } = await http.get("/api/user");
        setUser(data);
    };

    const login = async (...data) => {

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        await csrf();

        await http.post('/login', data)
            .then(res => {
                if (res.data.admin) {
                    navigate("/admin/dashboard");
                    getUser();
                    // setEmailInput('');
                    // setPasswordInput('');
                    Toast.fire({
                        icon: 'success',
                        title: 'Welcome Back Admin!'
                    })
                } else {
                    navigate("/");
                    getUser();
                    // setEmailInput('');
                    // setPasswordInput('');
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }
                console.log(res.data)
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,
                })
                // setPasswordInput('');
            })
    };



    const googleLogin = async () => {
        http('/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setGoogleUrl(response.data.url);
                    console.log(response.data.url);
                    getUser();
                } else {
                    new Error('Something went wrong!')
                }
            })
            .catch((error) => console.error(error));
    }


    return <AuthContext.Provider value={{ user, login, googleLogin, googleUrl }} >
        {children}
    </AuthContext.Provider>

}

export default function useAuthContext() {
    return useContext(AuthContext);
}