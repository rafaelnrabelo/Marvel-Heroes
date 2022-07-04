import HeroCard from "./HeroCard";
import styles from "./HeroesList.module.scss";

import ListHeader from "./ListHeader";
import Loading from "../Loading";
import { useEffect } from "react";
import { useHeroes } from "../../contexts/HeroesContext";

const HeroesList: React.FC = () => {
  const {
    heroes,
    getHeroes,
    loading,
    showOnlyFavorites,
    favoriteHeroes,
    search,
    total,
    offset,
  } = useHeroes();

  useEffect(() => {
    if (heroes.length === 0 && !loading && !search) {
      getHeroes();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListHeader />
        {loading && !showOnlyFavorites && !offset ? (
          <div className={styles.loading_container}>
            <Loading size="large" />
          </div>
        ) : (
          <>
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
            {!showOnlyFavorites && total !== heroes.length && (
              <div className={styles.load_more_container}>
                <button
                  className={styles.load_more}
                  onClick={() => getHeroes({ loadMore: true })}
                  disabled={loading}
                  style={
                    loading
                      ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
                      : {}
                  }
                >
                  Carregar mais
                </button>
                {loading && (
                  <div className={styles.load_more_loading}>
                    <Loading size="small" />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HeroesList;
