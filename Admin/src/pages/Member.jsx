import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../constants";
import { toast } from "react-toastify";

const Member = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/list`);
      if (response.data.success) {
        setData(response.data.user);
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  const removeCoffee = async (id) => {
    try {
      const response = await axios.post(`${url}/api/auth/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
        All Members List
      </h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.1fr_2fr_3fr_1fr] items-center gap-6 p-5 border-b border-gray-300 bg-gray-100 text-sm font-medium text-gray-700">
          <span className="font-medium">#</span>
          <span className="font-medium">Name</span>
          <span className="font-medium">Email</span>
          <span className="font-medium text-right">Action</span>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.1fr_2fr_3fr_1fr] items-center gap-6 p-5 border-b border-gray-200 bg-white hover:bg-gray-50 transition-shadow duration-300 rounded-lg shadow-md"
          >
            <span className="text-gray-600 font-medium">{index + 1}</span>
            <span className="font-semibold text-gray-800">{item.name}</span>
            <span className="text-gray-600">{item.email}</span>
            <button
              onClick={() => removeCoffee(item._id)}
              className="text-red-600 hover:text-red-800 transition-colors duration-300 rounded-full p-2 hover:bg-red-100 text-right justify-self-end"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-11a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Member;
