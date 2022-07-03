import { Hero } from "../../interfaces/Hero";
import styles from "../../styles/HeroInfo.module.scss";
import FavoriteButton from "../FavoriteButton";

interface HeroInfoProps {
  hero?: Hero;
  dominantColor: string;
}

const HeroInfo: React.FC<HeroInfoProps> = ({ hero, dominantColor }) => {
  const getHeroImageURL = () => {
    return `${hero?.thumbnail.path}/portrait_uncanny.${hero?.thumbnail.extension}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left_column}>
        <div className={styles.name_row}>
          <h1>{hero?.name}</h1>
          <FavoriteButton id={hero?.id} size={28} />
        </div>
        <p>{hero?.description || "Sem descrição."}</p>
      </div>

      <div
        style={{
          filter: `drop-shadow(5px 8px 8px rgba(${dominantColor}, 0.5))`,
        }}
        className={styles.right_column}
      >
        <img src={getHeroImageURL()} alt={hero?.name} />
      </div>

      <div className={styles.background_name_container}>
        <span className={styles.background_name}>
          {hero?.name.split(" ")[0]}
        </span>
      </div>
    </div>
  );
};

export default HeroInfo;
