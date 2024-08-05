import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { url } from "../constants";
import { bg_register } from "../assets/website";

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const { name, email, password } = data;
    try {
      const response = await axios.post(`${url}/api/auth/register`, {
        name,
        email,
        password,
      });
      const { data } = response;

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ name: "", email: "", password: "" });
        toast.success("Registration Successful! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center rounded-lg`}
      style={{ backgroundImage: `url(${bg_register})` }}
    >
      <div
        className="w-full max-w-md p-6 bg-[#2D1E13] rounded-lg shadow-xl lg:mr-[40rem] h-[30rem]"
        data-aos="fade-up"
        data-aos-once="true"
      >
        <h2 className="text-center text-3xl font-extrabold text-white mb-6">
          Register
        </h2>
        <form onSubmit={registerUser} className="space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name ..."
                className="appearance-none relative block w-full px-4 py-3 border border-[#2B1B12] bg-[#1F1309] text-white rounded-md focus:outline-none focus:ring-[#5E3A1F] focus:border-[#5E3A1F] sm:text-sm"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email ..."
                className="appearance-none relative block w-full px-4 py-3 border border-[#2B1B12] bg-[#1F1309] text-white rounded-md focus:outline-none focus:ring-[#5E3A1F] focus:border-[#5E3A1F] sm:text-sm"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password ..."
                className="appearance-none relative block w-full px-4 py-3 border border-[#2B1B12] bg-[#1F1309] text-white rounded-md focus:outline-none focus:ring-[#5E3A1F] focus:border-[#5E3A1F] sm:text-sm"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#5E3A1F] hover:bg-[#4B2A14] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5E3A1F]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
