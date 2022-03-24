import {
  Center,
  Heading,
  Spacer,
  VStack,
  useBreakpointValue,
  Link,
  Text,
  HStack,
  ListItem,
  List,
  ListIcon,
  Box,
  Button,
} from "@chakra-ui/react";
import { BasicWallet } from "cardano-web-bridge-wrapper";
import { Link as ReachLink } from "react-router-dom";
import * as Icons from "../Components/Icons";
import TopNav from "../Components/TopNav";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";
import RepeatingImage from "../assets/img/background/circles.png";

export default function Home(props: {
  wallet?: BasicWallet;
  onWalletDisconnect: (wallet: BasicWallet) => void;
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}) {
  const layout: "mobile" | "desktop" | undefined = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  });

  return (
    <VStack spacing={16} width="100%">
      <Box backgroundImage={RepeatingImage} pb={16} w="100%">
        <TopNav
          variant="empty"
          wallet={props.wallet}
          onWalletDisconnect={props.onWalletDisconnect}
          onWalletChange={props.onWalletChange}
          lib={props.lib}
        />
        <HeroPage />
      </Box>

      <Projects />

      <AboutMe />
    </VStack>
  );
}

function HeroPage() {
  return (
    <VStack>
      <Text textStyle={"logo-large"} textAlign={"center"}>
        frank hampus weslien
      </Text>
      <Text textStyle={"h3"} textAlign={"center"}>
        ANYONE CAN MAKE ART. I DO.
      </Text>
    </VStack>
  );
}

function Projects() {
  return (
    <VStack spacing={8}>
      <Text textStyle={"h2"}>PROJECTS</Text>
      <VStack spacing={4}>
        <HStack
          justifyItems={"center"}
          justifyContent="space-between"
          spacing={8}
        >
          <Project
            name={"Atomic Swap"}
            text="A trustless escrow service on Cardano"
            href="https://atomic-swap.io/"
          />
          <Project
            name={"Stained Glass"}
            text="Generative art made by subdividing triangles"
            href="https://github.com/honungsburk/Stained-Glass"
          />
          <Project
            name={"AlgoMarble"}
            text="Algoritmic marbling. Uses noise to create colorfull images with wonderfull texture."
            href="https://github.com/honungsburk/AlgoMarble"
          />
        </HStack>
        <HStack
          justifyItems={"center"}
          justifyContent="space-between"
          spacing={8}
        >
          <Project
            name={"This website"}
            text="This website is also open-source."
            href="https://github.com/honungsburk/frankhampusweslien"
          />
          <Project
            name={"cardano-web-bridge-wrapper"}
            text="Convenience wrapper for the CIP-30 wallet API."
            href="https://github.com/honungsburk/cardano-web-bridge-wrapper"
          />
          <Project
            name={"motion"}
            text="A simple and colourfull particle simulator."
            href="https://github.com/honungsburk/MOTION"
          />
        </HStack>
      </VStack>
      <LinkButton href="https://github.com/honungsburk">
        View my github
      </LinkButton>
    </VStack>
  );
}

function LinkButton(props: {
  href: string;
  children: string;
  isExternal?: boolean;
}): JSX.Element {
  const center = (
    <Center layerStyle={"border-md"} px="4" py="2">
      <Text textStyle="button">{props.children}</Text>
    </Center>
  );
  if (props.isExternal) {
    return (
      <Link href={props.href} target={"_blank"} _hover={{}}>
        {center}
      </Link>
    );
  } else {
    return (
      <Link as={ReachLink} to={props.href} _hover={{}}>
        {center}
      </Link>
    );
  }
}

function Project(props: { name: string; text: string; href: string }) {
  return (
    <Link href={props.href} target="_blank" _hover={{}}>
      <Center
        bg="secondary.500"
        layerStyle={"shadow"}
        p="2"
        width={"400px"}
        height={"150px"}
        textAlign="center"
      >
        <VStack>
          <Text textStyle="h3">{props.name}</Text>
          <Text textStyle="body">{props.text}</Text>
        </VStack>
      </Center>
    </Link>
  );
}

function AboutMe() {
  return (
    <VStack
      backgroundImage={RepeatingImage}
      w="100%"
      pt={16}
      pb={32}
      spacing={8}
    >
      <Text textStyle="h2">ABOUT Me</Text>
      <HStack justifyItems={"center"} spacing={16}>
        <VStack maxWidth={"400px"}>
          <Heading size={"xl"}>Who I am</Heading>
          <Text>
            I am a developer and artist who does everything from deploying
            exiting open source applications such as Atomic Swap to painting
            portraints of friends and family. I mix my love for both in my ever
            growing number of generative art projects.
          </Text>
        </VStack>
        <VStack maxWidth={"400px"}>
          <Heading size={"xl"}>Who I do</Heading>
          <List spacing={1}>
            <WhatIDo>Build open-source software</WhatIDo>
            <WhatIDo>Paint</WhatIDo>
            <WhatIDo>Freelance work</WhatIDo>
            <WhatIDo>Generative art</WhatIDo>
          </List>
        </VStack>
      </HStack>
      <LinkButton href="/work">View my work history</LinkButton>
    </VStack>
  );
}

function WhatIDo(props: {
  children: (string | JSX.Element)[] | string | JSX.Element;
}) {
  return (
    <ListItem>
      <ListIcon as={Icons.WhatIDoItem} color="black" />
      {props.children}
    </ListItem>
  );
}
