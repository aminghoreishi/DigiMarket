"use client";

import { useState } from "react";

function Description({ longDescription }: { longDescription: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="font-danaMed">
      <h2 className="max-sm:text-sm">توضیحات این محصول</h2>
      <p className={`max-sm:text-xs text-sm  tracking my-5 ${isExpanded ? '' : 'line-clamp-3'}`}>
        {longDescription}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:text-blue-800 text-sm font-dana transition-colors"
      >
        {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
      </button>
    </div>
  );
}

export default Description;
