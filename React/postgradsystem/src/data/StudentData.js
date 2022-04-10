import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi"


export const StudentData=[
    {
        title:"Theses",
        path:"/studenttheses/",
        icon: <IoIcons.IoIosPaper/>,
        cName:"nav-text"
    },
    {
        title:"Courses",
        path:"/studentcourses",
        icon:<GiIcons.GiBookshelf/>,
        cName:"nav-text"
    },
    {
        title:"Reports",
        path:"/studentreports",
        icon:<HiIcons.HiDocumentReport/>,
        cName:"nav-text"
    },
    {
        title:"Publications",
        path:"/studentpublications",
        icon:<FaIcons.FaAddressBook/>,
        cName:"nav-text"
    },
    {
        title:"My Profile",
        path:"/editProfile",
        icon:<MdIcons.MdOutlineManageAccounts/>,
        cName:"nav-text"
    }
    
]