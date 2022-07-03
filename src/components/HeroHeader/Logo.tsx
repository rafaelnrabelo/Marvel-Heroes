import Link from "next/link";
import Image from "next/image";

const HeroLogo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/logo_menor.svg"
        width={215}
        height={32}
        objectFit="contain"
        alt="Marvel - Search heros"
        style={{ cursor: "pointer" }}
      />
    </Link>
  );
};

export default HeroLogo;
