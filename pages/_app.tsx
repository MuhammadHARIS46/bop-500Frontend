import AuthCheckWrapperComponent from "@/components/shared/AuthCheckWrapperComponent";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider, EmotionCache } from "@emotion/react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import nProgress from "nprogress";
import { SnackbarProvider } from "notistack";

import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import createEmotionCache from "src/createEmotionCache";
import useScrollTop from "src/hooks/useScrollTop";
import ThemeProvider from "src/theme/ThemeProvider";
import "src/utils/chart";
import client from "../apollo-client";
import store from "../src/app/store";
import "../src/styles/global.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: any;
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  useScrollTop();

  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Demo</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SnackbarProvider
                maxSnack={6}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                autoHideDuration={3000}
              >
                <CssBaseline />
                <AuthCheckWrapperComponent>
                  {getLayout(<Component {...pageProps} />)}
                </AuthCheckWrapperComponent>
              </SnackbarProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
