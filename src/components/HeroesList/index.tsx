import HeroCard from "./HeroCard";
import styles from "../../styles/HeroesList.module.scss";

import ListHeader from "./ListHeader";
import Loading from "../Loading";
import { useEffect } from "react";
import { useHeroes } from "../../contexts/HeroesContext";

const HeroesList: React.FC = () => {
  const { heroes, getHeroes, loading, showOnlyFavorites, favoriteHeroes } =
    useHeroes();

  useEffect(() => {
    getHeroes();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListHeader />
        {loading && !showOnlyFavorites ? (
          <div className={styles.loading_container}>
            <Loading />
          </div>
        ) : (
          <div className={styles.grid}>
            {(showOnlyFavorites ? favoriteHeroes : heroes).map((hero) => (
              <HeroCard
                key={hero.id}
                id={hero.id}
                name={hero.name}
                image={`${hero.thumbnail.path}/standard_fantastic.${hero.thumbnail.extension}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroesList;
