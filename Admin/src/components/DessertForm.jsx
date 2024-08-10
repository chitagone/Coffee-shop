import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../constants";
import { assets } from "../assets/assets";
import { MdClose } from "react-icons/md";

const DessertForm = ({ type, dessertData, onClose, getAllDessert }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    dessertData?.image ? dessertData.image : assets.upload_area
  );
  const [price, setPrice] = useState(dessertData?.price || "");
  const [name, setName] = useState(dessertData?.name || "");
  const [desc, setDesc] = useState(dessertData?.desc || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else if (dessertData?.image) {
      setPreview(dessertData.image);
    } else {
      setPreview(assets.upload_area);
    }
  }, [image, dessertData?.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

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
              `${url}/api/dessert/edit/${dessertData._id}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            )
          : await axios.post(`${url}/api/dessert/add`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

      if (response.data.success) {
        toast.success(
          type === "edit"
            ? "Dessert Updated Successfully"
            : "Dessert Added Successfully"
        );
        setDesc("");
        setImage(null);
        setName("");
        setPrice("");
        setPreview(assets.upload_area);
        getAllDessert();
        onClose();
      } else {
        toast.error(`Something went Wrong :${response.data.message}`);
      }
    } catch (error) {
      console.error("Error", error);
      toast.error(
        `An Error Occurred: ${error.response?.data?.message || error.message}`
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
      {/*CLose button */}
      <button
        type="button"
        className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center absolute -top-3 -right-3"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-slate-400" />
      </button>

      {/*Image form */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">Upload Dessert</p>
        <input
          type="file"
          onChange={handleImageChange}
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={preview}
            alt="Upload Area"
            className="w-32 h-32 object-cover rounded-lg border-2 border-dashed border-x-gray-300"
          />
        </label>
      </div>
      {/*Name */}
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
      {/*Desc */}
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
      {/* Price*/}
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

export default DessertForm;
