import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const Logo = memo(() => {
  return (
    <div>
      <Link href="/">
        <Image
          alt="iranMarket"
          src="/image/logo (1).png"
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
});

export default Logo;
