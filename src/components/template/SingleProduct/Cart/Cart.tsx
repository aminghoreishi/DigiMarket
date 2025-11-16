"use client";
import CartColor from "./CartColor";
import CartAdd from "./CartAdd";
import { useEffect, useMemo, useState } from "react";
function Cart({
  count,
  price,
  delivery,
  name,
  id,
  img,
  colors,
}: {
  count: number;
  price: number;
  delivery: boolean | number;
  name: string;
  id: string;
  img: string;
  colors: string[];
}) {
  const defaultColor = useMemo(() => colors[0] ?? "", [colors]);

  const [selectedColor, setSelectedColor] = useState<string>(defaultColor);

  useEffect(() => {
    setSelectedColor(defaultColor);
  }, [selectedColor , defaultColor]);
  return (
    <>
      <div>
        <div>
          <CartColor
            colors={colors}
            setColor={setSelectedColor}
            colorv={selectedColor}
          />
        </div>
        <div>
          <CartAdd
            count={count}
            price={price}
            delivery={delivery}
            name={name}
            id={id}
            img={img}
            color={selectedColor}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
