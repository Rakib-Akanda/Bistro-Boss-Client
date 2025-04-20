import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

import bgImg from "../../assets/others/authentication.png";
import loginImg from "../../assets/others/authentication2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [signInErr, setSignInErr] = useState("");
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // console.log(location.state);
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    // const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Call the login API with the entered email and password
    // Redirect to the home page upon successful login
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        // console.log(res.user);
        if (user) {
          Swal.fire({
            title: "Logged in successfully",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `,
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `,
            },
          });
        }
        // console.log(from);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setSignInErr(err.message.split("(")[1]?.split(")")[0]);
      });
  };
  return (
    <>
      <Helmet>
        <title> Bistro Boss | Login</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`hero  min-h-screen max-w-screen-xl mx-auto `}>
          <div className="hero-content flex justify-between border-r-8 border-b-8 border-t-4 border-l-4 rounded-2xl border-black border-opacity-20 shadow-2xl shadow-black w-full">
            <div className="text-center lg:text-left md:w-1/2">
              <img src={loginImg} alt="" />
            </div>
            <div className=" md:w-1/2 max-w-sm ">
              <form className="" onSubmit={handleLogin}>
                <div className="text-center font-bold text-3xl">
                  <p>Login</p>
                </div>
                {/* Email */}
                <div className="form-control">
                  <label className="label ">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Type Here"
                  />
                </div>
                {/* Password */}
                <div className="form-control">
                  <label className="label ">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Enter Your Password"
                  />
                  <Link className="link link-hover label-text mt-1">
                    Forgot password?
                  </Link>
                </div>
                {/* Captcha  */}
                <div className="form-control mt-2">
                  <div className=" text-[#5D5FEF] link-hover ">
                    <LoadCanvasTemplate />
                  </div>
                  <input
                    type="text"
                    ref={captchaRef}
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Type the captcha value"
                  />
                  {signInErr.length > 0 ? <p className="my-1 text-red-600 text-xl">{signInErr}</p> : ""}
                  <button
                    onClick={handleValidateCaptcha}
                    type="button"
                    className="btn btn-outline btn-xs mt-2 m-1"
                  >
                    Validate
                  </button>
                </div>
                <div>
                  <input
                    className="btn btn-neutral mt-4 w-full bg-[#D1A054B3] border-none text-white font-bold text-lg"
                    type="submit"
                    disabled={disabled}
                    value={"Sign In"}
                  />
                </div>
                {/* extra form */}
                <SocialLogin></SocialLogin>
                {/* <div>
                  <div>
                    <p className="text-center mt-3 text-[#D1A054] link-hover">
                      New here?
                      <Link to="/Signup"> Create a New Account</Link>
                    </p>
                    <p className="text-center mt-3 text-black">
                      Or sign in with
                    </p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link>
                      <FaFacebookF className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl " />
                    </Link>
                    <Link>
                      <FaGoogle className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl " />
                    </Link>
                    <Link>
                      <FaGithub className="text-center border border-1 border-black rounded-full my-4 p-2 text-4xl " />
                    </Link>
                  </div>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
