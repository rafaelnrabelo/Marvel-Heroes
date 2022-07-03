import styles from "../../styles/ComicCard.module.scss";

interface HeroCardProps {
  title: string;
  image: string;
}

const HeroCard: React.FC<HeroCardProps> = ({ title, image }) => {
  return (
    <div className={styles.container}>
      <img src={image} width={150} height={225} />
      <p>{title}</p>
    </div>
  );
};

export default HeroCard;
