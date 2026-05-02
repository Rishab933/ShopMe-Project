import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiShoppingBag } from 'react-icons/fi'

const Auth = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('Please fill in all fields.')
      return
    }

    if (isLogin) {
      // LOGIN — check localStorage
      const stored = JSON.parse(localStorage.getItem('user'))
      if (!stored) {
        setError('No account found. Please sign up first.')
        return
      }
      if (stored.email !== form.email || stored.password !== form.password) {
        setError('Invalid email or password.')
        return
      }
      localStorage.setItem('loggedIn', 'true')
      window.dispatchEvent(new Event('authChange'))
      navigate('/checkout')
    } else {
      // SIGNUP — save to localStorage
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
      }
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('loggedIn', 'true')
      window.dispatchEvent(new Event('authChange'))
      navigate('/checkout')
    }
  }

  return (
    <div className="min-h-[calc(100vh-150px)] bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <FiShoppingBag size={32} className="text-primary" />
          <span className="text-2xl font-extrabold dark:text-white">ShopMe</span>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">

          {/* Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-2xl p-1 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError('') }}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                isLogin
                  ? 'bg-white dark:bg-gray-900 text-primary shadow'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setIsLogin(false); setError('') }}
              className={`flex-1 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                !isLogin
                  ? 'bg-white dark:bg-gray-900 text-primary shadow'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name (signup only) */}
            {!isLogin && (
              <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold dark:text-white">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold dark:text-white">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold dark:text-white">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="bg-primary text-white py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 mt-2"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth