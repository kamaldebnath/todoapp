import axios from 'axios';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

function Showtask({id,taskname}) {

    function deleteTask(){
        axios.delete(`https://todoapp-r6wz.onrender.com/removetask/${localStorage.getItem("jwt")}/${id}`);
    }

    return (
        <div className='w-[50vh] flex bg-black text-white px-9 py-5 cursor-pointer justify-between transition duration-300 hover:scale-110'>
            <p>{taskname}</p>
            <button onClick={deleteTask}><DeleteIcon/></button>
        </div>
    );
}

export default Showtask;