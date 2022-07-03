import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import analyze from "rgbaster";

import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useSnackbar } from "../../contexts/SnackbarContext";
import styles from "../../styles/Hero.module.scss";

import HeroHeader from "../../components/HeroHeader";
import Loading from "../../components/Loading";
import HeroInfo from "../../components/HeroInfo";

import { Hero, HeroResponse } from "../../interfaces/Hero";

const Hero: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { showSnackbar } = useSnackbar();

  const [dominantColor, setDominantColor] = useState("150, 150, 150");
  const [hero, setHero] = useState<Hero>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getHero();
    }
  }, [id]);

  const getHero = async () => {
    try {
      setLoading(true);
      const res = await api.get<HeroResponse>(`characters/${id}`);
      const { results } = res.data.data;
      const selectedHero = results[0];

      const colors = await analyze(
        `${selectedHero.thumbnail.path}.${selectedHero.thumbnail.extension}`,
        {
          ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
          skipTransparentPixels: true,
        }
      );
      const color = colors[0].color.replace("rgb(", "").replace(")", "");

      setHero(selectedHero);
      setDominantColor(color);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showSnackbar("Erro ao buscar herói.");
    }
  };

  return (
    <>
      <Head>
        <title>{hero?.name || "Hero"} | Marvel</title>
      </Head>

      <main
        className="page_container"
        style={{ backgroundColor: `rgba(${dominantColor}, 0.15)` }}
      >
        <HeroHeader />
        {loading ? (
          <div className={styles.loading_container}>
            <Loading size="large" />
          </div>
        ) : (
          <HeroInfo hero={hero} dominantColor={dominantColor} />
        )}
      </main>
    </>
  );
};

export default Hero;
