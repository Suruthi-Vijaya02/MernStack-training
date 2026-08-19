import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'
import { useProducts } from '@/hooks/useProducts'

const Flowers = () => {
  const { products: flowers, loading } = useProducts('flowers')

  return (
    <section className="bg-beige min-h-screen pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Flowers"
          subtitle="Add a splash of color to your space"
        />
        {loading ? (
          <p className="text-center text-sage py-12">Loading flowers...</p>
        ) : flowers.length === 0 ? (
          <p className="text-center text-sage py-12">No flowers available right now.</p>
        ) : (
          <ProductGrid products={flowers} columns={5} />
        )}
      </div>
    </section>
  )
}

export default Flowers