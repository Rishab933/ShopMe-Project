import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { removeFromCart } from "../redux/features/cartSlice";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * 90 * item.quantity;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Save order to localStorage
    const order = {
      id: Date.now(),
      items: cartItems,
      total: Math.round(totalPrice),
      address: form,
      date: new Date().toLocaleDateString(),
    };
    const prevOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...prevOrders, order]));

    const updatedUser = {
      ...user,
      phone: form.phone,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Clear cart
    cartItems.forEach((item) => dispatch(removeFromCart(item.id)));

    toast.success("Order placed successfully! 🎉");
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 dark:text-white">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty!</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 dark:text-white">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">
              {/* Delivery Info */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold mb-4 dark:text-white">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Full Name",
                      name: "name",
                      type: "text",
                      placeholder: "John Doe",
                    },
                    {
                      label: "Email",
                      name: "email",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                    {
                      label: "Phone",
                      name: "phone",
                      type: "tel",
                      placeholder: "9876543210",
                    },
                    {
                      label: "City",
                      name: "city",
                      type: "text",
                      placeholder: "Kolkata",
                    },
                    {
                      label: "Pincode",
                      name: "pincode",
                      type: "text",
                      placeholder: "700006",
                    },
                  ].map((field) => (
                    <div key={field.name} className="flex flex-col gap-1">
                      <label className="text-sm font-semibold dark:text-white">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                  ))}

                  {/* Address - full width */}
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <label className="text-sm font-semibold dark:text-white">
                      Full Address
                    </label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no, Street, Area..."
                      rows={3}
                      className="border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold mb-4 dark:text-white">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "cod", label: "💵 Cash on Delivery" },
                    { value: "upi", label: "📱 UPI Payment" },
                    { value: "card", label: "💳 Credit / Debit Card" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        form.paymentMethod === method.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={form.paymentMethod === method.value}
                        onChange={handleChange}
                        className="accent-primary"
                      />
                      <span className="font-medium dark:text-white">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 text-lg"
              >
                Place Order 🎉
              </button>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-28">
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                Order Summary ({cartItems.length})
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-12 w-12 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold dark:text-white line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-primary">
                      ₹{Math.round(item.price * 90 * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100 dark:border-gray-700 mb-4" />

              <div className="space-y-3 mb-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
