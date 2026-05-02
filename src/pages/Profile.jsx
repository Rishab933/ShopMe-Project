import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiShoppingBag } from 'react-icons/fi'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaHashtag } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../redux/features/cartSlice'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { cartItems } = useSelector((state) => state.cart)

  const loggedIn = localStorage.getItem('loggedIn')
  const user = JSON.parse(localStorage.getItem('user'))
  const orders = JSON.parse(localStorage.getItem('orders')) || []

  // If not logged in → redirect to auth
  if (!loggedIn || !user) {
    navigate('/auth')
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedIn')
    localStorage.removeItem('orders')
    window.dispatchEvent(new Event('authChange'))
    navigate('/auth')
  }

  const details = [
    { icon: <FaUser />, label: 'Full Name', value: user.name },
    { icon: <FaEnvelope />, label: 'Email', value: user.email },
    { icon: <FaPhone />, label: 'Phone', value: user.phone || 'Not provided' },
    { icon: <FaMapMarkerAlt />, label: 'Address', value: user.address || 'Not provided' },
    { icon: <FaCity />, label: 'City', value: user.city || 'Not provided' },
    { icon: <FaHashtag />, label: 'Pincode', value: user.pincode || 'Not provided' },
  ]

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-gray-900 pt-28 pb-12 px-4 sm:px-10">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Header Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-6">
          
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FaUser className="text-primary text-3xl" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold dark:text-white">{user.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</p>
            <div className="flex gap-4 mt-2 justify-center sm:justify-start">
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                {orders.length} Orders
              </span>
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
                {cartItems.length} Items in Cart
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-2xl font-bold transition-all active:scale-95"
          >
            Logout
          </button>
        </div>

        {/* Details Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-white mb-6">Personal Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl"
              >
                <div className="text-primary text-lg">{detail.icon}</div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{detail.label}</p>
                  <p className="font-semibold dark:text-white text-sm">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Card */}
        {orders.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold dark:text-white mb-6">Recent Orders</h2>
            <div className="flex flex-col gap-4">
              {orders.slice().reverse().map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl"
                >
                  <div>
                    <p className="font-bold dark:text-white text-sm">
                      Order #{order.id.toString().slice(-5)}
                    </p>
                    <p className="text-xs text-gray-400">{order.date} · {order.items.length} items</p>
                  </div>
                  <p className="font-extrabold text-primary">₹{order.total}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold dark:text-white mb-6">Current Cart</h2>
            <div className="flex flex-col gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-12 w-12 object-contain bg-gray-100 dark:bg-gray-600 rounded-xl"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold dark:text-white line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-primary">
                    ₹{Math.round(item.price * 90 * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Profile