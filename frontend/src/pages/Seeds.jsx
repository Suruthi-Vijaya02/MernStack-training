import React from 'react'
import products from '@/data/Products'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'

const Seeds = () => {
  const seeds = products.filter((p) => p.category === 'seeds')

  return (
    <section className="bg-beige min-h-screen py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Seeds"
          subtitle="Start your garden from scratch with premium quality seeds"
        />
        <ProductGrid products={seeds} columns={5} />
      </div>
    </section>
  )
}

export default Seeds