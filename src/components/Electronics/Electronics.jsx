import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard'

const Electronics = () => {
  // We pull 'items' (the full array of 100 products) instead of 'categories'
  const { items, isLoading } = useSelector((state) => state.products)

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading Electronic Products...</p>
      </div>
    )
  }

  // 1. Filter the entire items array for the categories you want
  const electronicProducts = items.filter(product => 
    product.category === "mobile-accessories" || 
    product.category === "laptops" ||
    product.category === "smartphones" // Added smartphones just in case
  );

  return (
    <div className="px-8 py-12">
      <h2 className="text-3xl font-bold mb-12 text-center text-[#333] dark:text-white">
        Electronics Collection
      </h2>

      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-24 gap-x-10">
        {electronicProducts.map((product) => (
          <div key={product.id} className="relative group">
            {/* Optional: Show category tag for each item */}
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2 px-2">
              {product.category.replace("-", " ")}
            </p>
            
            <ProductCard 
              data={product} />
              
          </div>
        ))}
        
        {/* Simple check if no products were found */}
        {electronicProducts.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-20 text-gray-500">
            No electronic products found in this collection.
          </div>
        )}
      </div>
    </div>
  )
}

export default Electronics