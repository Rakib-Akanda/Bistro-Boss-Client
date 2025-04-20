// api , axios (Axios secure), tanstack
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  // tan stack quire
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  // console.log(user);
  const {
    refetch,
    data: cart = [],
    isLoading: loadingCart,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart?email=${user?.email}`);
      return res.data;
    },
  });
  return [cart, refetch, loadingCart];
};

export default useCart;
