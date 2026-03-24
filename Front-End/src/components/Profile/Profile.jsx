import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Profile() {
  const token = localStorage.getItem("accessToken");
  const savedRole = localStorage.getItem("currentRole") || "user";
  const authRole = savedRole === "admin" ? "admin" : "user";

  let nav = useNavigate();
  //   const [user, setUser] = useState(null);
  //   const [error, setError] = useState("");

  //   useEffect(() => {
  //     async function getProfile() {
  //       try {
  //         const res = await api.get("/user/profile", {
  //           headers: {
  //             authentication: `${authRole} ${token}`,
  //           },
  //         });

  //         setUser(res.data.user);
  //       } catch (err) {
  //         setError(
  //           err.response?.data?.message ||
  //             err.response?.data?.Message ||
  //             err.message,
  //         );
  //       }
  //     }

  //     getProfile();
  //   }, [authRole, token]);

  async function deleteUser() {
    try {
      const res = await api.delete("/user/delete", {
        headers: {
          authentication: `${authRole} ${token}`,
        },
      });

      if (res.data.Message == "deleted successfully") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("currentRole");
        localStorage.removeItem("canResetPassword");
        localStorage.removeItem("refreshToken");

        setTimeout(() => {
          nav("/");
        }, 3000);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }
  async function updateUser() {
    nav("/updateaccount");
  }
  return (
    // <div className="mt-52 home-hero">
    //   <div className="relative bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs">
    //     <button
    //       id="dropdownButton"
    //       data-dropdown-toggle="dropdown"
    //       className="absolute top-2 end-2 text-body hover:text-heading bg-neutral-primary-soft box-border border border-transparent hover:bg-neutral-tertiary focus:ring-4 focus:ring-neutral-tertiary rounded-base p-1.5 focus:outline-none"
    //       type="button"
    //     >
    //       <span className="sr-only">Open dropdown</span>
    //       <div className="relative w-10 h-10 overflow-hidden bg-neutral-secondary-medium rounded-full">
    //         <svg
    //           className="absolute w-12 h-12 text-body-subtle -left-1"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             fillRule="evenodd"
    //             d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </div>
    //     </button>
    //     {/* Dropdown menu */}
    //     <div
    //       id="dropdown"
    //       className="z-10 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-36 block hidden"
    //     >
    //       <ul
    //         className="p-2 text-sm text-body font-medium"
    //         aria-labelledby="dropdownButton"
    //       >
    //         <li>
    //           <a
    //             href="#"
    //             className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
    //           >
    //             Edit
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded-md"
    //           >
    //             Export Data
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             className="inline-flex items-center w-full p-2 text-fg-danger hover:bg-neutral-tertiary-medium rounded-md"
    //           >
    //             Delete
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="flex flex-col items-center">
    //       <img
    //         className="w-24 h-24 mb-6 rounded-full"
    //         src="/docs/images/people/profile-picture-3.jpg"
    //         alt="Bonnie image"
    //       />
    //       <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
    //         {user?.name}
    //       </h5>
    //       <span className="text-sm text-body">Visual Designer</span>
    //       <div className="flex mt-4 md:mt-6 gap-4">
    //         <button
    //           type="button"
    //           className="inline-flex items-center text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
    //         >
    //           <svg
    //             className="w-4 h-4 me-1.5 -ms-0.5"
    //             aria-hidden="true"
    //             xmlns="http://www.w3.org/2000/svg"
    //             width={24}
    //             height={24}
    //             fill="none"
    //             viewBox="0 0 24 24"
    //           >
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    //             />
    //           </svg>
    //           Follow me
    //         </button>
    //         <button
    //           type="button"
    //           className="inline-flex self-start w-auto text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
    //         >
    //           Message
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="mt-52 home-hero">
      profile
      <button type="button" onClick={deleteUser} className="cursor">
        delelte account
      </button>
      <button type="button" onClick={updateUser} className="cursor">
        update account
      </button>
    </div>
  );
}
