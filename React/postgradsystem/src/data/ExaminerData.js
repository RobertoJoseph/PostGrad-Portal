import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as AiIcons from 'react-icons/ai';



export const ExaminerData=[
    {
        title:"Theses",
        path:"/examinertheses",
        icon: <IoIcons.IoIosPaper/>,
        cName:"nav-text"
    },
    {
        title:"Defenses",
        path:"/examinerdefenses",
        icon:<BsIcons.BsShieldShaded/>,
        cName:"nav-text"
    },
    {
        title:"Search",
        path:"/examinersearch",
        icon:<AiIcons.AiOutlineSearch/>,
        cName:"nav-text"
    },
  
    
]