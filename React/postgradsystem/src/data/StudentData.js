import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";


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
        icon:<BsIcons.BsBook/>,
        cName:"nav-text"
    },
    {
        title:"Reports",
        path:"/studentreports",
        icon:<MdIcons.MdAssignmentLate/>,
        cName:"nav-text"
    },
    {
        title:"Publications",
        path:"/studentpublications",
        icon:<FaIcons.FaAddressBook/>,
        cName:"nav-text"
    }
    
]