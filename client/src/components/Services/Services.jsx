import { coffee_texture } from "../../assets/website";
import axios from "axios";
import { url } from "../../constants";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Services = () => {
  const [data, setData] = useState({ coffee: [], dessert: [] }); // State to hold both coffee and dessert
  const [isSearch, setIsSearch] = useState(false);

  // Fetch initial coffee data
  const fetchCoffee = async () => {
    try {
      const response = await axios.get(`${url}/api/coffee/list`);
      if (response.data.success) {
        setData((prevData) => ({ ...prevData, coffee: response.data.coffee }));
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
  };

  // Search both coffee and dessert items
  const onSearchAll = async (query, priceMin, priceMax) => {
    try {
      const response = await axios.get(`${url}/api/search-all-items`, {
        params: { query, priceMin, priceMax },
      });

      if (response.data && response.data.items) {
        setIsSearch(true);
        setData({
          coffee: response.data.items.coffee || [],
          dessert: response.data.items.dessert || [],
        }); // Set combined data

        // Scroll to the top of the page
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error("Error searching items:", error);
      toast.error("Error occurred while searching for items");
    }
  };

  // Clear search and fetch coffee data
  const handleClearSearch = () => {
    setIsSearch(false);
    fetchCoffee();
  };

  useEffect(() => {
    fetchCoffee();
  }, []);

  return (
    <>
      <Navbar
        onSearchCoffee={onSearchAll}
        handleClearSearch={handleClearSearch}
        showSearchBar={true}
      />
      {/* Full-Screen Search Overlay */}
      {isSearch && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-40 flex flex-col items-center justify-center overflow-auto backdrop-blur-md">
          <div className="relative w-full h-full flex flex-col items-center py-10 px-4">
            {/* Header title for search results */}
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold font-cursive text-white">
                Search Results
              </h1>
            </div>

            <div className="flex-1 w-full max-w-6xl overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Combined map for both coffee and dessert */}
                {data.coffee.concat(data.dessert).map((item, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    key={index}
                    className="rounded-lg bg-white shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300"
                  >
                    <div className="h-[250px] overflow-hidden">
                      <img
                        src={item.image}
                        alt="Item"
                        className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                      />
                    </div>

                    <div className="p-6 text-center">
                      <h1 className="text-2xl font-bold font-cursive2 mb-2">
                        {item.name}
                      </h1>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {`${item.price} kip`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleClearSearch}
              className="absolute top-4 right-4 text-white text-3xl p-2 bg-black rounded-full hover:bg-gray-700 transition"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* Default View */}
      {!isSearch && (
        <div
          className="relative py-10"
          style={{
            backgroundImage: `url(${coffee_texture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span id="services"></span>
          <div className="container">
            {/* Header title for default view */}
            <div className="text-center mb-20">
              <h1 className="text-4xl font-bold font-cursive text-gray-800">
                Best Coffee For You
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 place-items-center">
              {/* Default map for coffee */}
              {data.coffee.map((item, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={index}
                  className="rounded-lg bg-white hover:bg-primary hover:text-white shadow-xl duration-200 group relative mt-6"
                >
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={item.image}
                      alt="Item"
                      className="w-full h-full object-cover transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300"
                    />
                  </div>

                  <div className="p-6 text-center">
                    <h1 className="text-2xl font-bold font-cursive2">
                      {item.name}
                    </h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                      {`${item.price} kip`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
