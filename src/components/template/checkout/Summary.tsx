'use client';


import { useEffect, useState } from "react";

function Summary({deliveryMethod}: {deliveryMethod: "express" | "courier"}) {
    const [cart, setCart] = useState([])

    const [totalPrice, setTotalPrice] = useState(0)
    const [subTotal, setSubTotal]  = useState(0)

    useEffect(() => {
        const storedCart = localStorage.getItem('product');
           setCart(storedCart ? JSON.parse(storedCart) : []);
    } , [])

    useEffect(() => {
        setSubTotal(cart.reduce((total , item ) => total + item.price * item.count , 0  ));
    } , [cart])

  useEffect(() => {
    const deliveryCost = deliveryMethod === "express" ? 30000 : 50000;
    setTotalPrice(subTotal + deliveryCost);
  } , [deliveryMethod, subTotal])
  return (
    <div className="border-2 border-zinc-200 rounded-xl p-5 md:p-8">
        <h2>سبد خرید</h2>

        {
            deliveryMethod === "express" ? (
                <p className="mt-2 text-sm text-green-600 font-danaMed">ارسال با پست پیشتاز (1 الی 3 روز کاری)</p>
            ) : (
                <p className="mt-2 text-sm text-blue-600 font-danaMed">ارسال با پیک موتوری (1 روز کاری)</p>
            )
        }

        <div className="mt-6 border-t-2 border-zinc-200 pt-4 flex justify-between items-center">
            <h3 className="font-danaMed">جمع کل</h3>
            <p className="font-danaMed text-lg">{totalPrice} تومان</p>
        </div>
    </div>
  )
}

export default Summary