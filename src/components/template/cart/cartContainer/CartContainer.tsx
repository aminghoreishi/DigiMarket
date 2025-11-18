import CartCom from "./CartCom";

export default function CartContainer({
  carts,
  onUpdateCount,
  setCarts,
}: {
  carts: any[];
  onUpdateCount: (id: number, count: number) => void;
  setCarts: (carts: any[]) => void;
}) {
  return (
    <div className="border-2 flex flex-col divide-y-2 border-zinc-200 rounded-xl">
      {carts.map((cart) => (
        <CartCom
          key={cart.id}
          cart={cart}
          onUpdateCount={onUpdateCount}
          setCarts={setCarts}
        />
      ))}
    </div>
  );
}
