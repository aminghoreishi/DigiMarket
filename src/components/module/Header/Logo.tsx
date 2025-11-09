import Image from "next/image";
import { memo } from "react";

const Logo = memo(() => {
  return (
    <div>
      <Image
        alt="iranMarket"
        src="/image/logo (1).png"
        width={100}
        height={100}
      />
    </div>
  );
});

export default Logo;
