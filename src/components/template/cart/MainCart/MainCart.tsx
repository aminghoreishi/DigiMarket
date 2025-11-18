"use client";
import { useEffect, useState } from "react";
import CartContainer from "../cartContainer/CartContainer";
import CartSummary from "../CartSummary/CartSummary";

export default function MainCart() {
  const [carts, setCarts] = useState<any[]>([]);

 
  useEffect(() => {
    const data = localStorage.getItem("product");
    if (data) {
      setCarts(JSON.parse(data));
    }
    console.log(data);
  }, []);

  
  const updateCount = (id: number, newCount: number) => {
    setCarts(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, count: newCount } : item
      );
      localStorage.setItem("product", JSON.stringify(updated));
      return updated;
    });
  };

 
  const total = carts.reduce((sum, item) => sum + item.price * item.count, 0);

  return (
    <div className="grid max-lg:grid-cols-1 lg:grid-cols-12 gap-6 font-danaMed">
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <CartContainer carts={carts} onUpdateCount={updateCount} />
      </div>

      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="mt-8 sticky top-20">
          <CartSummary total={total} />
        </div>
      </div>
    </div>
  );
}