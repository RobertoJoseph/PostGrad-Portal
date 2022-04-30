import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as MdIcons from "react-icons/md";


export const AdminData=[
    {
        title:"Supervisors",
        icon: <FaIcons.FaUsers/>,
        cName:"nav-text"
    },
    {
        title:"Students",
        icon:<FaIcons.FaUserGraduate/>,
        cName:"nav-text"
    },
    {
        title:"Theses",
        icon:<IoIcons.IoIosPaper/>,
        cName:"nav-text"
    },
    {
        title:"Courses",
        icon:<GiIcons.GiBookshelf/>,
        cName:"nav-text"
    },
    {
        title:"Defenses",
        icon:<RiIcons.RiFileList3Fill/>,
        cName:"nav-text"
    },
    {
        title:"Payments",
        icon:<MdIcons.MdPayments/>,
        cName:"nav-text"
    }
    
]