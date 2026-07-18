import React from "react";

const Hero = () => {
  return (
    <section className="bg-blush py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">

        <div className="w-full">
          <img
            src="/src/assets/banners/hero.jpeg"
            alt="Plants"
            className="rounded-2xl w-full h-[300px] md:h-[480px] object-cover shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-forest font-semibold text-3xl md:text-5xl mb-3 font-poppins leading-tight">
            Welcome to Fresh Farm
          </p>

          <h1 className="text-moss text-xl md:text-2xl mb-4 font-poppins font-bold">
            Bring Freshness to Your Home
          </h1>
          
          <p className="text-charcoal text-base md:text-lg mb-6 font-poppins leading-relaxed">
            <span className="text-sage font-semibold">Fresh Farm</span> - makes your home a garden of fresh and healthy plants. We offer a wide selection of plants and seeds to meet your gardening needs. Shop with us and add a touch of nature to your home.
          </p>
          
          <button className="bg-sage text-cream py-2.5 px-6 rounded-xl shadow-sm hover:shadow-md hover:bg-forest transition-all duration-300 font-poppins font-medium w-fit">
            Shop Now
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;