import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Hero, HeroResponse } from "../interfaces/Hero";
import { api } from "../services/api";
import { useSnackbar } from "./SnackbarContext";

interface GetHeroesAPIParams {
  orderBy: string;
  limit: number;
  nameStartsWith?: string;
  offset: number;
}

interface GetHeroesParams {
  loadMore?: boolean;
  skip?: number;
  filter?: string;
}

interface HeroesContextProps {
  loading: boolean;
  heroes: Hero[];
  total: number;
  offset: number;
  changeSearch: (search: string) => void;
  getHeroes: (params?: GetHeroesParams) => void;
  favoriteHeroes: Hero[];
  toggleFavoriteHero: (heroId: number) => void;
  isFavorite: (heroId: number) => boolean;
  showOnlyFavorites: boolean;
  toggleOnlyFavorites: () => void;
}

interface HeroesProviderProps {
  children: ReactNode;
}

const HeroesContext = createContext({} as HeroesContextProps);

export function HeroesProvider({ children }: HeroesProviderProps) {
  const { showSnackbar } = useSnackbar();

  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);

  const [favoriteHeroes, setFavoriteHeroes] = useState<Hero[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

  useEffect(() => {
    const savedFavoriteHeroes = localStorage.getItem("@Marvel/favoriteHeroes");
    if (savedFavoriteHeroes) {
      setFavoriteHeroes(JSON.parse(savedFavoriteHeroes));
    }
  }, []);

  const changeSearch = (search: string) => {
    setOffset(0);
    setSearch(search);
    getHeroes({ skip: 0, filter: search });
  };

  const getHeroes = (params: GetHeroesParams = {}) => {
    const { loadMore, skip, filter } = params;
    setLoading(true);

    const apiParams: GetHeroesAPIParams = {
      orderBy: "name",
      limit: 20,
      offset: skip !== undefined ? skip : offset,
    };

    if (filter || (search && filter !== "")) {
      apiParams.nameStartsWith = filter || search;
    }

    api
      .get<HeroResponse>("/characters", { params: apiParams })
      .then((res) => {
        setLoading(false);
        setOffset((skip !== undefined ? skip : offset) + 20);

        const { results, total } = res.data.data;

        if (loadMore) {
          setHeroes((oldState) => [...oldState, ...results]);
        } else {
          setHeroes(results);
        }

        setTotal(total);
      })
      .catch((err) => {
        setLoading(false);

        showSnackbar("Não foi possível carregar a lista de heróis");
      });
  };

  const toggleFavoriteHero = (heroId: number) => {
    let newFavorites: Hero[] = [];

    if (!!favoriteHeroes.find((hero) => hero.id === heroId)) {
      newFavorites = favoriteHeroes.filter((hero) => hero.id !== heroId);

      setFavoriteHeroes(newFavorites);
    } else {
      if (favoriteHeroes.length >= 5) {
        showSnackbar("Você não pode favoritar mais de 5 heróis.");
        return;
      }

      const hero = heroes.find((hero) => hero.id === heroId);

      if (hero) {
        newFavorites = [...favoriteHeroes, hero];
        setFavoriteHeroes(newFavorites);
      }
    }

    localStorage.setItem(
      "@Marvel/favoriteHeroes",
      JSON.stringify(newFavorites)
    );
  };

  const isFavorite = (heroId: number) => {
    return !!favoriteHeroes.find((hero) => hero.id === heroId);
  };

  const toggleOnlyFavorites = () => {
    const newValue = !showOnlyFavorites;
    setShowOnlyFavorites(newValue);
  };

  return (
    <HeroesContext.Provider
      value={{
        loading,
        heroes,
        total,
        offset,
        changeSearch,
        getHeroes,
        favoriteHeroes,
        toggleFavoriteHero,
        isFavorite,
        showOnlyFavorites,
        toggleOnlyFavorites,
      }}
    >
      {children}
    </HeroesContext.Provider>
  );
}

export const useHeroes = () => useContext(HeroesContext);
