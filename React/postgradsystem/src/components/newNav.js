// import React from "react";
// import "../css/Navbar.css";
// import { StudentData } from "../data/StudentData";
// import "../css/newNav.css";

// function NewNav(props) {
//   return (
//     <div className="sideBar">
//       <ul className="sidebarList">
//         <span>
//           <div>
//             <br></br>
//           </div>
//         </span>
//         <span id="header">Student Profile </span>
//         <span>
//           <div>
//             <br></br>
//             <br></br>
//           </div>
//         </span>
//         {StudentData.map((item, index) => {
//           return (
//             <li
//               key={index}
//               className="row"
//               onClick={() => {
//                 window.location.pathname = `/studenttheses/1002`;
//               }}
//             >
//               <div id="icon">{item.icon}</div>
//               <div id="title">{item.title}</div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }

// export default NewNav;
