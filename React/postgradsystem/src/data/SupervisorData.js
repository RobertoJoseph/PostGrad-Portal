import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";


export const SupervisorData=[
    {
        title:"Students",
        path:"/supervisorstudents",
        icon: <FaIcons.FaUserGraduate/>,
        cName:"nav-text"
    },
    {
        title:"Theses",
        path:"/supervisortheses",
        icon:<BsIcons.BsBook/>,
        cName:"nav-text"
    },
    {
        title:"Reports",
        path:"/supervisorreports",
        icon:<MdIcons.MdAssignmentLate/>,
        cName:"nav-text"
    },
    
]