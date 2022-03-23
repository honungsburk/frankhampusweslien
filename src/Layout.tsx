import {
  Center,
  HStack,
  Link,
  Flex,
  Box,
  Spacer,
  Text,
  Icon,
  useBreakpointValue,
  Alert,
  VStack,
  AlertIcon,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Link as ReachLink, Outlet } from "react-router-dom";
import * as Icons from "./Components/Icons";
import React from "react";

export default function Layout() {
  const [isHealthy, setIsHealthy] = React.useState(true);

  return (
    <Flex direction="column" minH="100vh">
      <VStack w="full">
        {isHealthy ? <></> : <BackendIsDown />}
        <Box w="full">
          <Header />
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

function Header(props: {}) {
  const layout: "vertical" | "horizontal" | undefined = useBreakpointValue({
    base: "vertical",
    sm: "horizontal",
  });

  return (
    <Container maxW="container.xl">
      <Flex p={2} align={"center"}>
        <Logo></Logo>
        <Spacer />
        <HStack spacing={4}>
          <HeaderLink to="/home#projects">Projects</HeaderLink>
          <HeaderLink to="/work">Work</HeaderLink>
          <HeaderLink to="/home#about">About</HeaderLink>
          <HeaderLink to="/faq">FAQ</HeaderLink>
          <HeaderLink to="/art">Art</HeaderLink>
        </HStack>
      </Flex>
    </Container>
  );
}

function HeaderLink(props: { children: string; to: string }) {
  return (
    <Link as={ReachLink} to={props.to}>
      <Text fontWeight={"bold"}>{props.children.toUpperCase()}</Text>
    </Link>
  );
}

function Logo() {
  return (
    <Center>
      <Link as={ReachLink} to="/home">
        <Text> LOGO</Text>
        {/* <AtomicSwapLogo boxSize="48px" /> */}
      </Link>
    </Center>
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
