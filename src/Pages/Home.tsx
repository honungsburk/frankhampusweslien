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
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import * as Icons from "../Components/Icons";

export default function Home() {
  const layout: "mobile" | "desktop" | undefined = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  });

  return (
    <>
      <Spacer />
      <Center mt={6} mx={2}>
        <VStack spacing={8}>
          <HeroPage />
          <Projects />
          <AboutMe />
        </VStack>
      </Center>
    </>
  );
}

function HeroPage() {
  return (
    <VStack>
      <Heading fontSize={["3xl", null, "4xl"]} textAlign={"center"}>
        FRANK HAMPUS WESLIEN
      </Heading>

      <Heading fontSize={["xl", null, "2xl"]} textAlign={"center"}>
        ANYONE CAN MAKE ART. I DO.
      </Heading>
    </VStack>
  );
}

function Projects() {
  return (
    <VStack>
      <Heading>PROJECTS</Heading>
      <HStack justifyItems={"center"} justifyContent="space-between">
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
          text="Algoritmic marbling"
          href="https://github.com/honungsburk/AlgoMarble"
        />
      </HStack>
    </VStack>
  );
}

function Project(props: { name: string; text: string; href: string }) {
  return (
    <Link href={props.href} target="_blank" _hover={{}}>
      <Center
        bg="secondary.100"
        border="4px"
        p="2"
        width={"400px"}
        height={"150px"}
        textAlign="center"
      >
        <VStack>
          <Heading>{props.name}</Heading>
          <Text>{props.text}</Text>
        </VStack>
      </Center>
    </Link>
  );
}

function AboutMe() {
  return (
    <VStack>
      <Heading>ABOUT Me</Heading>
      <HStack justifyItems={"center"} justifyContent="space-between">
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
            <WhatIDo>
              Developing and maintaining open-source software for fun and profit
            </WhatIDo>
            <WhatIDo>Paint</WhatIDo>
            <WhatIDo>Freelance work</WhatIDo>
            <WhatIDo>Generative art</WhatIDo>
          </List>
        </VStack>
      </HStack>
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
