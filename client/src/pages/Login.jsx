import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { cofee, login_bg } from "../assets/website";
import { url } from "../constants";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault(); // prevent page automatic reload
    const { email, password } = data;

    try {
      const response = await axios.post(`${url}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // set the form to default value
        setData({ email: "", password: "" });
        toast.success("Login Success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`justify-center bg-no-repeat bg-cover bg-center rounded-lg`}
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div
        className="flex items-center justify-center h-screen "
        data-aos="fade-up"
        data-aos-once="true"
      >
        <div className="max-w-lg w-full bg-[#4E342E] rounded-lg shadow-xl overflow-hidden lg:ml-[30rem]">
          <div className="p-8">
            <div className="flex items-center justify-center">
              <img src={cofee} alt="Logo banner" width={150} />
            </div>
            <h2 className="text-center text-3xl font-extrabold text-white">
              Welcome Back
            </h2>

            <form onSubmit={loginUser} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email address
                  </label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-[#795548] bg-[#5D4037] text-white rounded-md focus:outline-none focus:ring-[#D7CCC8] focus:border-[#D7CCC8] focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-[#795548] bg-[#5D4037] text-white rounded-md focus:outline-none focus:ring-[#D7CCC8] focus:border-[#D7CCC8] focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-[#795548] focus:ring-[#6D4C41] border-[#795548] rounded"
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                  />
                  <label
                    className="ml-2 block text-sm text-gray-300"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    className="font-medium text-[#D7CCC8] hover:text-[#D7CCC8]"
                    href="#"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#6D4C41] hover:bg-[#8D6E63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D7CCC8]"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-[#3E2723] text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <a
              className="font-medium text-[#D7CCC8] hover:text-[#D7CCC8]"
              href="#"
            >
              <Link to="/register">Sign Up</Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
