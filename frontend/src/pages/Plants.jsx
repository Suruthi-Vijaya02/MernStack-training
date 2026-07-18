import React from 'react'
import products from '@/data/Products'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'

const Plants = () => {
  const plants = products.filter((p) => p.category === 'plants')

  return (
    <section className="bg-beige min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Indoor Plants"
          subtitle="Bring life to your space with our curated collection"
        />
        <ProductGrid products={plants} columns={5} />
      </div>
    </section>
  )
}

export default Plants