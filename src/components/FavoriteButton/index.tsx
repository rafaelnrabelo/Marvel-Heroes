import { useHeroes } from "../../contexts/HeroesContext";
import styles from "./FavoriteButton.module.scss";

interface FavoriteButtonProps {
  id?: number;
  size?: number;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id = 0,
  size = 20,
}) => {
  const { toggleFavoriteHero, isFavorite } = useHeroes();
  const favorite = isFavorite(id);

  return (
    <button
      className={styles.favorite_button}
      onClick={() => toggleFavoriteHero(id)}
    >
      <img
        src={favorite ? "/assets/favorito_01.svg" : "/assets/favorito_02.svg"}
        width={size}
        height={size}
      />
    </button>
  );
};

export default FavoriteButton;
