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
  Flex,
  Spacer,
  useBoolean,
} from "@chakra-ui/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { shadows } from "../Theme";
import { Link as ReachLink } from "react-router-dom";
import * as firebase from "../firebase";
import React, { useState } from "react";
import { ref, StorageReference } from "firebase/storage";
import * as Artwork from "../Types/Artwork";
import FirestoreImage from "../Components/FirestoreImage";
import InfiniteScroll from "react-infinite-scroll-component";
import { SaleTag } from "../Components/SaleTag";
import ToggleButton from "../Components/ToggleButton";

const query = collection(firebase.db, "art");

export default function Art(): JSX.Element {
  const { data, thereIsMore, loadMore, error } =
    firebase.usePaginatedCollection(20, query);
  const [forSale, { toggle }] = useBoolean(false);

  const nbrOfColumns = 5;
  const imageSize = 300;

  const dataInRows = makeRows(nbrOfColumns, data);

  return (
    <Center>
      <VStack mt={8} spacing={12}>
        <VStack spacing={8} width={"100%"}>
          <VStack>
            <SearchBar />
            <StatusBar />
          </VStack>
          <VStack width={"100%"}>
            <Flex>
              <Spacer />
              <ToggleButton
                isToggled={forSale}
                onToggle={toggle}
                colorScheme="secondary"
              >
                For Sale
              </ToggleButton>
            </Flex>
            <BlackLine />
          </VStack>
        </VStack>
        <InfiniteScroll
          dataLength={dataInRows.length}
          next={loadMore}
          hasMore={thereIsMore}
          loader={<Spinner color="black" size="xl" thickness="8px" />}
        >
          {dataInRows.map((row, index) => {
            const superKey = row.map((doc) => doc.id).join("");
            return (
              <HStack key={superKey} pb={8} mx={1}>
                {row.map((doc) => {
                  const data = doc.data();
                  return (
                    <ArtCard
                      imageSize={imageSize}
                      to={"./" + doc.id}
                      name={data.name}
                      src={Artwork.thumbNailSrc(data.src)}
                      key={doc.id}
                      tags={data.tags}
                      saleInfo={data.saleInfo}
                    />
                  );
                })}
              </HStack>
            );
          })}
        </InfiniteScroll>
      </VStack>
    </Center>
  );
}

function makeRows<A>(columns: number, list: A[]): A[][] {
  const result = [];

  for (let i = 0; i < list.length; i = i + columns) {
    const row = [];
    for (let j = 0; j < columns; j++) {
      if (i + j < list.length) {
        row.push(list[i + j]);
      }
    }
    result.push(row);
  }

  return result;
}

function BlackLine(): JSX.Element {
  return (
    <Box
      borderBottom={"4px solid"}
      borderColor="black"
      width={"100%"}
      height="1px"
    />
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
  imageSize: number;
  src: string;
  to: string;
  name: string;
  saleInfo?: Artwork.SaleInfo;
  tags: string[];
}): JSX.Element {
  const imageSize = props.imageSize + "px";
  return (
    <Link as={ReachLink} to={props.to} _hover={{}}>
      <VStack
        layerStyle={"border-lg"}
        _hover={{ shadow: shadows.md, cursor: "pointer" }}
      >
        <Box>
          <Box position={"relative"} width="0px" height={"0px"}>
            <Box position={"absolute"} left={"8px"} top={"8px"}>
              <SaleTag saleInfo={props.saleInfo} size="sm" />
            </Box>
          </Box>
          <FirestoreImage
            storageRef={ref(firebase.storage, props.src)}
            borderBottom={"4px"}
            width={imageSize}
            height={imageSize}
          />
        </Box>
        <VStack alignItems={"start"} width="100%" px="2" py="2">
          <Text textStyle={"body-bold"}>{props.name}</Text>
          <HStack>
            {props.tags.map((s, index) => (
              <Text textStyle="xsmall" textTransform={"uppercase"} key={index}>
                "{s}"
              </Text>
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Link>
  );
}
