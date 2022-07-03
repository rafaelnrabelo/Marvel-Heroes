import ComicCard from "./ComicCard";
import styles from "./ComicsList.module.scss";
import { HeroComics } from "../../interfaces/Comics";

interface ComicsListProps {
  comics: HeroComics[];
}

const ComicsList: React.FC<ComicsListProps> = ({ comics }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Últimos lançamentos</h2>
        <div className={styles.grid}>
          {comics.map((comic) => (
            <ComicCard
              key={comic.id}
              title={comic.title}
              image={`${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComicsList;
