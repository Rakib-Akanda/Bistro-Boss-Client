import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import loginImg from "../../assets/others/authentication2.png";
import bgImg from "../../assets/others/authentication.png";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handleValidateCaptcha = () => {
    const user_captcha_value = captchaRef.current.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  // manual form control
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   // Call the login API with the entered email and password
  //   // Redirect to the home page upon successful login
  //   const form = e.target;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const name = form.name.value;
  //   console.log(email, password);
  //   signIn(email, password).then((res) => {
  //     const user = res.user;
  //     console.log(user);
  //   });
  // };

  const onSubmit = (data) => {
    createUser(data.email, data.password)
    .then(() => {
      // const loggedInUser = result.user;
      updateUserProfile(data.name, data.photoUrl).then(() => {
        // console.log("User profile updated successfully");
        // create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            // console.log("user added to the database");
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User created successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(from, { replace: true });
            // console.log(loggedInUser);
          }
        });
      });
    });
  };
  //   console.log(watch("name", "password", "email"));

  return (
    <>
      <Helmet>
        <title> Bistro Boss | Sign Up</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`hero min-h-screen max-w-screen-xl mx-auto `}>
          <div className="hero-content flex justify-between border-r-8 border-b-8 border-t-4 border-l-4 rounded-2xl border-black border-opacity-20 shadow-2xl shadow-black w-full">
            <div className="text-center lg:text-left md:w-1/2">
              <img src={loginImg} alt="" />
            </div>
            <div className=" md:w-1/2 max-w-sm ">
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="text-center font-bold text-3xl">
                  <p>Sign Up</p>
                </div>
                {/* Name */}
                <div className="form-control">
                  <label className="label ">Name</label>
                  <input
                    type="text"
                    name="name"
                    {...register("name", { required: true })}
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Enter Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-700">Name is required!</span>
                  )}
                </div>
                {/* Photo URL */}
                <div className="form-control">
                  <label className="label ">Photo URL</label>
                  <input
                    type="text"
                    {...register("photoUrl", { required: true })}
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Photo URL"
                  />
                  {errors.photoUrl && (
                    <span className="text-red-700">Photo URL is required!</span>
                  )}
                </div>
                {/* email */}
                <div className="form-control">
                  <label className="label ">Email</label>
                  <input
                    type="email"
                    name="email"
                    {...register("email", { required: true })}
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Type Here"
                  />
                  {errors.email && <span>Email is required!</span>}
                </div>
                {/* Password */}
                <div className="form-control">
                  <label className="label ">Password</label>
                  <input
                    type="password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    className="input border-1 border-[#D0D0D0] rounded-lg w-full"
                    placeholder="Enter Your Password"
                  />
                  {errors.password?.type === "required" && (
                    <p>Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p>Password must be 6 characters</p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p>Password must be less then 20 characters</p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-700">
                      Password must have one uppercase, one lower case, one
                      number and one special characters!
                    </p>
                  )}
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
                  <button
                    type="button"
                    onClick={handleValidateCaptcha}
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
                    value={"Sign Up"}
                  />
                </div>
                {/* extra form */}
                <SocialLogin></SocialLogin>
                {/* <div>
                  <div>
                    <p className="text-center mt-3 text-[#D1A054] link-hover">
                      Already Registered?
                      <Link to="/login"> Go to log in</Link>
                    </p>
                    <p className="text-center mt-3 text-black">
                      Or sign up with
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

export default SignUp;
