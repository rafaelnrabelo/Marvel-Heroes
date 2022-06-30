import Image from "next/image";
import { useRef } from "react";

import styles from "./SearchBar.module.scss";

const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container} onClick={() => inputRef.current?.focus()}>
      <Image
        src="/assets/ic_busca.svg"
        width={29}
        height={29}
        objectFit="contain"
      />
      <input
        type="text"
        placeholder="Procure por heróis"
        className={styles.search_input}
        ref={inputRef}
      />
    </div>
  );
};

export default SearchBar;
