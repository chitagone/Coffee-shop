import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../constants";
import { toast } from "react-toastify";

function ListCoffee() {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/coffee/list`);
      if (response.data.success) {
        setData(response.data.coffee);
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  const removeCoffee = async (id) => {
    try {
      const response = await axios.post(`${url}/api/coffee/remove`, { id });
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
      <p className="text-3xl font-extrabold mb-8 text-center text-gray-800">
        All Coffee List
      </p>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.1fr_0.4fr_1.5fr_1fr_1.5fr_0.3fr] items-center gap-4 p-5 border-b border-gray-300 text-base bg-gray-100 font-semibold">
          <span>#</span>
          <span>Image</span>
          <span>Name</span>
          <span>Price</span>
          <span>Description</span>
          <span>Action</span>
        </div>
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.1fr_0.4fr_1.5fr_1fr_1.5fr_0.3fr] items-center gap-4 p-5 border-b border-gray-200 text-base bg-white hover:bg-gray-50 transition-all duration-200"
          >
            <span className="text-gray-600">{index + 1}</span>
            <img
              src={item.image}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
              alt={item.name}
            />
            <span className="font-medium text-gray-800">{item.name}</span>
            <span className="text-green-600 font-semibold">${item.price}</span>
            <span className="text-gray-600">{item.desc}</span>
            <span
              onClick={() => removeCoffee(item._id)}
              className="cursor-pointer text-red-600 hover:text-red-800 transition-all duration-200"
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCoffee;
