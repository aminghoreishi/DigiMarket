import FormCheck from "./FormCheck";

function Checkout() {
  return (
    <div className="grid grid-cols-12 mt-8">
      <div className="col-span-8">
        <FormCheck />
      </div>
      <div className="col-span-4">Summary</div>
    </div>
  );
}

export default Checkout;
