import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../constants";
import { toast } from "react-toastify";
import { MdDelete, MdCreate } from "react-icons/md";
import Modal from "react-modal";
import CoffeeForm from "../components/CoffeeForm";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import EmptyCard from "../components/EmptyCard";

function ListCoffee() {
  const [data, setData] = useState([]);

  const [openAddEditModl, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [isSearch, setIsSearch] = useState(false);

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

  const editCoffee = async (coffeeDetail) => {
    setOpenAddEditModal({ isShown: true, data: coffeeDetail, type: "edit" });
  };

  const addCoffee = async () => {
    setOpenAddEditModal({ isShown: true, data: null, type: "add" });
  };

  const onSearchCoffee = async (query, priceMin, priceMax) => {
    try {
      const response = await axios.get(`${url}/api/coffee/search-coffee`, {
        params: { query, priceMin, priceMax },
      });
      if (response.data && response.data.coffee) {
        setIsSearch(true);
        setData(response.data.coffee);
      }
    } catch (error) {
      console.error("Error searching coffee:", error);
      toast.error("Error occurred while searching for coffee");
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    fetchAlbums();
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="px-6 max-w-7xl mx-auto ">
      <Navbar
        onSearchCoffee={onSearchCoffee}
        handleClearSearch={handleClearSearch}
      />
      {data && data.length > 0 ? (
        <>
          <p className="text-3xl font-extrabold mb-8 text-center text-gray-800">
            All Coffee List
          </p>
          {openAddEditModl.isShown ? (
            <div className="flex items-center justify-center">
              <Modal
                isOpen={openAddEditModl.isShown}
                onRequestClose={() => {
                  setOpenAddEditModal({
                    isShown: false,
                    type: "add",
                    data: null,
                  });
                }}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  content: {
                    width: "90%",
                    maxWidth: "600px",
                    height: "auto",
                    maxHeight: "80vh",
                    margin: "auto",
                    borderRadius: "12px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                  },
                }}
              >
                <CoffeeForm
                  type={openAddEditModl.type}
                  coffeeData={openAddEditModl.data}
                  onClose={() => {
                    setOpenAddEditModal({
                      isShown: false,
                      type: "add",
                      data: null,
                    });
                  }}
                  getAllCoffee={fetchAlbums}
                />
              </Modal>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="hidden sm:grid grid-cols-[0.1fr_0.4fr_1.5fr_1fr_1.5fr_0.3fr] items-center gap-4 p-5 border-b border-gray-300 text-base bg-gray-100 font-semibold justify-items-center">
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
                  className="grid grid-cols-1 sm:grid-cols-[0.1fr_0.4fr_1.5fr_1fr_1.5fr_0.3fr] items-center gap-4 p-5 border-b border-gray-200 text-base bg-white hover:bg-gray-50 transition-all duration-200 justify-items-center"
                >
                  <span className="text-gray-600">{index + 1}</span>
                  <img
                    src={item.image}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                    alt={item.name}
                  />
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-green-600 font-semibold">
                    ${item.price}
                  </span>
                  <span className="text-gray-600">{item.desc}</span>
                  <div className="flex items-center justify-center gap-4">
                    <MdCreate
                      onClick={() => editCoffee(item)}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 transition-all duration-200 text-2xl"
                    />
                    <MdDelete
                      onClick={() => removeCoffee(item._id)}
                      className="cursor-pointer text-red-600 hover:text-red-800 transition-all duration-200 text-2xl"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <EmptyCard
          imgSrc={assets.no}
          message={
            isSearch
              ? "Oops! No coffee found matching your search"
              : `Start creating your first coffee entry! Click the 'Add' button to get started.`
          }
        />
      )}
      <button
        onClick={() => addCoffee()}
        className="inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#8b5946] hover:bg-[#724641] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b5946] absolute bottom-3 right-3"
      >
        Add
      </button>
    </div>
  );
}

export default ListCoffee;
