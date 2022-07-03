import Link from "next/link";
import styles from "../../styles/HeroCard.module.scss";
import FavoriteButton from "../FavoriteButton";

interface HeroCardProps {
  id: number;
  name: string;
  image: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ id, name, image }) => {
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
        <FavoriteButton id={id} />
      </div>
    </div>
  );
};

export default HeroCard;
