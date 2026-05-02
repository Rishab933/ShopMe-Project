import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleCheckout = ()=>{
    const loggedIn = localStorage.getItem('loggedIn')
    if(!loggedIn){
      navigate('/auth')
    }else{
      navigate('/checkout')
    }
  }

  // Calculate Total Price (Assuming ₹90 conversion rate)
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.price * 90 * item.quantity)
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty!</h2>
        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all">
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 pb-12 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 dark:text-white">Shopping Cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex items-center gap-4 border border-gray-100 dark:border-gray-700">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="h-24 w-24 object-contain bg-gray-100 dark:bg-gray-700 rounded-xl"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{item.category}</p>
                  <div>
                    <p className="font-bold text-primary mt-1">₹{Math.round(item.price * 90)}</p>
                    <div className='flex items-center mt-3 cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg w-max overflow-hidden'>
                      <button onClick={()=> dispatch(decreaseQuantity(item.id))}
                        className='px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200
                        dark:hover:bg-gray-600 transition-colors font-bold'>-</button>
                      <p className='px-4 py-1 font-bold dark:text-white border-x border-gray-300 dark:border-gray-600'>{item.quantity}</p>
                      <button onClick={()=> dispatch(increaseQuantity(item.id))}
                        className='px-3 py-1 cursor-pointer bg-gray-100 dark:bg-gray-700 hover:bg-gray-200
                        dark:hover:bg-gray-600 transition-colors font-bold'>+</button>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <X size={36} />
                </button>
              </div>
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-28">
              <h2 className="text-xl font-bold mb-6 dark:text-white">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{Math.round(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <hr className="border-gray-100 dark:border-gray-700" />
                <div className="flex justify-between text-xl font-bold dark:text-white">
                  <span>Total</span>
                  <span>₹{Math.round(totalPrice)}</span>
                </div>
              </div>

              <button onClick={handleCheckout}
              className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;