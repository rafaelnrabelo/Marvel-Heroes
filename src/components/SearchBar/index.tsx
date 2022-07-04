import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { useHeroes } from "../../contexts/HeroesContext";
import styles from "./SearchBar.module.scss";
import SearchHeroesList from "./SearchHeroesList";

interface SearchBarProps {
  heroHeader?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ heroHeader }) => {
  const [showHeroesList, setShowHeroesList] = useState(false);
  const { changeSearch, search } = useHeroes();
  const inputRef = useRef<HTMLInputElement>(null);
  const timeout = useRef<NodeJS.Timeout>();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout.current);

    timeout.current = setTimeout(async () => {
      const newSearch = event.target.value;

      changeSearch(newSearch);
    }, 350);
  };

  return (
    <>
      <div
        className={
          heroHeader
            ? `${styles.container} ${styles.hero_container}`
            : styles.container
        }
        style={
          heroHeader && showHeroesList
            ? { boxShadow: "rgb(0 0 0 / 10%) 0px 5px 10px" }
            : {}
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
          onFocus={() => setShowHeroesList(true)}
          onBlur={() => {
            setTimeout(() => setShowHeroesList(false), 100);
          }}
        />
      </div>
      <SearchHeroesList show={!!heroHeader && showHeroesList} />
    </>
  );
};

export default SearchBar;
