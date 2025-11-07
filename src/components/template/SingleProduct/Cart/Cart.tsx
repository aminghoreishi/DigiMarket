import CartColor from "./CartColor";
import CartAdd from "./CartAdd";

function Cart({ count, price , delivery }) {
  return (
    <div>
      <div>
        <CartColor />
      </div>
      <div>
        <CartAdd count={count} price={price} delivery={delivery} />
      </div>
    </div>
  );
}

export default Cart;
