import React from "react";
import { ServicesData } from "../../constants";
import { coffee_texture } from "../../assets/website";

const Services = () => {
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
                Best Coffee For you
              </h1>
            </div>
            {/*Service card section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 md:gap-5 place-items-center">
              {ServicesData.map((data, index) => (
                <div
                  data-aos="fade-up"
                  data-aos-delay={data.aosDelay}
                  key={index}
                  className="rounded-s-2xl bg-white hover:bg-primary hover:text-white shadow-xl duration-200 max-w-[400px] group relative mt-6" // Increased max-w value
                >
                  {/*Image */}
                  <div className="h-[150px]">
                    {" "}
                    {/* Increased height */}
                    <img
                      src={data.img}
                      alt="Coffee"
                      className="max-w-[250px] block mx-auto transform -translate-y-14 group-hover:scale-110 group-hover:rotate-6 duration-300" // Increased max-w value
                    />
                  </div>
                  {/* text content */}
                  <div className="p-6 text-center">
                    {" "}
                    {/* Adjusted padding */}
                    <h1 className="text-2xl font-bold font-cursive2">
                      {" "}
                      {/* Increased font size */}
                      {data.name}
                    </h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                      {data.descrtion}
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
