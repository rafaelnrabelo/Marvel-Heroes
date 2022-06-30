import type { NextPage } from "next";
import Head from "next/head";

import HomeHeader from "../components/HomeHeader";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Marvel</title>
      </Head>

      <main>
        <HomeHeader />
      </main>
    </>
  );
};

export default Home;
