import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    const name = e?.target?.name?.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        sendEmailVerification(user)
          .then(alert("Check your email. And verify your account"))
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });

        updateProfile(user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then()
          .catch((error) => {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
          });
        setSuccessMessage("Registration Successful");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };
  return (
    <div className="hero bg-base-200 py-5 md:py-7 lg:py-10">
      <Helmet>
        <title>Yellow Digital | Registration</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register Now</h1>
          <p className="py-6 text-lg font-medium">
            You have best guideline for your business to grow your business
            exponentially. Here you will find the best instructor of the world
            who will teach you how to reach your desire goal. So, Register Now.
          </p>

          <div className="mt-5">
            {successMessage && (
              <p className="text-xl font-bold text-[#008000]">
                {successMessage}
              </p>
            )}
            {errorMessage && (
              <p className="text-xl font-bold text-[#FF0000]">{errorMessage}</p>
            )}
          </div>
          <div className="mt-7">
            <p className="text-xl font-semibold">
              Already have an account go to{" "}
              <Link className=" btn btn-primary rounded-sm" to="/signIn">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-4 top-4 cursor-pointer text-xl text-center"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  ) : (
                    <AiFillEye></AiFillEye>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
