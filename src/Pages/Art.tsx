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
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc } from "firebase/firestore";
import { shadows } from "../Theme";
import { Link as ReachLink } from "react-router-dom";
import * as firebase from "../firebase";
import React, { useEffect, useState } from "react";
import { ref, StorageReference } from "firebase/storage";
import * as Artwork from "../Types/Artwork";
import FirestoreMedia from "../Components/FirestoreMedia";
import InfiniteScroll from "react-infinite-scroll-component";
import { SaleTag } from "../Components/SaleTag";
import ToggleButton from "../Components/ToggleButton";
import * as Firestore from "firebase/firestore";
import { ToggleOptionGroup } from "../Components/ToggleGroup";
import EmptyState from "../Components/EmptyState";
import { ArtCounter, artCounterSchema } from "../Types/ArtCounter";

const artCollectionQuery = collection(firebase.db, "art");
const artStatDoc = doc(firebase.db, "application", "art-counter");

const options: {
  display: Artwork.ArtCollection;
  value: Artwork.ArtCollection;
}[] = Artwork.collections.map((v) => {
  return {
    display: v,
    value: v,
  };
});

export default function Art(): JSX.Element {
  const [forSale, { toggle }] = useBoolean(false);
  const [collectionFilter, setCollectionFilter] = useState<
    Artwork.ArtCollection | undefined
  >(undefined);
  const [artQuery, setQuery] =
    useState<Firestore.Query<Firestore.DocumentData>>(artCollectionQuery);
  const { data, thereIsMore, loadMore, error } =
    firebase.usePaginatedCollection(20, artQuery);

  useEffect(() => {
    let newQuery: Firestore.Query<Firestore.DocumentData> = artCollectionQuery;

    // Filter for enabled
    if (forSale) {
      newQuery = Firestore.query(
        newQuery,
        Firestore.where("saleInfo.status", "==", "Available")
      );
    }

    if (collectionFilter) {
      console.log("Collection filter");
      newQuery = Firestore.query(
        newQuery,
        Firestore.where("collection", "==", collectionFilter)
      );
    }

    setQuery(newQuery);
  }, [forSale, collectionFilter]);

  const nbrOfColumnsR = useBreakpointValue([2, null, 3, null, 5]);
  const imageSizeR = useBreakpointValue([200, null, 250, null, 300]);
  const nbrOfColumns = nbrOfColumnsR ? nbrOfColumnsR : 2;
  const imageSize = imageSizeR ? imageSizeR : 200;
  const dataInRows = makeRows(nbrOfColumns, data);

  return (
    <Center>
      <VStack mt={8} spacing={4} minW={"80%"}>
        <VStack spacing={8} width={"100%"}>
          <VStack width={"100%"}>
            <Flex width={"100%"}>
              <ToggleOptionGroup
                options={options}
                onToggle={setCollectionFilter}
              />
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
        <StatusBarActive />
        {dataInRows.length === 0 ? (
          <EmptyState subText="Couldn't find any art matching your query :(" />
        ) : (
          <></>
        )}
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
                      communityName={data.communityName}
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

function StatusBarActive(): JSX.Element {
  const [artStats, artStatsLoading, artStatsErr, snapshot] =
    useDocumentData(artStatDoc);

  let validArtStats: ArtCounter | undefined = undefined;
  let validationError = true;
  try {
    validArtStats = artCounterSchema.validateSync(artStats);
  } catch (err: any) {
    validationError = err;
  }

  if (validArtStats) {
    return (
      <StatusBar
        total={validArtStats.total}
        available={validArtStats.available}
        reserved={validArtStats.reserved}
        sold={validArtStats.sold}
        error={validArtStats.error}
        notForSale={validArtStats.notForSale}
      />
    );
  } else if (artStatsLoading) {
    return (
      <Skeleton>
        <StatusBar
          total={1010}
          available={200}
          reserved={10}
          sold={700}
          error={0}
          notForSale={50}
        />
      </Skeleton>
    );
  } else {
    return <Text textStyle={"body"}>Error: Could not load stats</Text>;
  }
}

function StatusBar(props: {
  total: number;
  available: number;
  reserved: number;
  sold: number;
  error: number;
  notForSale: number;
}): JSX.Element {
  return (
    <HStack>
      <Status bg="accent.600">total: {props.total}</Status>
      <Status bg="success.200">available: {props.available}</Status>
      <Status bg="primary.500">reserved: {props.reserved}</Status>
      <Status bg="secondary.500">Sold: {props.sold}</Status>
      <Status bg="accent.600">not for sale: {props.notForSale}</Status>
      {props.error > 0 ? (
        <Status bg="accent.600">not for sale: {props.notForSale}</Status>
      ) : (
        <></>
      )}
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
  communityName?: string;
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
          <FirestoreMedia
            storageRef={ref(firebase.storage, props.src)}
            borderBottom={"4px"}
            width={imageSize}
            height={imageSize}
          />
        </Box>
        <VStack alignItems={"start"} width="100%" px="2" py="2">
          <Text textStyle={"body-bold"}>
            {props.name}{" "}
            {props.communityName ? "(" + props.communityName + ")" : ""}
          </Text>
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
