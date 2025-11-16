import CartColor from "./CartColor";
import CartAdd from "./CartAdd";
import { ToastBar } from "react-hot-toast";

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
  return (
    <>
      
      <div>
        <div>
          <CartColor colors={colors} />
        </div>
        <div>
          <CartAdd
            count={count}
            price={price}
            delivery={delivery}
            name={name}
            id={id}
            img={img}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
