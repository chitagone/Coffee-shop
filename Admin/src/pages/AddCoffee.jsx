import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { url } from "../constants";
import { assets } from "../assets/assets";

const AddCoffee = () => {
  const [image, setImage] = useState(false);
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

      const response = await axios.post(`${url}/api/coffee/add`, formData);
      if (response.data.success) {
        toast.success("Added Coffee");
        setDesc("");
        setImage(false);
        setImage("");
        setName("");
        setPrice("");
      } else {
        toast.error("SomeThing Wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occur");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-[#8b5946] rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-start gap-8 text-[#242221] font-cursive2"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Coffee Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-[#8b5946] border-2 border-black p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here ..."
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Coffee description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-[#8b5946] border-2 border-black p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here ..."
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Coffee Price $</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="bg-transparent outline-[#8b5946] border-2 border-black p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here ..."
        />
      </div>

      <button
        type="submit"
        className="text-base bg-[#724641] text-white py-2.5 px-14 cursor-pointer"
      >
        Add
      </button>
    </form>
  );
};

export default AddCoffee;
