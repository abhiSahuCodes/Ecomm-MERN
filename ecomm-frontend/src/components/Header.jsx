import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import {GiHamburgerMenu} from "react-icons/gi"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setshowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(userData.email);
  const adminEmail = import.meta.env.VITE_REACT_APP_ADMIN_EMAIL;
  // console.log(adminEmail);
  const handleshowProfileMenu = () => {
    setshowProfileMenu(!showProfileMenu);
  };
  const handleMenuDisplay = () => {
    if (showProfileMenu === true) {
      setshowProfileMenu(false);
    }
  };
  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Loggedout successfully");
    navigate("/");
  };
  const cartItemNumber = useSelector((state) => state.product.cartItem);

  return (
    <header
      className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white"
      onClick={handleMenuDisplay}
    >
      <div className="flex items-center h-full justify-between">
        <Link to={""} className="flex gap-x-2 items-center">
          <div className="h-14">
            <img src={logo} className="h-full rounded-md " />
          </div>
          <p className="font-semibold  font-arial">GroceryHub</p>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            <Link to={"products"}>Products</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="md:hidden">
            <div
              className="text-slate-600 text-3xl cursor-pointer w-8 h-8 overflow-hidden drop-shadow-md"
              onClick={handleMobileMenuToggle}
            >
              <GiHamburgerMenu />
            </div>
            {showMobileMenu && (
              <nav className="text-base md:text-lg flex flex-col absolute top-16 left-0 w-full bg-white shadow drop-shadow-md py-2 px-2 rounded">
                <Link to={""} onClick={handleMobileMenuToggle}>
                  Home
                </Link>
                <Link to={"products"} onClick={handleMobileMenuToggle}>
                  Products
                </Link>
                <Link to={"about"} onClick={handleMobileMenuToggle}>
                  About
                </Link>
                <Link to={"contact"} onClick={handleMobileMenuToggle}>
                  Contact
                </Link>
              </nav>
            )}
          </div>
          <Link to={"cart"} className="text-2xl text-slate-600 relative">
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 flex items-center justify-center rounded-full m-0 p-0 text-sm text-center">
              {cartItemNumber.length}
            </div>
          </Link>
          <div className="text-slate-600" onClick={handleshowProfileMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="w-full h-full" />
              ) : (
                <FaUserCircle />
              )}
            </div>
            {showProfileMenu && (
              <div className="absolute right-2 bg-white shadow drop-shadow-md py-2 px-2 flex flex-col rounded">
                {userData.email === adminEmail && (
                  <Link
                    to={"newproduct"}
                    className="white-space-nowrap cursor-pointer text-sm"
                  >
                    New Product
                  </Link>
                )}
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-red-500 text-sm rounded"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer text-sm"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
