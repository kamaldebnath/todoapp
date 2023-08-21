import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Showtask from './Showtask';
function Addtask() {
    const [taskname, SetTaskName] = useState('');
    const [allData, SetAllData] = useState('');

    function SubmitTask(e) {
        e.preventDefault();
        axios.post('https://todoapp-r6wz.onrender.com/addtask', {
            "token": localStorage.getItem("jwt"),
            "task": taskname
        }).then((response) => { console.log(response) });
        SetTaskName("");
    }

    async function getData() {
        const res = await axios.post('https://todoapp-r6wz.onrender.com/gettask', { "email": localStorage.getItem("email") });
        SetAllData(res.data);
    }

    useEffect(() => {
        getData();
    });

    return (


        <div className="grid grid-cols-1 xl:grid-cols-2">

            <div className="h-96 w-full flex justify-center items-center">

                <form method="post" className="flex space-y-8" onSubmit={SubmitTask}>

                    <div className="flex border border-black">
                        <input value={taskname} onChange={(e) => SetTaskName(e.target.value)} className="p-2 outline-none transition duration-500 focus:-translate-x-5" type="text" placeholder="Enter task title"></input>
                        <button className="bg-green-500 p-2 transition duration-500 hover:scale-110" type="submit"><AddIcon /></button>
                    </div>

                </form>

            </div>

            <div className="h-96 flex justify-center items-center">


                <div className='h-80 mx-2 p-2 overflow-auto overflow-x-hidden space-y-2'>
                    {
                        allData && allData?.map((data) => (
                            <Showtask
                                id={data._id}
                                taskname={data.task}
                            />
                        ))
                    }
                </div>



            </div>
        </div>
    );
}

export default Addtask;