import type { NextPage } from "next";
import Head from "next/head";
import HeroesList from "../components/HeroesList";

import HomeHeader from "../components/HomeHeader";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Marvel</title>
      </Head>

      <main>
        <HomeHeader />
        <HeroesList />
      </main>
    </>
  );
};

export default Home;
