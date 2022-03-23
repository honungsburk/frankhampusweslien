import {
  VStack,
  Container,
  Text,
  Center,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import React from "react";

export default function Work(): JSX.Element {
  return (
    <Container maxW={"container.md"} mt="8">
      <VStack alignItems={"start"} spacing="8">
        <DownloadCV />
        <CVSection>
          <CVHeading>Profile</CVHeading>
          <Text>
            I have a diverse skill set that covers most aspects of application
            development. Everything from backend and frontend programming, the
            designing of both UI and logos, to UX and user interviews.
          </Text>
        </CVSection>
        <CVSection>
          <CVHeading>Skills</CVHeading>
          <Text>
            Haskell, Java, Elm, Typescript, React, Graph Databases, Git,
            Firebase, Cardano, Blockchain, AI, Neural Networks, Figma
          </Text>
        </CVSection>
        <CVSection>
          <CVHeading>Experience</CVHeading>
          <CVExperience
            company="Self Employed"
            title="Artist/Developer"
            location="Lund"
            start="july 2021"
            end="present"
          />
          <CVExperience
            company="Infrasight Labs"
            title="Backend Developer"
            location="Malmö"
            start="january 2020"
            end="december 2020"
          />
        </CVSection>
        <CVSection>
          <CVHeading>Education</CVHeading>
          <CVExperience
            company="Lunds Tekniska Högskola"
            title="Master of Science in Engineering, Computer Science and Engineering"
            start="AUGUST 2016"
            end="JUNI 2021"
          />
        </CVSection>
      </VStack>
    </Container>
  );
}

function CVExperience(props: {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
}): JSX.Element {
  return (
    <VStack alignItems={"start"} spacing={0}>
      <HStack>
        <Text fontWeight={"bold"}>
          {props.company}
          {props.location ? ", " + props.location : ""}
        </Text>
        <Text>-</Text>
        <Text fontStyle={"italic"}>{props.title}</Text>
      </HStack>
      <Text>
        {props.start.toUpperCase()} - {props.end.toUpperCase()}
      </Text>
    </VStack>
  );
}

function DownloadCV(): JSX.Element {
  return (
    <Link
      href="https://drive.google.com/drive/folders/1Lqw569wZTm4MrrIP19nnZZQCnlV4MbFk?usp=sharing"
      _hover={{}}
      target="_blank"
    >
      <Center bg="secondary.100" border="2px" px={2}>
        <Text fontWeight={"bold"}>DOWNLOAD CV</Text>
      </Center>
    </Link>
  );
}

function CVSection(props: {
  children: JSX.Element | string | (string | JSX.Element)[];
}): JSX.Element {
  return <VStack alignItems={"start"}>{props.children}</VStack>;
}

function CVHeading(props: { children: string }): JSX.Element {
  return <Heading>{props.children}</Heading>;
}
