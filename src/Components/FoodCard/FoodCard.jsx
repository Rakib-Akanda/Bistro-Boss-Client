import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
const FoodCard = ({ item }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [, refetch] = useCart();
  const { image, price, recipe, name, _id } = item;
  const handleAddToCart = () => {
    if (user && user.email) {
      //  send cart item to the database
      const cartItem = {
        menuId: _id,
        email: user.email,
        name,
        image,
        price,
      };
      axiosSecure.post("/cart", cartItem).then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch cart to update the cart items count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not logged in!",
        text: "Please login to add to the cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="bg-[#F3F3F3] w-[410px] shadow-sm relative">
      <p className="absolute right-0 mr-4 mt-4 px-2 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="">
        <img className="w-full " src={image} alt={name} />
      </div>

      <div className="text-center p-7 space-y-5">
        <h2 className="font-semibold text-2xl text-black">{name}</h2>
        <p>{recipe}</p>
        <div>
          <button
            onClick={handleAddToCart}
            className="text-[#BB8506] font-medium py-3 px-7 bg-[#E8E8E8] border-b-4 border-[#BB8506] rounded-lg hover:text-white hover:bg-[#1F2937] hover:border-[#1F2937]"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
