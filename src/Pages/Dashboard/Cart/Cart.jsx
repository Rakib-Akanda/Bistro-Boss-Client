import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, refetch] = useCart();

  const axiosSecure = useAxiosSecure();
  const totalPrice = Math.ceil(
    cart?.reduce((total, item) => total + item.price, 0)
  );
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className=" mt-6">
      <div>
        <SectionTitle
          subHeading={"My Cart"}
          heading={"Wanna add more?"}
        ></SectionTitle>
      </div>
      {/* cart content */}
      <div className="">
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-4xl font-cinzel">TOTAL ORDERS: {cart?.length}</h2>
          <h2 className="text-4xl font-cinzel">TOTAL PRICE: ${totalPrice}</h2>
          {cart.length ? (
            <Link to={"/dashboard/payment"}>
              <button className="text-white font-medium py-2 px-4 bg-[#D1A054] border-[#BB8506] rounded-lg hover:bg-[#1F2937] hover:border-[#1F2937] ">
                PAY
              </button>
            </Link>
          ) : (
            <button className="btn ">Pay</button>
          )}
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto mt-5 rounded rounded-t-2xl ">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="bg-[#D1A054] text-white">
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={item._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={item.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost text-base"
                      >
                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
