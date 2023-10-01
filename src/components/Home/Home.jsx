import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-base-200 py-12 md:py-20 lg:py-32">
      <Helmet>
        <title>Yellow Digital | Home</title>
      </Helmet>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
          Welcome to Yellow Digital
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl text-center font-semibold">
          Grow your business with 10x with Yellow Digital
        </p>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <div className="btn btn-success rounded-sm">
          <Link to="/register">Register</Link>
        </div>
        <div className="btn btn-success rounded-sm">
          <Link to="/signIn">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
