import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      // console.log(res.user);
      const userInfo = {
        email: res.user?.email,
        name: res.user?.displayName,
      };
      axiosPublic.post("/users", userInfo).then(() => {
        // console.log(res.data);
        navigate(from, { replace: true });
      });
    });
  };
  return (
    <div>
      <div className="text-center mt-3 text-[#D1A054] link-hover">
        <Link to={location.pathname === "/login" ? "/Signup" : "/login"}>
          {location.pathname === "/login"
            ? "Already Registered? Go to log in"
            : "New Here? Create an Account"}
        </Link>
      </div>
      <div>
        <p className="text-center mt-3 text-black">Or sign up with</p>
      </div>
      <div className="flex gap-4 justify-center">
        <Link>
          <FaFacebookF className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl " />
        </Link>
        <Link>
          <FaGoogle
            onClick={handleGoogleSignIn}
            className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl "
          />
        </Link>
        <Link>
          <FaGithub className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl " />
        </Link>
      </div>
    </div>
  );
};

export default SocialLogin;
