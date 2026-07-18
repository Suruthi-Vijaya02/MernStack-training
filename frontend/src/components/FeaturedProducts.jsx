import React from 'react'
import products from '@/data/Products'
import ProductCard from '@/components/ProductCard'

const FeaturedProducts = () => {
  const featured = [
    products[0],
    products[10],
    products[16],
    products[23],
  ].filter(Boolean)

  return (
    <section className="bg-beige py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-poppins text-center text-charcoal">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts