import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { url } from "../constants";
import { assets } from "../assets/assets";
import { MdClose } from "react-icons/md";

const AddCoffee = ({ type, coffeeData, onClose, getAllCoffee }) => {
  // State to manage the image file and its preview URL
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    coffeeData?.image ? coffeeData.image : assets.upload_area
  );
  const [price, setPrice] = useState(coffeeData?.price || "");
  const [name, setName] = useState(coffeeData?.name || "");
  const [desc, setDesc] = useState(coffeeData?.desc || "");
  const [loading, setLoading] = useState(false);

  // Update preview when image state changes
  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else if (coffeeData?.image) {
      setPreview(coffeeData.image);
    } else {
      setPreview(assets.upload_area);
    }
  }, [image, coffeeData?.image]);

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // Handle form submission for adding or editing coffee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response =
        type === "edit"
          ? await axios.put(
              `${url}/api/coffee/edit/${coffeeData._id}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            )
          : await axios.post(`${url}/api/coffee/add`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

      if (response.data.success) {
        toast.success(
          type === "edit"
            ? "Coffee updated successfully"
            : "Coffee added successfully"
        );
        setDesc("");
        setImage(null);
        setName("");
        setPrice("");
        setPreview(assets.upload_area); // Reset preview to default
        getAllCoffee();
        onClose();
      } else {
        toast.error(`Something went wrong: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        `An error occurred: ${error.response?.data?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 border-4 border-gray-400 border-t-[#8b5946] rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-center gap-6 p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg relative"
      onSubmit={handleSubmit}
    >
      <button
        type="button"
        className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center absolute -top-3 -right-3"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-slate-400" />
      </button>
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">Upload Coffee</p>
        <input
          onChange={handleImageChange}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          <img
            className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-gray-300"
            src={preview}
            alt="Upload area"
          />
        </label>
      </div>

      <div className="flex flex-col w-full gap-4">
        <label className="block text-sm font-medium text-gray-700">
          Coffee Name
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
          Coffee Description
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
          Coffee Price ($)
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
        {type === "edit" ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default AddCoffee;
