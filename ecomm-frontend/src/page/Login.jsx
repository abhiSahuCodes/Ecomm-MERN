import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import loginSignUpImage from "../assets/userLogo.png";
import { RiEyeLine, RiEyeOffLine } from "react-icons/Ri";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const serverDomain = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

  const userData = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { email, password } = data
    if ( email && password ) {
      const fetchData = await fetch(`${serverDomain}/login`, {
        method : "POST",
        headers : {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
      toast(dataRes.message)
      
      if(dataRes.alert){
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate("/")
        }, 1000);
      }

    }
    else{
        alert("Please Enter required fields")
    }
  }

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4 rounded">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img src={data.image ? data.image : loginSignUpImage} className="w-full " />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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
          <div className="flex w-full justify-center">
            <button className="bg-gradient-to-br from-[#44D8FD] via-[#A49DDD] to-[#F76BC2] px-3 py-1 rounded-[0.3rem] my-3 w-20 font-semibold hover:scale-95 ease-in duration-200">
              Login
            </button>
          </div>
        </form>
        <p className="text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to={"/signup"}
            className="text-blue-700 no-underline hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
