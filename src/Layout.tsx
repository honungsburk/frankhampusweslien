import {
  HStack,
  Link,
  Flex,
  Box,
  Spacer,
  Icon,
  useBreakpointValue,
  Alert,
  VStack,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReachLink, Outlet } from "react-router-dom";
import * as Icons from "./Components/Icons";
import TopNav from "./Components/TopNav";
import React from "react";
import { BasicWallet } from "cardano-web-bridge-wrapper";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

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

function Footer() {
  const layout: "vertical" | "horizontal" | undefined = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  });

  const iconColor = useColorModeValue("black", "white");

  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      pt="4"
      pb={layout === "vertical" ? "20" : "4"}
      px={{ base: "4", md: "8" }}
    >
      <HStack>
        <Link href="https://discord.gg/ZqpN4TuJ6a" target="_blank">
          <Icon w={8} h={8} color={iconColor} as={Icons.Discord} />
        </Link>
        <Link href="https://twitter.com/HampusFrank" target="_blank">
          <Icon w={8} h={8} color={iconColor} as={Icons.Twitter} />
        </Link>
      </HStack>
    </Box>
  );
}
