import {
  Input,
  Center,
  Container,
  HStack,
  BoxProps,
  Text,
  VStack,
  Image,
  Box,
  Link,
} from "@chakra-ui/react";
import refImage from "../assets/tmp/Tiny_Tsunami_Thumb_Nail.jpg";
import { shadows } from "../Theme";
import { Link as ReachLink } from "react-router-dom";

export default function Art(): JSX.Element {
  return (
    <Container mt={8}>
      <VStack>
        <VStack maxW="md">
          <SearchBar />
          <StatusBar />
        </VStack>
        <ArtCard
          src={refImage}
          to="/art/12312"
          name="Tiny Tsunami"
          tags={["Procreate", "Banana", "Japan"]}
        />
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
        <Image src={props.src} borderBottom="4px" />
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
