import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitles/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
//   console.log(payments);
  return (
    <div>
      <div>
        <SectionTitle
          heading={"payment history"}
          subHeading={"At a Glance!"}
        ></SectionTitle>
      </div>
      <div>
        <div className="">
          <div className="flex justify-between items-center mt-6">
            <h2 className="text-4xl font-cinzel">
              Total Payments: {payments.length}
            </h2>
          </div>
          {/* table */}
          <div>
            <div className="overflow-x-auto mt-5 rounded rounded-t-2xl ">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className=" text-white bg-[#D1A054] uppercase text-lg ">
                    <th>email</th>
                    <th>Transaction id</th>
                    <th>total price</th>
                    <th>payment date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments?.map((item) => (
                    <tr key={item._id} className="text-xl">
                      <td>{item.email}</td>
                      <td>{item.transactionId}</td>
                      <td>${item.price}</td>
                      <td>{item.date}</td>
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

export default PaymentHistory;
