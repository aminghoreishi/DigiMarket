import Image from "next/image";
import { memo } from "react";

const Logo = memo(() => {
  return (
    <>
      <Image
        alt="iranMarket"
        src="/image/logo (1).png"
        width={200}
        height={200}
      />
    </>
  );
});

export default Logo;
