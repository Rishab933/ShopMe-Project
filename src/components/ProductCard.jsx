import React from 'react'
import { FaStar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({ data }) => {

  //const items = useSelector((store)=>store.products.items)
  //console.log(items[0])

  const navigate = useNavigate()

  const handleNavigate = ()=>{
    navigate(`/product/${data.id}`)
  }

  return (
    <div onClick={handleNavigate}
    className="rounded-2xl bg-white 
    cursor-pointer dark:bg-gray-800 
    hover:bg-black/80 dark:hover:bg-primary 
    hover:text-white shadow-xl 
    duration-300 group max-w-[300px] overflow-hidden">

      {/* Image Section - part of card, transparent bg */}
      <div className="h-[200px] w-full bg-transparent flex items-center justify-center p-4">
        <img
          src={data.images[0]}
          alt={data.title}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-105 duration-300 drop-shadow-md"
        />
      </div>

      {/* Details Section - colored bg */}
      <div className="p-4 text-center bg-white dark:bg-gray-800 group-hover:bg-black/80 dark:group-hover:bg-primary duration-300">

        {/* Stars + count */}
        <div className="w-full flex items-center justify-center gap-1">
          {[...Array(Math.round(data.rating))].map((_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
          <span className="text-xs text-gray-400 ml-1">({data.availabilityStatus})</span>
        </div>

        <h1 className="text-xl font-bold mt-1">{data.title}</h1>

        <p className="text-lg font-extrabold text-primary group-hover:text-white duration-300 mt-2">
          ₹{Math.round(data.price * 90)}
        </p>

        <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 mt-1">
          {data.description}
        </p>

        <button onClick={(e)=>{
          e.stopPropagation()
          handleNavigate()
        }}
        className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
          Order Now
        </button>

      </div>
    </div>
  )
}

export default ProductCard