import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { useHeroes } from "../../contexts/HeroesContext";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  heroHeader?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ heroHeader }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { changeSearch, search } = useHeroes();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const newSearch = event.target.value;

      changeSearch(newSearch);
    }, 350);
  };

  return (
    <div
      className={
        heroHeader
          ? `${styles.container} ${styles.hero_container}`
          : styles.container
      }
      onClick={() => inputRef.current?.focus()}
    >
      <Image
        src="/assets/ic_busca.svg"
        width={22}
        height={22}
        objectFit="contain"
      />
      <input
        type="text"
        placeholder="Procure por heróis"
        className={styles.search_input}
        ref={inputRef}
        defaultValue={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
