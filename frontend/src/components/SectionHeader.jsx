import React from 'react'

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold font-poppins text-charcoal mb-3">
      {title}
    </h2>
    {subtitle && (
      <p className="text-forest/70 font-inter text-lg">{subtitle}</p>
    )}
  </div>
)

export default SectionHeader