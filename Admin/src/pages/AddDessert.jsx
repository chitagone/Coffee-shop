import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { url } from "../constants";
import { assets } from "../assets/assets";

const AddDessert = () => {
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/dessert/add`, formData);
      if (response.data.success) {
        toast.success("Coffee added successfully");
        setDesc("");
        setImage(null);
        setName("");
        setPrice("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    }
    setLoading(false);
  };
  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-[#8b5946] rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-center gap-6 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">Upload Dessert</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          <img
            className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-300"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload area"
          />
        </label>
      </div>

      <div className="flex flex-col w-full gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Dessert Name
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b5946] focus:border-[#8b5946] sm:text-sm"
            type="text"
            placeholder="Type here ..."
          />
        </label>
      </div>

      <div className="flex flex-col w-full gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Dessert Description
          <input
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b5946] focus:border-[#8b5946] sm:text-sm"
            type="text"
            placeholder="Type here ..."
          />
        </label>
      </div>

      <div className="flex flex-col w-full gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Dessert Price ($)
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8b5946] focus:border-[#8b5946] sm:text-sm"
            type="text"
            placeholder="Type here ..."
          />
        </label>
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8b5946] hover:bg-[#724641] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b5946]"
      >
        Add
      </button>
    </form>
  );
};

export default AddDessert;
