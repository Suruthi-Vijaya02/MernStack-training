import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'
import { useProducts } from '@/hooks/useProducts'

const Plants = () => {
  const { products: plants, loading } = useProducts('plants')

  return (
    <section className="bg-beige min-h-screen pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Indoor Plants"
          subtitle="Bring life to your space with our curated collection"
        />
        {loading ? (
          <p className="text-center text-sage py-12">Loading plants...</p>
        ) : plants.length === 0 ? (
          <p className="text-center text-sage py-12">No plants available right now.</p>
        ) : (
          <ProductGrid products={plants} columns={5} />
        )}
      </div>
    </section>
  )
}

export default Plants