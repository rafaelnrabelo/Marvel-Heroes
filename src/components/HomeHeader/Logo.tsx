import Image from "next/image";

import styles from "../../styles/HomeLogo.module.scss";

const HomeLogo: React.FC = () => {
  return (
    <div className={styles.logo_container}>
      <Image
        src="/assets/logo.svg"
        layout="responsive"
        width={326}
        height={120}
        objectFit="contain"
        alt="Marvel - Search heros"
      />
    </div>
  );
};

export default HomeLogo;
