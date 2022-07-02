import styles from "../../styles/HeroCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useHeroes } from "../../contexts/HeroesContext";

interface HeroCardProps {
  id: number;
  name: string;
  image: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ id, name, image }) => {
  const { isFavorite, toggleFavoriteHero } = useHeroes();
  const favorite = isFavorite(id);

  return (
    <div className={styles.container}>
      <Link href={`/hero/${id}`}>
        <div className={styles.image_container}>
          <img src={image} width={250} height={250} />
        </div>
      </Link>
      <div className={styles.name_row}>
        <Link href={`/hero/${id}`}>
          <p>{name}</p>
        </Link>
        <button onClick={() => toggleFavoriteHero(id)}>
          <img
            src={
              favorite ? "/assets/favorito_01.svg" : "/assets/favorito_02.svg"
            }
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default HeroCard;
