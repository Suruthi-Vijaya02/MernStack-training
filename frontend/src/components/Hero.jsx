import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-40 pb-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white/70 text-sm md:text-base font-inter tracking-widest uppercase mb-4"
        >
          Welcome to the Garden
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6 drop-shadow-lg"
        >
          Grow Your Little<br />Slice of Green
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/80 text-lg md:text-xl font-poppins mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-farmPink font-semibold">Fresh Farm</span> brings healthy plants, seeds, and garden essentials to your door — for the balcony, the backyard, or the windowsill. Indoors or outdoors, we deliver the green.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => navigate("/plants")}
          className="bg-sage text-cream py-3 px-8 rounded-xl shadow-md hover:shadow-lg hover:bg-forest transition-all duration-300 font-poppins font-medium text-lg"
        >
          Start Growing
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;