import Feature from "./Feature";

function FeatureContainer({ features }: { features: any }) {
  return (
    <div className="">
      <h2 className="font-danaMed">ویژگی محصول:</h2>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {features.map((feature: string, index: number) => (
          <Feature key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
}

export default FeatureContainer;
