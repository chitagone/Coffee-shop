import { coffee_texture } from "../../assets/website";
import axios from "axios";

import { url } from "../../constants";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Services = () => {
  const [data, setData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const fetchCoffee = async () => {
    try {
      const response = await axios.get(`${url}/api/coffee/list`);
      if (response.data.success) {
        setData(response.data.coffee);
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
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
    fetchCoffee();
  };

  useEffect(() => {
    fetchCoffee();
  }, []);
  return (
    <>
      <Navbar
        onSearchCoffee={onSearchCoffee}
        handleClearSearch={handleClearSearch}
      />
      <div
        className={`justify-center  bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${coffee_texture})` }}
      >
        <span id="services"></span>
        <div className="py-10">
          <div className="container">
            {/*Header title*/}
            <div className="text-center mb-20">
              <h1 className="text-4xl font-bold font-cursive text-gray-800">
                Best Coffee For you
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
              {data.map((data, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={index}
                  className="rounded-s-2xl bg-white hover:bg-primary hover:text-white shadow-xl duration-200 max-w-[400px] group relative mt-6" // Increased max-w value
                >
                  <div className="h-[150px]">
                    {" "}
                    <img
                      src={data.image}
                      alt="Coffee"
                      className="max-w-[250px] block mx-auto transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300" // Increased max-w value
                    />
                  </div>

                  <div className="p-6 text-center">
                    {" "}
                    <h1 className="text-2xl font-bold font-cursive2">
                      {" "}
                      {data.name}
                    </h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                      {`${data.price} kip`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
