import { Helmet } from "react-helmet-async";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillGoogleCircle,
  AiOutlineGithub,
  AiFillTwitterCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail 
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
const SignIn = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const googleAuthProvider = new GoogleAuthProvider();
  const githubAuthProvider = new GithubAuthProvider();
  const emailRef = useRef();
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const displayName = result?.user?.displayName;
        const verifiedEmail = result.user.emailVerified;
        if (!verifiedEmail) {
          alert("Please verify you email address");
          return;
        }
        setSuccessMessage(`Log In Successful for ${displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };
  const handleGoogleSignIn = () => {
    setSuccessMessage("");
    setErrorMessage("");
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const displayName = result?.user?.displayName;
        setSuccessMessage(`Log In Successful for ${displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };
  const handleGithubSignIn = () => {
    setSuccessMessage("");
    setErrorMessage("");
    signInWithPopup(auth, githubAuthProvider)
      .then((result) => {
        const displayName = result?.user?.displayName;
        setSuccessMessage(`Log In Successful for ${displayName}`);
      })
      .error((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
      });
  };
  const handleForgotPassword =()=>{
    const validateEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailAddress = emailRef.current.value;
    if(!emailAddress){
      alert("Please provide and email")
      return;
    }
    else if(!validateEmail.test(emailAddress)){
      alert("Please provide a correct email address");
      return;
    }
    else{
      setSuccessMessage("An Email send to your account. Please check your email")
    }
    sendPasswordResetEmail(auth,emailAddress)
      .then()
      .catch(error=>setErrorMessage(error.message))
  }

  return (
    <div className="hero bg-base-200 py-7 md:py-16 lg:py-20">
      <Helmet>
        <title>Yellow Digital | Sign In</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign In</h1>
          <p className="py-6 text-lg font-medium">
            You have best guideline for your business to grow your business
            exponentially. Here you will find the best instructor of the world
            who will teach you how to reach your desire goal. So, Login Now.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-lg font-medium inline">Also Sign In with:</p>
            <AiFillGoogleCircle
              onClick={handleGoogleSignIn}
              className="text-3xl cursor-pointer font-bold text-red-400"
            />
            <AiOutlineGithub
              onClick={handleGithubSignIn}
              className="text-3xl cursor-pointer font-bold text-red-400"
            />
            <AiFillTwitterCircle className="text-3xl cursor-pointer font-bold text-red-400" />
          </div>
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
              New here ? Go to{" "}
              <Link className=" btn btn-primary rounded-sm" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form className="space-y-4" onSubmit={handleEmailSignIn}>
              <div className="form-control">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control flex  relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 cursor-pointer text-xl text-center"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible></AiFillEyeInvisible>
                  ) : (
                    <AiFillEye></AiFillEye>
                  )}
                </div>
                <p onClick={handleForgotPassword}  className="underline cursor-pointer pl-2 mt-2">Forgot password</p>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
