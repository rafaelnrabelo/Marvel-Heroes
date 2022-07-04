import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import analyze from "rgbaster";

import { api } from "../../services/api";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { Hero, HeroResponse } from "../../interfaces/Hero";

import HeroHeader from "../../components/HeroHeader";
import HeroInfo from "../../components/HeroInfo";
import { HeroComics, HeroComicsResponse } from "../../interfaces/Comics";
import ComicsList from "../../components/ComicsList";

interface HeroProps {
  hero: Hero;
  comics: HeroComics[];
  lastComicDate: string;
}

const Hero: NextPage<HeroProps> = ({ hero, comics, lastComicDate }) => {
  const { showSnackbar } = useSnackbar();
  const [dominantColor, setDominantColor] = useState("150, 150, 150");

  useEffect(() => {
    getHeroBackground();
  }, [hero]);

  const getHeroBackground = async () => {
    try {
      const colors = await analyze(
        `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
        {
          ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
          skipTransparentPixels: true,
        }
      );
      const color = colors[0].color.replace("rgb(", "").replace(")", "");

      setDominantColor(color);
    } catch (error) {
      showSnackbar("Erro ao definir cor de fundo do herói.");
    }
  };

  return (
    <>
      <Head>
        <title>{`${hero.name} | Marvel`}</title>
      </Head>

      <main
        className="page_container"
        style={{ backgroundColor: `rgba(${dominantColor}, 0.15)` }}
      >
        <HeroHeader />
        <HeroInfo
          hero={hero}
          lastComicDate={new Date(lastComicDate)}
          dominantColor={dominantColor}
        />
        <ComicsList comics={comics} />
      </main>
    </>
  );
};

export default Hero;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  try {
    const responseHero = await api.get<HeroResponse>(`characters/${id}`);
    const responseComics = await api.get<HeroComicsResponse>(
      `characters/${id}/comics`,
      {
        params: {
          orderBy: "-onsaleDate",
          limit: 10,
        },
      }
    );

    const comics: HeroComics[] = responseComics.data.data.results.map(
      (comic) => ({
        id: comic.id,
        title: comic.title,
        thumbnail: {
          extension: comic.thumbnail.extension,
          path: comic.thumbnail.path,
        },
        dates: comic.dates,
      })
    );

    const { results } = responseHero.data.data;
    const selectedHero = results[0];

    const hero: Hero = {
      id: selectedHero.id,
      name: selectedHero.name,
      description: selectedHero.description,
      modified: selectedHero.modified,
      thumbnail: {
        extension: selectedHero.thumbnail.extension,
        path: selectedHero.thumbnail.path,
      },
      comics: {
        available: selectedHero.comics.available,
      },
      events: {
        available: selectedHero.events.available,
      },
    };

    let lastComicDate = hero.modified;
    if (comics.length > 0 && comics[0]?.dates.length > 0) {
      const dateObject =
        comics[0].dates.find((d) => d.type === "onsaleDate") ||
        comics[0].dates[0];
      lastComicDate = dateObject?.date;
    }

    return {
      props: { hero, comics, lastComicDate },
      revalidate: 60 * 60 * 24, // 1 dia
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
