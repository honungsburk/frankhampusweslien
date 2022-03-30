import {
  Input,
  Center,
  Container,
  HStack,
  BoxProps,
  Box,
  Text,
  VStack,
  Image,
  Spinner,
  Link,
  SimpleGrid,
  ImageProps,
} from "@chakra-ui/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { shadows } from "../Theme";
import { Link as ReachLink } from "react-router-dom";
import * as firebase from "../firebase";
import React from "react";
import { ref, StorageReference } from "firebase/storage";
import * as Artwork from "../Types/Artwork";
import FirestoreImage from "../Components/FirestoreImage";

export default function Art(): JSX.Element {
  const [value, loading, error] = useCollection(collection(firebase.db, "art"));

  let content = <></>;

  if (error) {
    content = (
      <VStack>
        <Text textStyle={"h2"}>Error</Text>
        <Text textStyle={"body"}>{JSON.stringify(error)}</Text>
      </VStack>
    );
  } else if (loading) {
    content = (
      <VStack>
        <Spinner color="black" size="xl" thickness="8px" />
        <Text fontSize={12} fontWeight={"bold"}>
          LOADING...
        </Text>
      </VStack>
    );
  } else if (value) {
    content = (
      <SimpleGrid columns={4} spacing={4}>
        {value.docs.map((doc) => {
          const data = doc.data();
          return (
            <ArtCard
              to={"./" + doc.id}
              name={data.name}
              src={Artwork.thumbNailSrc(data.src)}
              key={doc.id}
              tags={[]}
            />
          );
        })}
      </SimpleGrid>
    );
  }

  return (
    <Container mt={8}>
      <VStack>
        <VStack maxW="md">
          <SearchBar />
          <StatusBar />
        </VStack>
        {content}
      </VStack>
    </Container>
  );
}

function SearchBar(): JSX.Element {
  return <Input variant="brutalist" placeholder="SEARCH..."></Input>;
}

function StatusBar(): JSX.Element {
  return (
    <HStack>
      <Status bg="accent.600">total: 816</Status>
      <Status bg="success.200">available: 69</Status>
      <Status bg="primary.500">reserved: 0</Status>
      <Status bg="secondary.500">Sold: 700</Status>
      <Status bg="accent.600">not for sale: 14</Status>
    </HStack>
  );
}

function Status(props: BoxProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <Center px={1} {...rest}>
      <Text textTransform={"uppercase"} fontSize={10} fontWeight={"bold"}>
        {children}
      </Text>
    </Center>
  );
}

function ArtCard(props: {
  src: string;
  to: string;
  name: string;
  tags: string[];
}): JSX.Element {
  return (
    <Link as={ReachLink} to={props.to} _hover={{}}>
      <VStack
        layerStyle={"border-lg"}
        _hover={{ shadow: shadows.md, cursor: "pointer" }}
      >
        <FirestoreImage
          storageRef={ref(firebase.storage, props.src)}
          borderBottom={"4px"}
          width="100%"
          height={"100%"}
        />
        <VStack alignItems={"start"} width="100%" px="2" py="2">
          <Text textStyle={"body-bold"}>{props.name}</Text>
          <HStack>
            {props.tags.map((s, index) => (
              <Text textStyle="small" textTransform={"uppercase"} key={index}>
                {s}
              </Text>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
}
