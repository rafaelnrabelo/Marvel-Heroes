import styles from "./HeroesList.module.scss";

import ListHeader from "./ListHeader";

const HeroesList: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <ListHeader />
      </div>
    </div>
  );
};

export default HeroesList;
