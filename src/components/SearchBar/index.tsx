import Image from "next/image";
import { ChangeEvent, useRef } from "react";

import { useHeroes } from "../../contexts/HeroesContext";
import styles from "../../styles/SearchBar.module.scss";

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { getHeroes } = useHeroes();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      const search = event.target.value;
      getHeroes(search);
    }, 350);
  };

  return (
    <div className={styles.container} onClick={() => inputRef.current?.focus()}>
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
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
