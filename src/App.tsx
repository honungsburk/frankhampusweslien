import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { BasicWallet } from "cardano-web-bridge-wrapper/lib/BasicWallet";
import { Env } from "./Env";
import PageErrorBoundary from "./Components/ErrorBoundary/PageErrorBoundary";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

import Loading from "./Pages/Loading";
import Layout from "./Layout";

// Lazy load routes to allow for code splitting.
const Home = lazy(() => import("./Pages/Home"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const Work = lazy(() => import("./Pages/Work"));
const Art = lazy(() => import("./Pages/Art"));
const Artwork = lazy(() => import("./Pages/Artwork"));
const FAQ = lazy(() => import("./Pages/FAQ"));

declare global {
  interface Window {
    cardano: any;
  }
}

function App() {
  // ENV
  const [wallet, setWallet] = React.useState<BasicWallet | undefined>(
    undefined
  );

  const env: Env = {
    wallet: wallet,
    changeWallet: setWallet,
  };

  return (
    <PageErrorBoundary>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/home"
            element={
              <PageErrorBoundary>
                <Home
                  wallet={wallet}
                  onWalletDisconnect={(wallet) => setWallet(undefined)}
                  onWalletChange={(wallet) => setWallet(wallet)}
                  lib={CardanoSerializationLib}
                />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/"
            element={
              <PageErrorBoundary>
                <Home
                  wallet={wallet}
                  onWalletDisconnect={(wallet) => setWallet(undefined)}
                  onWalletChange={(wallet) => setWallet(wallet)}
                  lib={CardanoSerializationLib}
                />
              </PageErrorBoundary>
            }
          />
          <Route
            path="/"
            element={
              <Layout
                wallet={wallet}
                onWalletDisconnect={(wallet) => setWallet(undefined)}
                onWalletChange={(wallet) => setWallet(wallet)}
                lib={CardanoSerializationLib}
              />
            }
          >
            <Route
              path="/faq"
              element={
                <PageErrorBoundary>
                  <FAQ />
                </PageErrorBoundary>
              }
            />
            <Route
              path="/art/:id"
              element={
                <PageErrorBoundary>
                  <Artwork />
                </PageErrorBoundary>
              }
            />
            <Route
              path="/art"
              element={
                <PageErrorBoundary>
                  <Art />
                </PageErrorBoundary>
              }
            />
            <Route
              path="/work"
              element={
                <PageErrorBoundary>
                  <Work />
                </PageErrorBoundary>
              }
            />
            <Route
              path="/*"
              element={
                <PageErrorBoundary>
                  <NotFound />
                </PageErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </PageErrorBoundary>
  );
}

export default App;
