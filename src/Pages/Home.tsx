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
  SimpleGrid,
} from "@chakra-ui/react";
import { BasicWallet } from "cardano-web-bridge-wrapper";
import { Link as ReachLink } from "react-router-dom";
import * as Icons from "../Components/Icons";
import TopNav from "../Components/TopNav";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";
import RepeatingImage from "../assets/img/background/circles.png";
import Footer from "../Components/Footer";

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

      <VStack backgroundImage={RepeatingImage} w="100%">
        <AboutMe />
        <Footer />
      </VStack>
    </VStack>
  );
}

function HeroPage() {
  return (
    <VStack>
      <VStack spacing="0">
        <Text textStyle={"logo-large"} textAlign={"center"}>
          frank hampus weslien
        </Text>
        <Text textStyle={"h3"} textAlign={"center"}>
          ANYONE CAN MAKE ART. I DO.
        </Text>
      </VStack>
      <LinkButton href="/art">Explore my art</LinkButton>
    </VStack>
  );
}

const projects: { name: string; description: string; href: string }[] = [
  {
    name: "Atomic Swap",
    description: "A trustless escrow service on Cardano",
    href: "https://atomic-swap.io/",
  },
  {
    name: "Stained Glass",
    description: "Generative art made by subdividing triangles",
    href: "https://github.com/honungsburk/Stained-Glass",
  },
  {
    name: "AlgoMarble",
    description:
      "Algoritmic marbling. Uses noise to create colorfull images with wonderfull texture.",
    href: "https://github.com/honungsburk/AlgoMarble",
  },
  {
    name: "This Website",
    description: "This website is also open-source.",
    href: "https://github.com/honungsburk/frankhampusweslien",
  },
  {
    name: "cardano-web-bridge-wrapper",
    description: "Convenience wrapper for the CIP-30 wallet API.",
    href: "https://github.com/honungsburk/cardano-web-bridge-wrapper",
  },
  {
    name: "motion",
    description: "A simple and colourfull particle simulator.",
    href: "https://github.com/honungsburk/MOTION",
  },
];

function Projects() {
  return (
    <VStack spacing={8} id="projects">
      <Text textStyle={"h2"}>PROJECTS</Text>
      <SimpleGrid spacing={8} columns={[1, null, 2, null, 3]}>
        {projects.map((p) => (
          <Project {...p} />
        ))}
      </SimpleGrid>
      <LinkButton href="https://github.com/honungsburk" isExternal>
        View my github
      </LinkButton>
    </VStack>
  );
}

// function Projects() {
//   return (
//     <VStack spacing={8} id="projects">
//       <Text textStyle={"h2"}>PROJECTS</Text>
//       <VStack spacing={4}>
//         <HStack
//           justifyItems={"center"}
//           justifyContent="space-between"
//           spacing={8}
//         ></HStack>
//         <HStack
//           justifyItems={"center"}
//           justifyContent="space-between"
//           spacing={8}
//         ></HStack>
//       </VStack>
//       <LinkButton href="https://github.com/honungsburk" isExternal>
//         View my github
//       </LinkButton>
//     </VStack>
//   );
// }

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

function Project(props: { name: string; description: string; href: string }) {
  const size: "sm" | "lg" | undefined = useBreakpointValue({
    base: "sm",
    md: "lg",
  });
  return (
    <Link href={props.href} target="_blank" _hover={{}}>
      <Center
        bg="secondary.500"
        layerStyle={"shadow"}
        p="2"
        width={["300px", null, "400px"]}
        height={["112px", null, "150px"]}
        textAlign="center"
      >
        <VStack>
          <Text textStyle="h3">{props.name}</Text>
          {size === "lg" ? (
            <Text textStyle="body">{props.description}</Text>
          ) : (
            <></>
          )}
        </VStack>
      </Center>
    </Link>
  );
}

function AboutMe() {
  const size: "sm" | "lg" | undefined = useBreakpointValue({
    base: "sm",
    md: "lg",
  });
  return (
    <VStack id="about" w="100%" py={16} spacing={8}>
      <Text textStyle="h2">ABOUT Me</Text>
      <SimpleGrid
        justifyItems={"center"}
        spacing={[8, null, 16]}
        columns={[1, null, 2]}
      >
        <VStack maxWidth={"400px"} px={2}>
          <Heading size={"xl"}>Who I am</Heading>
          <Text>
            I am a developer and artist who does everything from deploying
            exiting open source applications such as Atomic Swap to painting
            portraints of friends and family. I mix my love for both in my ever
            growing number of generative art projects.
          </Text>
        </VStack>
        <VStack maxWidth={"400px"} px={2}>
          <Heading size={"xl"}>What I do</Heading>
          <List spacing={1}>
            <WhatIDo>Build open-source software</WhatIDo>
            <WhatIDo>Paint</WhatIDo>
            <WhatIDo>Freelance work</WhatIDo>
            <WhatIDo>Generative art</WhatIDo>
          </List>
        </VStack>
      </SimpleGrid>
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
