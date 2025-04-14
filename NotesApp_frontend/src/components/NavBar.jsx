import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/notesLogo.webp"
const Navbar = () => {
  return (
    <>
      <nav className="bg-[#1C1C1E]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img className="h-8 w-auto" src={logo} alt="Notes Logo" />
              <div className=" ml-6 sm:block">
                <div className="flex space-x-4">
                  <p className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium font-man text-white" aria-current="page">Notes App...</p>
                </div>
              </div>
            </div>

            <div>
              <Link to={"/login"}>
                <button type="button" className="text-white font-man bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2">Login</button>
              </Link>

              <Link to={"/signup"}>
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                  <span className="font-man relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    SignUp
                  </span>
                </button>
              </Link>

            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar;