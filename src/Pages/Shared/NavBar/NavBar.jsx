import { useTranslation } from "react-i18next";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineLanguage } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
const NavBar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const { t, i18n } = useTranslation();
  const [cart] = useCart();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  //   if (loading || loadingCart) {
  //     return <progress className="progress w-56"></progress>;
  //   }
  // if (loading ) {
  //   return <progress className="progress w-56"></progress>;
  // }
  const handleLogOut = () => {
    logout();
  };
  const navOptions = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
        >
          {t("HOME")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contactUs"}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
        >
          {t("CONTACT US")}
        </NavLink>
      </li>

      <li>
        <NavLink
          to={"/OurMenu"}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
        >
          {t("OUR MENU")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/Order/Salads"}
          className={({ isActive }) =>
            isActive ? "text-[#EEFF25]" : "text-white"
          }
        >
          {t("ORDER FOOD")}
        </NavLink>
      </li>
      {
        // user ? "true": "false";  -- just ternary
        // user ? condition2 ? "double true": 'one true' : false1; nested ternary, user jodi true hoi next condition2 e jabe and ei condition true hole double true return r false hole one true and user jodi false hoi tobe direct false1 e chole jabe.
      }
      {user && isAdmin && (
        <li>
          <NavLink
            to={"/dashboard/adminHome"}
            className={({ isActive }) =>
              isActive ? "text-[#EEFF25]" : "text-white"
            }
          >
            {t("DASHBOARD")}
          </NavLink>
        </li>
      )}
      {user && !isAdmin && (
        <li>
          <NavLink
            to={"/dashboard/userHome"}
            className={({ isActive }) =>
              isActive ? "text-[#EEFF25]" : "text-white"
            }
          >
            {t("DASHBOARD")}
          </NavLink>
        </li>
      )}
      {/* Cart */}
      <li className={"relative"}>
        <Link to={"/dashboard/cart"}>
          <FaCartShopping className="text-3xl" />
          <div className="absolute top-0  right-0 left-5 bottom-3 w-[24px] h-[24px] bg-red-600 rounded-full shadow-md flex flex-col items-center justify-center text-center ">
            {user ? <small>+{cart?.length}</small> : <small>0</small>}
          </div>
        </Link>
      </li>
      {/* Accounts */}
      {user ? (
        <>
          <button onClick={handleLogOut}>LOGOUT</button>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive ? "text-[#EEFF25]" : "text-white"
              }
            >
              {t("LOGIN")}
            </NavLink>
          </li>
        </>
      )}
      {/* Language */}
      <li>
        <div className="dropdown dropdown-bottom dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className=" m-1 flex flex-col items-center"
          >
            <MdOutlineLanguage className="text-3xl" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <button onClick={() => changeLanguage("en")}>English</button>
            </li>
            <li>
              <button onClick={() => changeLanguage("bn")}>Bangla</button>
            </li>
          </ul>
        </div>
      </li>
    </>
  );
  return (
    <>
      <div className="navbar fixed z-10 bg-[#15151580]  text-white bg-opacity-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className=" dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-[#15151599]"
            >
              {navOptions}
            </ul>
          </div>
          <Link to={"/"} className="text-xl ml-8 font-cinzel font-black ">
            Bistro Boss <br />
            <span className="font-bold text-lg tracking-[1.8px] ">
              Restaurant
            </span>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex ">
          <ul className="flex items-center space-x-4 font-extrabold px-1">
            {navOptions}
          </ul>
        </div>
      </div>
    </>
  );
};
export default NavBar;
