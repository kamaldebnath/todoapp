import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {

    const [user, SetUser] = useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        axios.post("https://todoapp-r6wz.onrender.com/auth", {
            "token": localStorage.getItem("jwt")
        }).then((e) => {
            SetUser(e.data.auth);
        });
    })

    return (
        <div>
            <nav className={"flex justify-around items-center h-[10vh] bg-black"}>
                <Link className={"text-xl transition duration-500 hover:scale-105 text-white"} to="/">LOGO</Link>
                {
                    !user ?

                        <ul className={"flex space-x-5"}>
                            <li className={"bg-white px-3 py-1  transition duration-500 hover:scale-105"}><a
                                href="/register">Register</a></li>
                            <li className={"bg-white px-3 py-1  transition duration-500 hover:scale-105"}><a href="/login">Login</a>
                            </li>
                        </ul>
                        :
                        <ul>
                            <button className={"bg-white px-3 py-1 "} onClick={()=> {
                                localStorage.removeItem("jwt");
                                navigate('/login')
                            }}>Logout</button>
                        </ul>
                }
            </nav>
        </div>
    );
};

export default Navbar;