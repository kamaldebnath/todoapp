import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    function handleLogin(e) {
        e.preventDefault();
        axios.post("https://todoapp-r6wz.onrender.com/login", {
            "email": email,
            "password": password
        }).then((response) => {
            if (response.data === "user-not-found") {
                window.alert("User Doesn't Exist!")
            }
            if (response.data === "incorrect-password") {
                window.alert("Incorrect Password!")
            }
            if (response.data.status === "success") {
                localStorage.setItem("jwt", response.data.token);
                navigate('/')
                SetPassword("");
                SetEmail("");

            }
        })
    }

    return (
        <>
            <Navbar/>
            <div className={"flex justify-center items-center h-[80vh]"}>
                <form onSubmit={handleLogin} method={"post"}
                      className={"flex flex-col bg-black justify-center items-center h-[40vh] w-[30vh] space-y-4"}>
                    <div>
                        <input value={email} onChange={(e) => SetEmail(e.target.value)}
                               className={"p-2 outline-none"} type={"email"} placeholder={"Enter Email"}/>
                    </div>
                    <div>
                        <input value={password} onChange={(e) => SetPassword(e.target.value)}
                               className={"p-2 outline-none"} type={"password"} placeholder={"Enter password"}/>
                    </div>
                    <div>
                        <button className={"bg-white p-2 transition duration-300 hover:scale-110"}>Login</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;