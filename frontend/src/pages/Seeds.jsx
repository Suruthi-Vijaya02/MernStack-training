import React from 'react'
import ProductGrid from '@/components/ProductGrid'
import SectionHeader from '@/components/SectionHeader'
import { useProducts } from '@/hooks/useProducts'

const Seeds = () => {
  const { products: seeds, loading } = useProducts('seeds')

  return (
    <section className="bg-beige min-h-screen pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Seeds"
          subtitle="Start your own garden from scratch"
        />
        {loading ? (
          <p className="text-center text-sage py-12">Loading seeds...</p>
        ) : seeds.length === 0 ? (
          <p className="text-center text-sage py-12">No seeds available right now.</p>
        ) : (
          <ProductGrid products={seeds} columns={5} />
        )}
      </div>
    </section>
  )
}

export default Seeds