import React from "react";
import { coffee2 } from "../../assets/images";
import { banner_bg, bg_hero } from "../../assets/website";

const Hero = () => {
  return (
    <>
      <div
        className={`justify-center  bg-no-repeat bg-cover bg-center`}
        style={{ backgroundImage: `url(${bg_hero})` }}
      >
        <div className="min-h-[550px] sm:min-h-[600px] flex justify-center items-center text-[#c29d84]">
          <div className="container pb-8 sm:pb-0">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* text content section */}
              <div className="flex flex-col justify-center gap-6 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1">
                <h1
                  data-aos="fade-up"
                  data-aos-once="true"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold "
                >
                  We serve the best{" "}
                  <span
                    data-aos="zoom-out"
                    data-aos-delay="300"
                    className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/90 font-cursive"
                  >
                    Coffee
                  </span>{" "}
                  in the{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-primary to-primary/90 font-cursive">
                    Vientiane
                  </span>
                </h1>
                <div data-aos="fade-up" data-aos-delay="400">
                  <button className="bg-gradient-to-r from-primary to-secondary border-2 border-primary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full">
                    Coffee And Code
                  </button>
                </div>
              </div>
              {/* Image section */}
              <div
                data-aos="zoom-in"
                data-aos-duration="300"
                className="min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 "
              >
                <img
                  data-aos-once="true"
                  src={coffee2}
                  alt="biryani img"
                  className="w-[300px] sm:w-[450px] sm:scale-125 mx-auto spin "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;