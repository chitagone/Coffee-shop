import { coffee_texture } from "../../assets/website";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { url } from "../../constants";

const response = await axios.get(`${url}/api/dessert/list`);

export const CoffeeMenus = response.data.dessert;

export const Dessert = () => {
  const [data, setData] = useState([]);

  const featchDessert = async () => {
    try {
      const response = await axios.get(`${url}/api/dessert/list`);
      if (response.data.success) {
        setData(response.data.dessert);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    featchDessert();
  });

  return (
    <>
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
                Best Dessert For you
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
              {data.map((data, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  key={index}
                  className="rounded-s-2xl bg-white hover:bg-[#dcc6bc] hover:text-white shadow-xl duration-200 max-w-[400px] group relative mt-6" // Increased max-w value
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

export default Dessert;
