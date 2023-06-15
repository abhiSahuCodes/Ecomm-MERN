import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginSignUpImage from "../assets/userLogo.png";
import { RiEyeLine, RiEyeOffLine } from "react-icons/Ri";
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";


const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  console.log(data);
  const serverDomain = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handlerShowConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleOnChange = (e) => {
    const {name, value} = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  }

  const handleUploadProfileImage = async(e) => {

    const data = await ImagetoBase64(e.target.files[0])
  
      setData((preve)=>{
          return{
            ...preve,
            image : data
          }
      })
  }
// console.log(process.env.REACT_APP_SERVER_DOMAIN);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const {firstName, email, password, confirmPassword} = data
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(`${serverDomain}/signup`, {
          method : "POST",
          headers : {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        })

        const dataRes = await fetchData.json()
        toast(dataRes.message)
        if(dataRes.alert){
          navigate("/login")
        }
        
      }
      else {
        alert("password and confirm password not equal")
      }
    }
    else {
      alert("Please Enter required fields");
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image : loginSignUpImage} className="w-full h-full" />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-400"
            value={data.firstName}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-400"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within: outline-blue-400"
            value={data.email}
            onChange={handleOnChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded relative pr-20 focus-within: outline-blue-400"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <span className="absolute right-4 flex">
              {showPassword ? (
                <RiEyeOffLine
                  onClick={handlerShowPassword}
                  className="cursor-pointer text-blue-800"
                />
              ) : (
                <RiEyeLine
                  onClick={handlerShowPassword}
                  className="cursor-pointer text-blue-800"
                />
              )}
            </span>
          </div>

          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              type={showConfirmPass ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded relative pr-20 focus-within: outline-blue-400"
              value={data.confirmPassword}
              onChange={handleOnChange}
              required
            />
            <span className="absolute right-4 flex">
              {showConfirmPass ? (
                <RiEyeOffLine
                  onClick={handlerShowConfirmPass}
                  className="cursor-pointer text-blue-800"
                />
              ) : (
                <RiEyeLine
                  onClick={handlerShowConfirmPass}
                  className="cursor-pointer text-blue-800"
                />
              )}
            </span>
          </div>

          <div className="flex w-full justify-center">
            <button className="bg-gradient-to-br from-[#44D8FD] via-[#A49DDD] to-[#F76BC2] px-3 py-1 rounded-[0.3rem] my-3 w-20 font-semibold hover:scale-95 ease-in duration-200">
              Signup
            </button>
          </div>
        </form>
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-700 no-underline hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
