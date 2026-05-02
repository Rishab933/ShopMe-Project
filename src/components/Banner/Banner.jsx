import React from "react";
import BannerImg from "../../assets/4547829.jpg";
import { GrSecure } from "react-icons/gr";
import { IoFastFood } from "react-icons/io5";
import { GiFoodTruck } from "react-icons/gi";
import { useNavigate } from 'react-router-dom'


const Banner = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-162.5 flex justify-center items-center py-12 pt-10 sm:pt-32">
      <div className="container">
        {/* Changed grid-cols-1 to md:grid-cols-2 for a professional side-by-side look */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image Section */}
          <div 
            data-aos="zoom-in" 
            data-aos-once="false" 
            data-aos-duration="1000"
            className="flex justify-center"
          >
            <img
              src={BannerImg}
              alt="Winter Sale"
              className="max-w-100 h-87.5 md:h-112.5 w-full mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,1)] object-cover rounded-2xl"
            />
          </div>

          {/* Text Details Section */}
          <div className="flex flex-col justify-center gap-6 sm:pt-0 text-center md:text-left">
            <h1 
              data-aos="fade-up" 
              className="text-3xl sm:text-4xl font-bold leading-tight"
            >
              Winter Sale <span className="text-primary">upto 50% Off</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-sm text-gray-500 tracking-wide leading-6"
            >
              Experience the best shopping deals this season. Our quality products
              are now available with lightning-fast delivery and secure payments.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div data-aos="fade-up" data-aos-delay="200" className="flex items-center gap-4 justify-center md:justify-start">
                <GrSecure className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400" />
                <p className="font-medium">Quality Products</p>
              </div>
              
              <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-4 justify-center md:justify-start">
                <IoFastFood className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-orange-100 dark:bg-orange-400" />
                <p className="font-medium">Fast Delivery</p>
              </div>
              
              <div data-aos="fade-up" data-aos-delay="400" className="flex items-center gap-4 justify-center md:justify-start">
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-green-100 dark:bg-green-400" />
                <p className="font-medium">Easy Payment</p>
              </div>
              
              <div data-aos="fade-up" data-aos-delay="500" className="flex items-center gap-4 justify-center md:justify-start">
                <GiFoodTruck className="text-4xl h-12 w-12 shadow-sm p-4 rounded-full bg-yellow-100 dark:bg-yellow-400" />
                <p className="font-medium">Exclusive Offers</p>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="600" className="mt-4 relative z-10">
                    <button
                      onClick={()=> navigate('/toprated')}
                      className="bg-linear-to-r from-primary to-secondary active:scale-95 cursor-pointer hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                    >
                      Order Now
                    </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;