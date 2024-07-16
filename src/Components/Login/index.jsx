import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbEyeClosed } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import "./index.css";

const Login = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsgShow, setErrorMsgShow] = useState(false);

  const navigate = useNavigate();

  const handelError = (err) => {
    setErrorMsg(err);
    setErrorMsgShow(true);
  };

  const handelSuccess = (data) => {
    const details = JSON.stringify(data[0]);

    setUser(details);
    localStorage.setItem("user", details, { expires: 30 });
    navigate("/");
  };

  const OnSubmitForm = async (event) => {
    event.preventDefault();
    setErrorMsgShow(false);

    const loginApiUrl = "https://syoft.dev/Api/userlogin/api/userlogin";
    const loginDetails = { user_email: email, user_password: password };

    if (email !== "") {
      if (password !== "") {
        const response = await axios.post(loginApiUrl, loginDetails);
        const data = await response.data;
        console.log(data);
        setEmail("");
        setPassword("");
        if (data.status === true) {
          handelSuccess(data.user_data);
        } else {
          handelError(data.msg);
        }
      } else {
        setErrorMsg("Please Enter Password..!");
        setErrorMsgShow(true);
      }
    } else {
      setErrorMsg("Please Enter Email..!");
      setErrorMsgShow(true);
    }
  };

  return (
    <div
      // here i am using tailwind css instead of normal plain css
      className=" w-[100vw] h-screen p-5  
    flex flex-col align-center justify-center md:flex-row
     overflow-auto pt-11 md:p-[5%] "
    >
      <div className=" img-bg rounded-xl order-1 md:order-0 md:flex-grow-1">
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
        className="w-full bg-white  p-5
      flex flex-col  order-0 sm:rounded-t-xl gap-3 
      md:order-1 md:flex-grow-0 
      md:rounded-r-xl pl-9 drop-shadow-xl 
      "
        onSubmit={OnSubmitForm}
      >
        <img
          src={require("../../images/logo.jpg")}
          alt="logo"
          className="w-[78px] p-0"
        />
        <h1 className="font-poppins font-bold text-4xl text-gray-800 ">
          Sign In
        </h1>
        <div className="flex align-center gap-2">
          <p className="font-roboto text-sm font-medium">
            Are you have not register ?{" "}
          </p>
          <a
            className="font-roboto text-sm text-blue-600 font-medium"
            href="/sign-up"
          >
            Sing Up
          </a>
        </div>

        <div className="flex flex-col align-center gap-2">
          <label
            htmlFor="username"
            className="font-poppins text-sm text-gray-900 font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="username"
            placeholder="Please enter your email"
            className="border-2 border-gray-200 
            rounded-md h-9  outline-none p-4 font-poppins text-sm md:w-[445px]"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="flex flex-col align-center gap-2">
          <label
            htmlFor="password"
            className="font-poppins text-sm text-gray-900 font-medium"
          >
            Password
          </label>
          <div
            className="border-2 border-gray-200 
          rounded-md h-9  md:w-[445px] flex align-center pr-3"
          >
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              placeholder="please enter your password"
              className="h-[100%] w-full outline-none  font-poppins text-sm pl-3"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="button" onClick={() => setVisible(!isVisible)}>
              {isVisible ? <FaEye size={22} /> : <TbEyeClosed size={22} />}
            </button>
          </div>
        </div>
        {isErrorMsgShow && (
          <p
            className="font-poppins text-red-600 
          font-medium text-sm"
          >
            {errorMsg}
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-700 h-9 rounded-2xl text-white
          font-poppins font-semibold md:w-[445px] cursor-pointer
          "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
