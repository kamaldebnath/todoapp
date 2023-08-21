import React, {useState} from 'react';
import axios, {post} from "axios";
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

const Register = () => {
    const [email, SetEmail] = useState("");
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const navigate=useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        axios.post('https://todoapp-r6wz.onrender.com/register',{
            "email":email,
            "username":username,
            "password":password
        }).then((response)=>{
            if (response.data==="email-exists"){
                window.alert("Email Already Exists")
            }
            if (response.data==="username-exists"){
                window.alert("Username Already Taken");
            }
            if (response.data==="success"){
                navigate('/login');


            }
        })
        SetPassword("");
        SetEmail("");
        SetUsername("");
    }

    return (
        <>
            <Navbar/>
        <div className={"flex justify-center items-center h-[80vh]"}>
            <form method={"post"} onSubmit={handleSubmit}
                  className={"flex flex-col bg-black  justify-center items-center h-[40vh] w-[30vh] space-y-4"}>
                <div>
                    <input value={email} onChange={(e) => SetEmail(e.target.value)}
                           className={"p-2 outline-none"} type={"email"} placeholder={"Enter Email"}/>
                </div>
                <div>
                    <input value={username} onChange={(e) => SetUsername(e.target.value)}
                           className={"p-2 outline-none"} type={"text"} placeholder={"Enter username"}/>
                </div>
                <div>
                    <input value={password} onChange={(e) => SetPassword(e.target.value)}
                           className={"p-2 outline-none"} type={"password"} placeholder={"Enter password"}/>
                </div>
                <div>
                    <button className={"bg-white p-2 transition duration-300 hover:scale-110"}>Register</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default Register;