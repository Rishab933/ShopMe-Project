import React from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../ProductCard' // CRITICAL: Check this path!

const TopProduct = () => {
  const { categories, isLoading } = useSelector((state) => state.products)
  //console.log("My Categories:", Object.keys(categories));

  // Show loading only if we are actually fetching
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl animate-pulse">Loading Featured Products...</p>
      </div>
    )
  }

  return (
    <div className="px-8 py-12">
      <h2 className="text-3xl font-bold mb-12 text-center text-[#333] dark:text-white">
        Featured Best-Sellers
      </h2>

      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-24 gap-x-10">
        {Object.entries(categories).map(([catName, catProducts]) => {
          // Sort and pick the single best item per category
          const topProduct = [...catProducts].sort((a, b) => b.rating - a.rating)[0];

          return (
            <div key={topProduct.id} className="relative group">
              <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2 px-2">
                {catName.replace("-", " ")}
              </p>
              
              <ProductCard 
                data={topProduct}
              />
              
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TopProduct