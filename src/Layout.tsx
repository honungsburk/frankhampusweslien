import { Flex, Box, Spacer, Alert, VStack, AlertIcon } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import TopNav from "./Components/TopNav";
import React from "react";
import { BasicWallet } from "cardano-web-bridge-wrapper";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";
import Footer from "./Components/Footer";

export default function Layout(props: {
  wallet?: BasicWallet;
  onWalletDisconnect: (wallet: BasicWallet) => void;
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}) {
  const [isHealthy, setIsHealthy] = React.useState(true);

  return (
    <Flex direction="column" minH="100vh">
      <VStack w="full">
        {isHealthy ? <></> : <BackendIsDown />}
        <Box w="full">
          <TopNav
            variant="background"
            wallet={props.wallet}
            onWalletDisconnect={props.onWalletDisconnect}
            onWalletChange={props.onWalletChange}
            lib={props.lib}
          />
        </Box>
      </VStack>
      <Outlet />
      <Spacer />
      <Footer />
    </Flex>
  );
}

function BackendIsDown() {
  return (
    <Alert status="error" variant="solid">
      <AlertIcon />
      The server is down! The site will not function properly.
    </Alert>
  );
}
