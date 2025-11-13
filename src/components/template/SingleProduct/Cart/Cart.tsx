import CartColor from "./CartColor";
import CartAdd from "./CartAdd";

function Cart({ count, price , delivery , name , id }) {
  return (
    <div>
      <div>
        <CartColor />
      </div>
      <div>
        <CartAdd count={count} price={price} delivery={delivery} name={name} id={id} />
      </div>
    </div>
  );
}

export default Cart;
