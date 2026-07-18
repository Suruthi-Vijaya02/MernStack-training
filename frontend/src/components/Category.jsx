import React from "react";

const Category = () => {
  const categories = [
    {
      id: 1,
      name: "Indoor Plants",
      image: "/src/assets/banners/indoor.jpeg",
    },
    {
      id: 2,
      name: "Seeds",
      image: "/src/assets/banners/seed.jpeg",
    },
    {
      id: 3,
      name: "Essentials",
      image: "/src/assets/banners/pot.jpeg",
    },
    {
      id: 4,
      name: "Bouquets",
      image: "/src/assets/banners/flower.jpeg",
    },
  ];

  return (
    <div className="bg-beige py-16 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-12 font-poppins text-center text-forest">
        Categories
      </h1>

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
          >
            <div className="w-full md:w-1/2">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[280px] md:h-[400px] object-cover rounded-2xl shadow-md"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <p className="text-sage font-semibold text-2xl md:text-3xl mb-3 font-poppins">
                {category.name}
              </p>
              <p className="text-forest text-base md:text-lg mb-5 font-poppins leading-relaxed">
                <span className="text-sage font-semibold">Fresh Farm</span> - makes
                your home a garden of fresh and healthy plants. We offer a wide
                selection of plants and seeds to meet your gardening needs. Shop with
                us and add a touch of nature to your home.
              </p>
              <button className="bg-forest text-cream py-2.5 px-6 rounded-xl shadow-sm hover:shadow-md hover:bg-moss transition-all duration-300 font-poppins font-medium w-fit">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;