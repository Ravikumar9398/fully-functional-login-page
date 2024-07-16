import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

import "./index.css";

const Home = () => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handelLogoutFunction = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  //fetching user details from local storage

  useEffect(() => {
    const res = localStorage.getItem("user");

    if (res === null) {
      navigate("/login");
    } else {
      const data = JSON.parse(res);

      const newUser = {
        firstName: data.user_firstname,
        lastName: data.user_lastname,
        email: data.user_email,
        city: data.user_city,
        password: data.user_password,
        phone: data.user_phone,
        zipCode: data.user_zipcode,
      };

      setUser(newUser);
    }
  }, []);

  return (
    //here i am using tailwind css for styling purpose
    <div className="w-screen h-screen overflow-auto flex flex-col ">
      <nav className="w-full h-6  flex align-center justify-around pt-3 shadow-2xl mb-11 md:mb-3 ">
        <img
          src={require("../../images/soyft-logo.png")}
          className="w-33 h-11 object-contains"
          alt="logo"
        />
        <ul className="flex align-center gap-3 pt-2">
          <li className="font-poppins text-md font-semibold">Home</li>
          <li>
            <button
              type="button"
              className="flex align-center justify-center  gap-2 "
              onClick={handelLogoutFunction}
            >
              <p className="font-poppins text-md font-semibold"> Logout</p>
              <FiLogOut size={22} />{" "}
            </button>
          </li>
        </ul>
      </nav>

      <div className="w-full h-full mt-11 flex flex-col items-center justify-items-center ">
        <div className="w-[80%] flex flex-col items-center justify-items-center ">
          <h1 className="font-poppins font-bold text-2xl pb-3">Dashboard</h1>
          <img
            src={require("../../images/bg.jpg")}
            className="w-full h-14 md:h-24 object-cover rounded-t-xl"
            alt="profile bg"
          />

          <div
            className="w-full  flex flex-col items-center
       justify-items-center drop-shadow-xl border-2 border-gray-500 mb-9 rounded-b-xl pb-9"
          >
            <div>
              <img
                src={require("../../images/profile-pic.jpg")}
                alt="profile pic"
                className=" inline-block h-44 w-44 rounded-full ring-4 ring-white relative top-[-10px]"
              />
            </div>
            <div className="mt-5 flex flex-col items-center justify-items-center w-full gap-2">
              <h1 className="font-semibold text-3xl md:text-4xl font-poppins text-[#c11d00]">
                {user.firstName} {user.lastName}
              </h1>
              <p className="font-poppins font-semibold ">{user.email}</p>
              <p className="font-poppins font-semibold md:hidden ">
                {user.phone}
              </p>
              <div className="w-[100%] flex items-center justify-around pt-5 ">
                <div className="flex items-center gap-1">
                  <IoLocation />
                  <p className="font-poppins font-semibold ">{user.city}</p>
                </div>
                <div className=" hidden  md:flex md:items-center md:gap-1">
                  <FaPhone />
                  <p className="font-poppins font-semibold ">{user.phone}</p>
                </div>
                <div className="flex items-center gap-1">
                  <FaGlobeAmericas />
                  <p className="font-poppins font-semibold ">{user.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
