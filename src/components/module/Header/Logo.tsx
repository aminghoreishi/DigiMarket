import Image from "next/image";
import React, { memo } from "react";

const Logo = memo(() => {
  return (
    <div>
      <Image alt="iranMarket" src="/image/logo.png" width={200} height={200} />
    </div>
  );
});

export default Logo;
