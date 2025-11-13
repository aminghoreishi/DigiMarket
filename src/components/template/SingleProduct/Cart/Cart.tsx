import CartColor from "./CartColor";
import CartAdd from "./CartAdd";

function Cart({ count, price , delivery , name , id , img } : { count: number; price: number; delivery: boolean | number ; name: string ; id: string ; img: string}) {
  return (
    <div>
      <div>
        <CartColor />
      </div>
      <div>
        <CartAdd count={count} price={price} delivery={delivery} name={name} id={id} img={img} />
      </div>
    </div>
  );
}

export default Cart;
