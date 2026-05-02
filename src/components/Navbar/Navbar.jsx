import React, { useEffect, useState } from "react";

import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import DarkMode from "./DarkMode";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
  const location = useLocation()
  const { cartItems } = useSelector((state) => state.cart);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  useEffect(()=>{
    const syncAuth = ()=>{
      setLoggedIn(localStorage.getItem('loggedIn'))
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    window.addEventListener('authChange', syncAuth)
    return() => window.removeEventListener('authChange', syncAuth)
  },[])

  return (
    <div className="shadow-md bg-white dark:text-white duration-200 relative z-40">
      {/* upper Navbar */}
      <div className="bg-primary/40 py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-5">

            <Link to={loggedIn && user ? '/profile' : '/auth'}>
              <div className="flex flex-col items-center gap-1 cursor-pointer">
                <FaUser className="text-gray-600 dark:text-gray-300 text-lg rounded-full"/>
                {loggedIn && (
                  <span className="text-xs font-bold text-primary">
                    {user?.name?.split(' ')[0]}
                  </span>
                )}
              </div>
            </Link>

            <Link to="/" className="font-bold text-xl items-center flex gap-1">
              <FiShoppingBag size="30" />
              ShopMe
            </Link>

          </div>

          {/* search bar */}
          <div className="flex justify-between items-center gap-4">
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-lg border border-gray-300 py-1 px-2
                text-sm focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-slate-800 "
              />
              <IoMdSearch className="text-slate-800 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 text-white" />
            </div>

            {/* order button */}
            <Link to='/cart'>
            <button
              className="relative bg-linear-to-r from-primary to-secondary transition-all duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3 group"
            >
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />

              {/* The Badge Icon */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">
                  {cartItems.length}
                </span>
              )}
            </button></Link>

            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* lower Navbar */}
      <div className="flex justify-center border-b border-gray-200 dark:border-gray-700 dark:bg-slate-800 py-2">
        <nav className="flex items-center gap-2 sm:gap-6 overflow-x-auto no-scrollbar px-4 whitespace-nowrap">
          {[
            { name: "Home", link: "/" },
            { name: "Top Rated", link: "/toprated" },
            { name: "Electronics", link: "/electronics" },
            { name: "Watches", link: "/watches" },
            { name: "Groceries", link: "/groceries" }
          ].map((menu) => (
            <Link
              key={menu.name}
              to={menu.link}
              className="inline-block px-3 py-2 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all duration-200"
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
