import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'
import { useProducts } from '@/hooks/useProducts'

const Essentials = () => {
  const { products: essentials, loading } = useProducts('essentials')

  return (
    <section className="bg-beige min-h-screen pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Gardening Essentials"
          subtitle="Everything you need to keep your plants thriving"
        />
        {loading ? (
          <p className="text-center text-sage py-12">Loading essentials...</p>
        ) : essentials.length === 0 ? (
          <p className="text-center text-sage py-12">No essentials available right now.</p>
        ) : (
          <ProductGrid products={essentials} columns={5} />
        )}
      </div>
    </section>
  )
}

export default Essentials