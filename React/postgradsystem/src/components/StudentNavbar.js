import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { StudentData } from "../data/StudentData";
import "../css/Navbar.css";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";


function StudentNavbar(props) {
  const [sidebar, setSidebar] = useState(true);
  let { studentID } = useParams();
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <span className="nav-text ss">Student Profile</span>
            {StudentData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  {item.title === "Theses" ? (
                    <Link to={`/studenttheses/${studentID}`}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default StudentNavbar;
