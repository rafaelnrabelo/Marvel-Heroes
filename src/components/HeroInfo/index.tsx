import { useEffect, useState } from "react";
import Image from "next/image";
import { Hero } from "../../interfaces/Hero";
import styles from "../../styles/HeroInfo.module.scss";
import FavoriteButton from "../FavoriteButton";
import Rating from "../Rating";

interface HeroInfoProps {
  hero?: Hero;
  dominantColor: string;
}

const HeroInfo: React.FC<HeroInfoProps> = ({ hero, dominantColor }) => {
  const [isWideImage, setIsWideImage] = useState(
    window.matchMedia("(max-width: 700px)").matches
  );

  const numberFormatter = new Intl.NumberFormat("pt-BR");

  useEffect(() => {
    window.addEventListener("resize", updateHeroImage);
    return () => window.removeEventListener("resize", updateHeroImage);
  }, [isWideImage]);

  const updateHeroImage = () => {
    if (!isWideImage && window.matchMedia("(max-width: 700px)").matches) {
      setIsWideImage(true);
    }

    if (isWideImage && window.matchMedia("(min-width: 700px)").matches) {
      setIsWideImage(false);
    }
  };

  const getHeroImageURL = () => {
    if (isWideImage) {
      return `${hero?.thumbnail.path}/landscape_incredible.${hero?.thumbnail.extension}`;
    }
    return `${hero?.thumbnail.path}/portrait_uncanny.${hero?.thumbnail.extension}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.background_name_container}>
        <span className={styles.background_name}>
          {hero?.name.split(" ")[0]}
        </span>
      </div>

      <div className={styles.left_column}>
        <div className={styles.name_row}>
          <h1>{hero?.name}</h1>
          <FavoriteButton id={hero?.id} size={28} />
        </div>
        <p className={styles.description}>
          {hero?.description || "Sem descrição."}
        </p>

        <div className={styles.numbers_container}>
          <div>
            <p>Quadrinhos</p>
            <div className={styles.icon_container}>
              <Image src="/assets/ic_quadrinhos.svg" width={28} height={31} />
              <span>{numberFormatter.format(hero?.comics.available || 0)}</span>
            </div>
          </div>

          <div>
            <p>Filmes</p>
            <div className={styles.icon_container}>
              <Image src="/assets/ic_trailer.svg" width={30} height={23} />
              <span>{numberFormatter.format(hero?.events.available || 0)}</span>
            </div>
          </div>
        </div>
        <div className={styles.rating_container}>
          <p>Rating:</p>
          <Rating starsNumber={4} />
        </div>

        <div className={styles.date_container}>
          <p>Último quadrinho:</p>
          <span>13 fev. 2020</span>
        </div>
      </div>

      <div
        className={styles.right_column}
        style={{
          filter: `drop-shadow(5px 8px 8px rgba(${dominantColor}, 0.5))`,
        }}
      >
        <img src={getHeroImageURL()} alt={hero?.name} />
      </div>
    </div>
  );
};

export default HeroInfo;
