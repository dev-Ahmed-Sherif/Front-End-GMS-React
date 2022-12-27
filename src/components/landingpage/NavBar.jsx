// import "./style.css";
// import logo from "../../images/gym logo 4.png";
// import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUser,
//   faShoppingBasket,
//   faShoppingCart,
//   faShop,
// } from "@fortawesome/free-solid-svg-icons";

// function NavBar(props) {
//   ///////////////////login slide function/////////////////
//   function loginform() {
//     props.loginFlag((pre) => !pre);
//   }

//   return (
//     <>
//       <nav className="navbar">
//         <div className="logo">
//           <img src={logo} alt="logo pic" className="logoRest" />
//           <h1 id="logo">
//             GMS
//             <span id="logoDecoration" style={{ color: "var(--prime)" }}>
//               .
//             </span>
//           </h1>
//         </div>
//         <ul>
//           <li>
//             <a>Home</a>
//           </li>
//           <li>
//             <a>About</a>
//           </li>
//           <li>
//             <a>Diet</a>
//           </li>
//           <li>
//             <a>Trainers</a>
//           </li>

//           <li>
//             <a>SignUp</a>
//           </li>
//           <li>
//             <NavLink to="/ecom">
//               <FontAwesomeIcon icon={faShop} id="login-btn" />
//             </NavLink>
//           </li>
//           <li>
//             <NavLink>
//               <FontAwesomeIcon
//                 icon={faUser}
//                 id="login-btn"
//                 onClick={loginform}
//               />
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </>
//   );
// }

// export default NavBar;
