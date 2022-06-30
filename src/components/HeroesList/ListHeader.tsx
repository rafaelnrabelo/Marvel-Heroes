import Image from "next/image";
import Toggle from "../Toggle";

import styles from "./ListHeader.module.scss";

const HeroesList: React.FC = () => {
  return (
    <div className={styles.container}>
      <span>Encontrados 20 heróis</span>
      <div className={styles.filters_container}>
        <div className={styles.order_by}>
          <Image
            src="/assets/ic_heroi.svg"
            objectFit="contain"
            width={18}
            height={26}
          />
          <span>Ordenar por nome - A/Z</span>
        </div>
        <Toggle style={{ margin: "0 20px" }} />
        <div className={styles.only_fav}>
          <Image
            src="/assets/favorito_01.svg"
            objectFit="contain"
            width={18}
            height={18}
          />
          <span>Somente favoritos</span>
        </div>
      </div>
    </div>
  );
};

export default HeroesList;
