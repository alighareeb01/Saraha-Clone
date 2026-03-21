import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Navbar() {

   const token = localStorage.getItem("accessToken");

   const nav = useNavigate();
   function handleLogout() {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("refreshToken");
     localStorage.removeItem("currentRole");
     nav("/login");
   }

   return (
     <div className="bg-black text-amber-50 fixed top-0 w-full px-6 py-3 app-nav">
       <ul className="flex justify-between items-center w-full app-nav-list">
         <li className="app-brand">Saraha Clone</li>

         <li className="flex gap-6 app-nav-links">
           {token ? (
             <>
               <Link className="app-nav-link" to="/">
                 Home
               </Link>
               <Link className="app-nav-link" to="/dashboard">
                 Dashbaord
               </Link>
               <Link className="app-nav-link app-nav-link-inbox" to="/inbox">
                 <span className="app-nav-icon" aria-hidden="true">
                   <svg
                     viewBox="0 0 24 24"
                     focusable="false"
                     aria-hidden="true"
                   >
                     <path
                       d="M20 7.4V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7.4a2 2 0 0 1 .6-1.42l2.38-2.38A2 2 0 0 1 8.4 3h7.2a2 2 0 0 1 1.42.6l2.38 2.38A2 2 0 0 1 20 7.4Z"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="1.6"
                       strokeLinejoin="round"
                     />
                     <path
                       d="M4 12h4l1.6 2h5l1.6-2h4"
                       fill="none"
                       stroke="currentColor"
                       strokeWidth="1.6"
                       strokeLinejoin="round"
                       strokeLinecap="round"
                     />
                   </svg>
                 </span>
                 <span>Inbox</span>
               </Link>

               <button className="app-nav-link" onClick={handleLogout}>
                 Logout
               </button>
             </>
           ) : (
             <>
               <Link className="app-nav-link" to="/login">
                 Login
               </Link>
               <Link className="app-nav-link" to="/register">
                 Register
               </Link>
             </>
           )}
         </li>
       </ul>
     </div>
   );
}
