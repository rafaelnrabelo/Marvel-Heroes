import styles from "./HomeHeader.module.scss";

import HomeLogo from "./Logo";
import SearchBar from "../SearchBar";

const HomeHeader: React.FC = () => {
  return (
    <header className={styles.container}>
      <HomeLogo />
      <h1>EXPLORE O UNIVERSO</h1>
      <p>
        Mergulhe no domínio deslumbrante de todos os personagens clássicos que
        você ama - e aqueles que você descobrirá em breve!
      </p>
      <SearchBar />
    </header>
  );
};

export default HomeHeader;
