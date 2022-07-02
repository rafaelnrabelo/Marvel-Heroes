import "../styles/globals.scss";
import type { AppProps } from "next/app";

import Footer from "../components/Footer";
import { HeroesProvider } from "../contexts/HeroesContext";
import { SnackbarProvider } from "../contexts/SnackbarContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <HeroesProvider>
        <Component {...pageProps} />
        <Footer />
      </HeroesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
