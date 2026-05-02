import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, isLoading } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const product = items.find((item) => item.id === Number(id));
  const [mainImage, setMainImage] = useState(product?.thumbnail);

  useEffect(() => {
    if (product) {
      setMainImage(product.thumbnail);
    }
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl animate-bounce">
          Loading Product Details...
        </div>
      </div>
    );
  }

  const isItemInCart = cartItems.find((item) => item.id === product.id);

  const handleaddToCart = () => {
    if (isItemInCart) {
      toast.success("Item is already in your cart!")
    } else {
      dispatch(addToCart(product));
      toast.success("Added to cart!")
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Section: Image (Flex-1) */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-gray-300 dark:bg-gray-600 rounded-3xl p-8 flex items-center justify-center h-[450px] w-full overflow-hidden">
            <img
              src={mainImage}
              alt={product.title}
              className="max-h-[400px] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Small Thumbnails Row */}
          <div className="flex gap-4 mx-auto overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`h-20 w-20 flex-shrink-0 border-2 border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-primary transition-all ${
                  mainImage === img ? "border-primary" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  className="h-full w-full object-cover"
                  alt="preview"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Info (Flex-1.5 for a wider feel) */}
        <div className="flex-[1.5] flex flex-col gap-6 dark:text-white">
          <div>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl font-extrabold mt-4 text-gray-800 dark:text-white">
              {product.title}
            </h1>
            <p className="text-gray-400 mt-1 italic">Brand: {product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-primary">
              ₹{Math.round(product.price * 90)}
            </p>
            <div className="h-6 w-[1px] bg-gray-300"></div>
            <p className="text-sm text-yellow-500 font-bold">
              ⭐ {product.rating} Rating
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed border-l-4 border-primary pl-4">
            {product.description}
          </p>

          <div className="flex space-y-2 py-5 flex-col md:flex-row md:gap-10 border-t border-gray-300 dark:border-gray-800">
            <p className="text-lg">
              <span className="font-bold">Items in Stock:</span>{" "}
              {product.stock || "10"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <button
              onClick={handleaddToCart}
              className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
            >
              Buy Now
            </button>
            <button
              onClick={handleaddToCart}
              className="flex-1 border-2 border-primary text-primary py-4 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* warranty Info*/}
      <div className="flex flex-wrap max-w-7xl mx-auto gap-4 p-6 bg-primary/5 dark:bg-primary/10 mt-10 rounded-3xl border border-primary/20">
        <div className="flex-1 min-w-[250px] flex items-center gap-4">
          <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
            🛡️
          </div>
          <div>
            <p className="text-sm font-bold dark:text-white">Warranty</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.warrantyInformation}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] flex items-center gap-4">
          <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
            🚚
          </div>
          <div>
            <p className="text-sm font-bold dark:text-white">Shipping Info</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.shippingInformation}
            </p>
          </div>
        </div>

        <div className="flex-1 min-w-[250px] flex items-center gap-4">
          <div className="h-12 w-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
            🔄
          </div>
          <div>
            <p className="text-sm font-bold dark:text-white">Return Policy</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {product.returnPolicy}
            </p>
          </div>
        </div>
      </div>

      {/* 3. REVIEWS SECTION (Full Width) */}
      <div className="flex flex-col gap-8 max-w-7xl mt-10 mx-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold dark:text-white">
            Customer Reviews
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {product.reviews?.length || 0} Reviews
          </span>
        </div>

        <div className="flex flex-wrap gap-6">
          {product.reviews?.map((review, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col gap-3 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-800 dark:text-white">
                  {review.reviewerName}
                </p>
                <div className="flex text-yellow-500 text-xs">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
