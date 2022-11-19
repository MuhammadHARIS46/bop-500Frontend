import { useSelector } from "@/app/store";
import HeroTextContainer from "@/components/HeroTextContainer";
import KeplerMap from "@/components/Map";
import Head from "next/head";
import { HeroContainer } from "./stylesheet";

function Hero() {
  const { selectedCities } = useSelector((state) => state.bopView);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <HeroContainer>
        <KeplerMap />
        {!!selectedCities.length && <HeroTextContainer />}
      </HeroContainer>
    </>
  );
}

export default Hero;
