"use client";

import { useState, useMemo } from "react";

type Feature = {
  name: string;
  value: string;
};

function Specifications({ features }: { features: Feature[] }) {
  const [sliceNumber, setSliceNumber] = useState(3);

  const visibleFeatures = useMemo(
    () => features.slice(0, sliceNumber),
    [features, sliceNumber]
  );

  return (
    <div className="font-danaMed border-t-2 border-t-zinc-200 pt-5">
      <h2 className="max-sm:text-sm">مشخصات محصول</h2>

      <div className="mt-5 flex flex-col divide-y-2 relative divide-zinc-200 space-y-5">
        {visibleFeatures.map((feature) => (
          <div key={feature.name} className="flex items-center gap-10 pb-5">
            <p className="text-zinc-400 max-sm:text-xs text-sm">
              {feature.name}:
            </p>
            <p className="max-sm:text-sm ss02">{feature.value}</p>
          </div>
        ))}

        {features.length > sliceNumber && (
          <button
            onClick={() => setSliceNumber((prev) => prev + 5)}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-zinc-100 px-3 py-2 rounded-lg shadow-md hover:bg-zinc-200 max-sm:text-xs"
          >
            مشاهده بیشتر
          </button>
        )}
      </div>
    </div>
  );
}

export default Specifications;
