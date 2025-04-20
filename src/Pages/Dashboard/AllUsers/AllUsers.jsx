import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        // console.log(res.data);
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user?.name} is and Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const handleDeleteUser = (user) => {
    // console.log(user);
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="my-6">
      <div>
        <SectionTitle
          subHeading={"Hurry Up!"}
          heading={"Manage All Users"}
        ></SectionTitle>
      </div>
      {/* User details */}
      <div className="">
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-4xl font-cinzel">TOTAL USERS: {users.length} </h2>
        </div>
        {/* table */}
        <div>
          <div className="overflow-x-auto mt-5 rounded rounded-t-2xl ">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className=" text-white bg-[#D1A054]">
                  <th>#</th>
                  <th>Name</th>
                  <th>EMAIL</th>
                  <th>ROLE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.role === "admin" ? (
                        "Admin"
                      ) : (
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn bg-[#D1A054]"
                        >
                          <FaUsers className="text-white text-base"></FaUsers>
                        </button>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="btn bg-[#B91C1C]"
                      >
                        <FaTrashAlt className="text-white text-base"></FaTrashAlt>
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
  );
};

export default AllUsers;
