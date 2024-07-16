import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa";

import "./index.css";
import axios from "axios";

const SignUp = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showErrorFirstName, setShowErrorFirstName] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [checkedError, setCheckedError] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isShowError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handelFailure = (msg) => {
    setErrorMsg(msg);
    setShowError(true);
  };
  const handelSuccess = (msg) => {
    navigate("/login");
  };
  const OnSubmitForm = async (event) => {
    event.preventDefault();
    const newUser = {
      user_firstname: firstName,
      user_email: email,
      user_phone: phoneNumber,
      user_password: password,
      user_lastname: lastName,
      user_city: city,
      user_zipcode: zipCode,
    };

    const registerApiUrl =
      "https://syoft.dev/Api/user_registeration/api/user_registeration";

    if (firstName === "") {
      setShowErrorFirstName(true);
    } else {
      setShowErrorFirstName(false);
      if (email === "") {
        setEmailError(true);
      } else {
        if (phoneNumber === "") {
          setPhoneError(true);
        } else {
          if (password === "") {
            setPasswordError(true);
          } else {
            if (isChecked === false) {
              setCheckedError(true);
            } else {
              const response = await axios.post(registerApiUrl, newUser);
              const data = await response.data;

              if (data.status === true) {
                handelSuccess(data.msg);
              } else {
                handelFailure(data.msg);
              }
            }
          }
        }
      }
    }
  };

  return (
    <div
      // here i am using tailwind css instead of normal plain css
      className="w-[100vw] h-screen p-5  
    flex flex-col align-center justify-center md:flex-row
     overflow-auto  md:p-3"
    >
      <div className="hidden md:block img-bg rounded-xl order-1 md:order-0 md:flex-grow-1">
        <div
          className="bg-black opacity-85 w-full h-full 
        rounded-xl flex flex-col align-center 
        justify-center p-5 pl-9 pt-9  gap-5"
        >
          <h1
            className="text-white text-3xl w-3/4 
          font-bold  font-roboto"
          >
            Welcome to our community
          </h1>
          <p className="text-gray-200 w-4/5 font-poppins text-sm ">
            Fuse helps developers to build organized and well coded dashboard
            full of beautiful and rich modules. Join us and start building your
            application today.
          </p>
          <div className="w-full  flex align-center gap-2  ">
            <div className="flex -space-x-1 overflow-hidden ">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-block h-8 w-8 rounded-full ring-4 ring-black"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-block h-8 w-8 rounded-full ring-4 ring-black"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                className="inline-block h-8 w-8 rounded-full ring-4 ring-black"
              />
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-block h-8 w-8 rounded-full ring-4 ring-black"
              />
            </div>
            <p className="text-white text-[0.7rem] font-poppins  ">
              More than 17k people joined us, it`s your turn
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={OnSubmitForm}
        className="w-full bg-white pb-9
      flex flex-col  order-0 sm:rounded-t-xl gap-1
      md:order-1 md:flex-grow-0 
      md:rounded-r-xl pl-9 drop-shadow-xl h-full 
      "
      >
        <img
          src={require("../../images/logo.jpg")}
          alt="logo"
          className="w-[58px] p-0"
        />
        <h1 className="font-poppins font-bold text-4xl text-gray-800 ">
          Sign Up
        </h1>
        <div className="flex align-center gap-2">
          <p className="font-roboto text-sm font-medium">
            Already have an account?{" "}
          </p>
          <a
            className="font-roboto text-sm text-blue-600 font-medium"
            href="/login"
          >
            Login
          </a>
        </div>

        <div className="flex align-center gap-6">
          <div className="flex flex-col align-center gap-2">
            <label
              htmlFor="username"
              className="font-poppins text-sm text-gray-900 font-medium"
            >
              First name *
            </label>
            <input
              type="text"
              onFocus={() => setShowErrorFirstName(false)}
              id="username"
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Please enter your first name"
              className={
                showErrorFirstName
                  ? "border-2 border-red-600 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px] placeholder:text-red-600"
                  : "border-2 border-gray-200 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px]"
              }
            />
          </div>
          <div className="flex flex-col align-center gap-2">
            <label
              htmlFor="lastname"
              className="font-poppins text-sm text-gray-900 font-medium"
            >
              last name
            </label>
            <input
              type="text"
              id="lastname"
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Please enter your last name"
              className="border-2 border-gray-200 
            rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px]} "
            />
          </div>
        </div>

        <div className="flex flex-col align-center gap-2">
          <label
            htmlFor="email"
            className="font-poppins text-sm text-gray-900 font-medium"
          >
            Email address *
          </label>
          <input
            type="email"
            onFocus={() => setEmailError(false)}
            id="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Please enter your email"
            className={
              emailError
                ? "border-2 border-red-600 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px] placeholder:text-red-600"
                : "border-2 border-gray-200 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px]"
            }
          />
        </div>

        <div className="flex flex-col align-center gap-2">
          <label
            htmlFor="phone"
            className="font-poppins text-sm text-gray-900 font-medium"
          >
            Phone number *
          </label>
          <input
            type="number"
            onFocus={() => setPhoneError(false)}
            id="phone"
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Please enter your phone number"
            className={
              phoneError
                ? " w-full border-2 border-red-600 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[445px] placeholder:text-red-600"
                : "w-full border-2 border-gray-200 rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[445px]"
            }
          />
        </div>

        <div className="flex align-center gap-6 ">
          <div className="flex flex-col align-center gap-2">
            <label
              htmlFor="city"
              className="font-poppins text-sm text-gray-900 font-medium"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              onChange={(event) => setCity(event.target.value)}
              placeholder="Please enter your city"
              className="border-2 border-gray-200 
            rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px]"
            />
          </div>
          <div className="flex flex-col align-center gap-2">
            <label
              htmlFor="zipcode"
              className="font-poppins text-sm text-gray-900 font-medium"
            >
              Zip code
            </label>
            <input
              type="number"
              id="zipcode"
              onChange={(event) => setZipCode(event.target.value)}
              placeholder="Pin code "
              className="border-2 border-gray-200 
            rounded-md h-4  outline-none p-4 font-poppins text-sm md:w-[205px]"
            />
          </div>
        </div>

        <div className="flex flex-col align-center gap-2">
          <label
            htmlFor="password"
            className="font-poppins text-sm text-gray-900 font-medium"
          >
            Password *
          </label>
          <div
            className={
              passwordError
                ? "border-2 border-red-600 rounded-md h-9  md:w-[445px] flex align-center pr-3"
                : "border-2 border-gray-200 rounded-md h-9  md:w-[445px] flex align-center pr-3"
            }
          >
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              onFocus={() => setPasswordError(false)}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="please enter your password"
              className={
                passwordError
                  ? "h-[100%] w-full outline-none  font-poppins text-sm pl-3 placeholder:text-red-600"
                  : "h-[100%] w-full outline-none  font-poppins text-sm pl-3"
              }
            />
            <button type="button" onClick={() => setVisible(!isVisible)}>
              {isVisible ? <FaEye size={22} /> : <TbEyeClosed size={22} />}
            </button>
          </div>
        </div>
        <div className="flex align-center gap-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              setIsChecked(!isChecked);
              setCheckedError(false);
            }}
            className=""
          />
          <p className="font-poppins text-sm font-medium ">
            I agree to the{" "}
            <span className="text-blue-700">Terms of Services </span>
            and <span className="text-blue-700">Privacy Policy</span>
          </p>
        </div>
        {checkedError && (
          <p className="text-sm text-red-600 font-poppins font-medium">
            *Please accept terms and conditions
          </p>
        )}
        {isShowError && (
          <p className="text-sm text-red-600 font-poppins font-medium">
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-700 h-9 rounded-2xl text-white
          font-poppins  md:w-[445px] text-sm p-1 cursor-pointer
           mb-3 mt-1
          "
        >
          Create your free account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
