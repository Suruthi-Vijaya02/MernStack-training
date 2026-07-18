import React from 'react'
import products from '@/data/Products'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'

const Essentials = ({ addToCart }) => {
  const essentials = products.filter((p) => p.category === 'essentials')

  return (
    <section className="bg-beige min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Garden Essentials"
          subtitle="Everything you need to nurture your plants"
        />
        <ProductGrid products={essentials} addToCart={addToCart} columns={4} />
      </div>
    </section>
  )
}

export default Essentials