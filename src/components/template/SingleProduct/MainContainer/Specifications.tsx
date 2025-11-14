function Specifications({ features }: { features: string[] }) {
  return (
    <div className="font-danaMed border-t-2 border-t-zinc-200 pt-5">
      <h2 className="max-sm:text-sm">مشخصات محصول</h2>

      <div className="mt-5 flex flex-col divide-y-2 divide-zinc-200 space-y-5 ">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-10 pb-5 ">
            <p className="text-zinc-400 max-sm:text-xs text-sm">
              {feature.name}:
            </p>
            <p className="max-sm:text-sm ss02">{feature.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Specifications;
