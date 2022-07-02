import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.scss";
import HeroesList from "../components/HeroesList";
import HomeHeader from "../components/HomeHeader";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | Marvel</title>
      </Head>

      <main className={styles.page_container}>
        <HomeHeader />
        <HeroesList />
      </main>
    </>
  );
};

export default Home;
