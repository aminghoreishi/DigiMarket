"use client";
import CartColor from "./CartColor";
import CartAdd from "./CartAdd";
import { memo, useEffect, useMemo, useState } from "react";
function Cart({
  count,
  price,
  delivery,
  name,
  isLoggedIn,
  userID,
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
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0].trim());
    }
  }, [colors]);
  return (
    <>
      <div>
        <CartColorContainer
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
        <div>
          <CartAdd
            count={count}
            price={price}
            isLoggedIn={isLoggedIn}
            delivery={delivery}
            name={name}
            userID={userID}
            id={id}
            img={img}
            color={selectedColor}
          />
        </div>
      </div>
    </>
  );
}

const CartColorContainer = memo(
  ({
    colors,
    selectedColor,
    setSelectedColor,
  }: {
    colors: string[];
    selectedColor: string;
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    return (
      <div>
        <CartColor
          colors={colors}
          setColor={setSelectedColor}
          colorv={selectedColor}
        />
      </div>
    );
  }
);

export default Cart;
