import Feature from "./Feature";

function FeatureContainer() {
  return (
    <div className="">
      <h2 className="font-danaMed">ویژگی محصول:</h2>

      <div className="grid grid-cols-3 gap-3 mt-3">
        <Feature />
        <Feature />
        <Feature />
        <Feature />
        <Feature />
        <Feature />
      </div>
    </div>
  );
}

export default FeatureContainer;
