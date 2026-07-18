import React from 'react'
import ProductCard from '@/components/ProductCard'

const ProductGrid = ({ products, columns = 5 }) => {
  const gridCols = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  }

  return (
    <div className={`grid ${gridCols[columns] || gridCols[5]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid