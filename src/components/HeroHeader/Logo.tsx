import Link from "next/link";

const HeroLogo: React.FC = () => {
  return (
    <Link href="/">
      <img
        src="/assets/logo_menor.svg"
        width={215}
        height={32}
        alt="Marvel - Search heros"
        style={{ cursor: "pointer" }}
      />
    </Link>
  );
};

export default HeroLogo;
