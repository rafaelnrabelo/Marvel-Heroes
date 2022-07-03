import styles from "../../styles/HeroHeader.module.scss";

import HeroLogo from "./Logo";
import SearchBar from "../SearchBar";

const HeroHeader: React.FC = () => {
  return (
    <header className={styles.container}>
      <HeroLogo />
      <SearchBar heroHeader />
    </header>
  );
};

export default HeroHeader;
