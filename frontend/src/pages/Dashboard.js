import React, {useEffect, useState} from 'react';
import axios from "axios";
import Navbar from "./Navbar";
import HandleTask from "./HandleTask";
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const [user, SetUser] = useState();
    const navigate = useNavigate();

    function authuser() {
        axios.post("http://todoapp-r6wz.onrender.com/auth", {
            "token": localStorage.getItem("jwt")
        }).then((e) => {
            SetUser(e.data.auth);
            localStorage.setItem("email", e.data.data.email)
            localStorage.setItem("username", e.data.data.username)
        })
    }

    useEffect(() => {
        authuser();
    })


    return (
        <div className={"h-screen"}>
            <Navbar/>
            {
                user ?
                    <div>
                       <div>
                            <div>
                                <HandleTask/>
                            </div>
                        </div>
                    </div>
                    :
                    <div className={"h-[50vh] flex justify-center items-center"}>
                        <p>You are not logged in</p>
                    </div>
            }
        </div>
    );
};

export default Dashboard;