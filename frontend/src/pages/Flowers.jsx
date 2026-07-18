import React from 'react'
import products from '@/data/Products'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'

const Flowers = () => {
  const flowers = products.filter((p) => p.category === 'flowers')

  return (
    <section className="bg-beige min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Flowers"
          subtitle="Fresh blooms to brighten every occasion"
        />
        <ProductGrid products={flowers} columns={4} />
      </div>
    </section>
  )
}

export default Flowers