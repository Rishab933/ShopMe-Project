import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AOS from 'aos'
import "aos/dist/aos.css";
import { GiConsoleController } from 'react-icons/gi';

// API and Redux imports
import { getData } from './api/productApi'
import { setAllProducts, setLoading } from './redux/features/productSlice'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Navbar from './components/Navbar/Navbar';
import TopProducts from './components/TopProducts/TopProduct';
import Electronics from './components/Electronics/Electronics'
import Watches from './components/Watches/Watches';
import Groceries from './components/Groceries/Groceries';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

const App = () => {
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.products)


  // 1. Fetch data globally on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        dispatch(setLoading(true))
        const data = await getData()
        dispatch(setAllProducts(data))
      } catch (err) {
        console.error("Global Fetch Error:", err)
        dispatch(setLoading(false))
      }
    }

    if (items.length === 0) {
      fetchAllData()
    }
  }, [dispatch, items.length])

  // 2. Initialize AOS
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-out-sine",
      delay: 100
    })
    AOS.refresh()
  }, [])

  return (
    <div className='bg-white dark:bg-gray-900 dark:text-white duration-200 min-h-screen'>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/toprated' element={<TopProducts />} />
        <Route path='/electronics' element={<Electronics />} />
        <Route path='/watches' element={<Watches />} />
        <Route path='/groceries' element={<Groceries />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/product/:id' element={<ProductDetail />}></Route>
      </Routes>
    </div>
  )
}

export default App