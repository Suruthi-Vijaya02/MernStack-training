import React from "react";

const BgWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <img
          src="/bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BgWrapper;