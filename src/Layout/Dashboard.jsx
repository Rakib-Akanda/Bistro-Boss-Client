import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // TODO: get isAdmin Value from the database
  const [isAdmin] = useAdmin();
  // console.log(isAdmin);
  return (
    <div className="max-w-screen-xl mx-auto flex">
      {/* dashboard sidebar */}
      <div className="w-64 min-h-screen bg-[#D1A054]">
        <div className="flex my-5 ml-2">
          <Link to={"/"} className="text-2xl ml-8 font-cinzel font-black">
            Bistro Boss <br />
            <span className="font-bold text-xl tracking-[1.8px] ">
              Restaurant
            </span>
          </Link>
        </div>
        <ul className="menu px-6">
          {isAdmin ? (
            <>
              {/* Admin Home */}
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className="text-2xl"></FaHome>
                  <span className="font-medium font-cinzel">ADMIN HOME</span>
                </NavLink>
              </li>
              {/* add items */}
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils className="text-2xl"></FaUtensils>
                  <span className="font-medium font-cinzel">ADD ITEMS</span>
                </NavLink>
              </li>
              {/* manageItems */}
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList className="text-2xl"></FaList>
                  <span className="font-medium font-cinzel">MANAGE ITEMS</span>
                </NavLink>
              </li>
              {/* bookings */}
              <li>
                <NavLink to="/dashboard/bookings">
                  <FaBook className="text-2xl"></FaBook>
                  <span className="font-medium font-cinzel">
                    MANAGE BOOKINGS
                  </span>
                </NavLink>
              </li>
              {/* all users */}
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers className="text-2xl"></FaUsers>
                  <span className="font-medium font-cinzel">ALL USERS</span>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <FaHome className="text-2xl"></FaHome>
                  <span className="font-medium font-cinzel">USER HOME</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <FaCalendar className="text-2xl"></FaCalendar>
                  <span className="font-medium font-cinzel">RESERVATION</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <FaCalendar className="text-2xl"></FaCalendar>
                  <span className="font-medium font-cinzel">
                    PAYMENT HISTORY
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart">
                  <FaShoppingCart className="text-2xl"></FaShoppingCart>
                  <span className="font-medium font-cinzel">
                    MY CART ({cart.length})
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review">
                  <FaAd className="text-2xl"></FaAd>
                  <span className="font-medium font-cinzel">ADD REVIEW</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBooking">
                  <FaList className="text-2xl"></FaList>
                  <span className="font-medium font-cinzel">MY BOOKING</span>
                </NavLink>
              </li>
            </>
          )}
          {/* Shared Nav Link */}
          <div className="border-t-2 border-white my-5"></div>
          <li>
            <NavLink to="/">
              <FaHome className="text-2xl"></FaHome>
              <span className="font-medium font-cinzel">HOME</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Order/Salads">
              <FaSearch className="text-2xl"></FaSearch>
              <span className="font-medium font-cinzel">MENU</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Order/Salads">
              <FaEnvelope className="text-2xl"></FaEnvelope>
              <span className="font-medium font-cinzel">Contact</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* Dashboard content */}
      <div className="flex-1 px-24 mt-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
