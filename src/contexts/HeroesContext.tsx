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

interface GetHeroesParams {
  orderBy: string;
  limit: number;
  nameStartsWith?: string;
}

interface HeroesContextProps {
  loading: boolean;
  heroes: Hero[];
  total: number;
  getHeroes: (search?: string) => void;
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
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [favoriteHeroes, setFavoriteHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const savedFavoriteHeroes = localStorage.getItem("@Marvel/favoriteHeroes");
    if (savedFavoriteHeroes) {
      setFavoriteHeroes(JSON.parse(savedFavoriteHeroes));
    }
  }, []);

  const getHeroes = (search?: string) => {
    setLoading(true);
    const params: GetHeroesParams = {
      orderBy: "name",
      limit: 20,
    };

    if (search) {
      params.nameStartsWith = search;
    }

    api
      .get<HeroResponse>("/characters", { params })
      .then((res) => {
        setLoading(false);
        const { results, total } = res.data.data;
        setTotal(total);
        setHeroes(results);
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
