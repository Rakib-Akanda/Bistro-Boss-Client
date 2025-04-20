import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import { RxUpdate } from "react-icons/rx";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
const ManageItem = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  if (loading) {
    return <span className="loading loading-ring loading-xl"></span>;
  }
//   const handleItemUpdate = (item) => {
//     console.log(item);
//   };
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        // console.log(res.data);
        if (res.data.deletedCount > 0) {
          // refetch to update the ui
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} name has been deleted.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };
  return (
    <div>
      <div>
        <SectionTitle
          heading={"manage all items"}
          subHeading={"Hurry Up!"}
        ></SectionTitle>
      </div> 
      <div>
        {/* User details */}
        <div className="">
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-4xl font-cinzel">
              TOTAL ITEMS: {menu.length}{" "}
            </h2>
          </div>
          {/* table */}
          <div>
            <div className="overflow-x-auto mt-5 rounded rounded-t-2xl ">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className=" text-white bg-[#D1A054] uppercase ">
                    <th>#</th>
                    <th>Item Image</th>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Update</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item, idx) => (
                    <tr key={item._id}>
                      <td>{idx + 1}</td>
                      <td>
                        <div>
                          <img
                            src={item?.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover"
                          />
                        </div>
                      </td>
                      <td>
                        {item.name.length > 30
                          ? item.name.substring(0, 30) + "..."
                          : item.name}
                      </td>
                      <td>${item.price}</td>
                      <td>
                        <Link to={`/dashboard/updateItem/${item._id}`}>
                          <button
                            // onClick={() => handleItemUpdate(item)}
                            className="btn bg-[#D1A054]"
                          >
                            <RxUpdate className="text-white text-lg"></RxUpdate>
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="btn bg-[#B91C1C]"
                        >
                          <FaTrashAlt className="text-white text-lg"></FaTrashAlt>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItem;
