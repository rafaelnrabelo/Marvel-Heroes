import Link from "next/link";
import { useEffect } from "react";

import { useHeroes } from "../../contexts/HeroesContext";
import Loading from "../Loading";
import styles from "./SearchHeroesList.module.scss";

interface SearchHeroesListProps {
  show: boolean;
}

const SearchHeroesList: React.FC<SearchHeroesListProps> = ({ show }) => {
  const { heroes, getHeroes, loading, search } = useHeroes();

  useEffect(() => {
    if (heroes.length === 0 && !loading && !search) {
      getHeroes();
    }
  }, []);

  if (show) {
    return (
      <div className={styles.heroes_list_container}>
        {loading ? (
          <div className={styles.loading_container}>
            <Loading size="small" />
          </div>
        ) : (
          <>
            {heroes.map((hero) => (
              <Link href={`/hero/${hero.id}`} key={hero.id}>
                <div className={styles.hero_container}>
                  <img
                    src={`${hero.thumbnail.path}/standard_small.${hero.thumbnail.extension}`}
                    width={65}
                    height={45}
                  />
                  <p>{hero.name}</p>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    );
  }

  return <></>;
};

export default SearchHeroesList;
