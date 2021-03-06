import {
  VStack,
  Image,
  Center,
  Text,
  Flex,
  HStack,
  Spacer,
  Link,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spinner,
  Tooltip,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import * as Icons from "../Components/Icons";
import ReactMarkdown from "react-markdown";
import * as ArtworkT from "../Types/Artwork";
import { mimeFromSrc } from "../Types/Mime";
import { prettyResolution, Resolution } from "../Types/Resolution";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import * as firebase from "../firebase";
import { ref, StorageReference } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import * as CardanoUtil from "../Cardano/Util";
import { SaleTag } from "../Components/SaleTag";
import FirestoreMedia from "../Components/FirestoreMedia";

export default function Artwork(): JSX.Element {
  const { id } = useParams();
  const [snapshot, loading, error] = useDocument(
    doc(firebase.db, "art", id ? id : "missing")
  );

  let content = <></>;

  if (error) {
    content = (
      <VStack>
        <Text textStyle={"h2"}>Error</Text>
        <Text textStyle={"body"}>error.message</Text>
      </VStack>
    );
  } else if (loading) {
    content = (
      <VStack>
        <Spinner color="black" size="xl" thickness="8px" />
        <Text textStyle={"body-bold"}>LOADING ART</Text>
      </VStack>
    );
  } else if (snapshot) {
    const artworkData = snapshot.data() as ArtworkT.Artwork | undefined;
    if (artworkData) {
      content = (
        <SimpleGrid
          spacing={12}
          alignItems={"start"}
          maxW={["90%", null, "80%"]}
          maxH={"80%"}
          columns={[1, null, null, 2]}
        >
          <ImageArea
            src={artworkData.src}
            tags={generateImageTags(artworkData)}
            resolution={
              artworkData.resolution
                ? artworkData.resolution
                : { x: 2000, y: 2000 }
            }
          />
          <InfoArea artworkData={artworkData} />
        </SimpleGrid>
      );
    } else {
      content = (
        <VStack>
          <Text textStyle={"h2"}>Error</Text>
          <Text textStyle={"body"}>Couldn't find any data for object {id}</Text>
        </VStack>
      );
    }
  }

  return <Center mt={16}>{content}</Center>;
}

////////////////////////////////////////////////////////////////////////////////
// Image Area
////////////////////////////////////////////////////////////////////////////////

function ImageArea(props: {
  src: string;
  tags: string[];
  resolution: Resolution;
}): JSX.Element {
  return (
    // width="fit-content"
    <VStack spacing={0}>
      <FirestoreMedia
        storageRef={ref(firebase.storage, ArtworkT.lowResSrc(props.src))}
        layerStyle="border-lg"
        width={"100%"}
        height={"100%"}
        muted
        loop
      />
      <Flex width="100%">
        <Center>
          <HStack>
            {props.tags.map((s) => (
              <ImageTag key={s}>{s}</ImageTag>
            ))}
          </HStack>
        </Center>
        <Spacer />
        <Center>
          <DownloadButton storageRef={ref(firebase.storage, props.src)} />
        </Center>
      </Flex>
    </VStack>
  );
}

function ImageTag(props: { children: string }): JSX.Element {
  return (
    <Center bg="black" px="1" py="0.5">
      <Text color="white" textStyle="xsmall">
        {props.children}
      </Text>
    </Center>
  );
}

function ErrorIcon(props: { error: string }): JSX.Element {
  return (
    <Tooltip label={props.error}>
      <Icons.Error />
    </Tooltip>
  );
}

function DownloadButton(props: { storageRef: StorageReference }): JSX.Element {
  const [value, loading, error] = useDownloadURL(props.storageRef);

  if (error) {
    return <ErrorIcon error={error.message} />;
  } else if (loading) {
    return <Spinner size={"sm"} color="black" thickness="2px"></Spinner>;
  } else {
    return (
      <Link
        href={value}
        download
        isExternal
        aria-label="Download full resolution image"
      >
        <Icons.Download boxSize={"8"} />
      </Link>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////
// Info Area
////////////////////////////////////////////////////////////////////////////////

function generateImageTags(artworkData: ArtworkT.Artwork): string[] {
  const result = [];

  if (artworkData.resolution) {
    const res = prettyResolution(artworkData.resolution);
    result.push(res);
  }

  const mime = mimeFromSrc(artworkData.src);
  if (mime) {
    result.push(mime);
  }

  return result;
}

function InfoArea(props: { artworkData: ArtworkT.Artwork }): JSX.Element {
  return (
    <VStack alignItems={"start"}>
      <VStack alignItems={"start"} spacing={-2} width={"100%"}>
        <Flex width={"100%"} alignItems="center">
          <Text textStyle={"h2"}>
            {props.artworkData.name}{" "}
            {props.artworkData.communityName
              ? "(" + props.artworkData.communityName + ")"
              : ""}
          </Text>
          <Spacer />
          <SaleTag saleInfo={props.artworkData.saleInfo} size="lg" />
        </Flex>
        <Text textStyle={"body"}>{props.artworkData.collection}</Text>
      </VStack>
      <Tabs variant="brutalist" colorScheme={"tertiary"}>
        <TabList>
          <Tab>ABOUT</Tab>
          <Tab>METADATA</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Markup>
              {props.artworkData.description
                ? props.artworkData.description
                : ArtworkT.collectionDescription(props.artworkData)}
            </Markup>
          </TabPanel>
          <TabPanel overflowX={"auto"} maxW={["90vw", null, null, "45vw"]}>
            <MetadataTab artworkData={props.artworkData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}

function Markup(props: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => (
          <Text textStyle={"body-bold"} as="span">
            {children}
          </Text>
        ),
        p: ({ children }) => <Text textStyle={"body"}>{children}</Text>,
        a: (props) => {
          return (
            <Link
              href={props.href}
              textStyle={"body-link"}
              color={"tertiary.500"}
              target={"_blank"}
            >
              {props.children}
            </Link>
          );
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
}

function MetadataTab(props: { artworkData: ArtworkT.Artwork }): JSX.Element {
  return (
    <VStack alignItems={"start"} spacing={4}>
      <MetadataSection name={"General"}>
        <MetadataEntry
          name={"collection"}
          value={props.artworkData.collection}
        />
        <MetadataEntry name={"name"} value={props.artworkData.name} />
        {props.artworkData.communityName ? (
          <MetadataEntry
            name={"community name"}
            value={props.artworkData.communityName}
          />
        ) : (
          <></>
        )}
        {props.artworkData.resolution ? (
          <>
            <MetadataEntry
              name={"width"}
              value={props.artworkData.resolution.x.toString() + " px"}
            />
            <MetadataEntry
              name={"height"}
              value={props.artworkData.resolution.y.toString() + " px"}
            />
          </>
        ) : (
          <></>
        )}
        <MetadataEntry
          name={"created"}
          value={props.artworkData.createdAt
            .toDate()
            .toLocaleDateString("sv-SV", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
        />
      </MetadataSection>
      {props.artworkData.token ? (
        <TokenMetadataSection token={props.artworkData.token} />
      ) : (
        <></>
      )}
    </VStack>
  );
}

function TokenMetadataSection(props: { token: ArtworkT.Token }): JSX.Element {
  const policyID = props.token.policyID;
  const assetName = props.token.assetName;
  const fingerPrint = CardanoUtil.assetFingerprint(
    policyID,
    assetName
  ).fingerprint();

  return (
    <>
      <MetadataSection name={"Token"}>
        <MetadataEntry
          name={"policyID"}
          href={`https://cardanoscan.io/tokenPolicy/${policyID}`}
          value={policyID}
        />
        <MetadataEntry
          name={"assetName"}
          href={`https://cardanoscan.io/token/${policyID}.${assetName}`}
          value={assetName}
        />
        <MetadataEntry
          name={"assetID"}
          href={`https://cardanoscan.io/token/${fingerPrint}`}
          value={fingerPrint}
        />
      </MetadataSection>
      <MetadataSection name={"Files"}>
        <>
          <FileSection
            name={props.token.onChainMetadata.name}
            image={props.token.onChainMetadata.image}
            mediaType={props.token.onChainMetadata.mediaType}
          />
          {props.token.onChainMetadata.files.map((file) => (
            <FileSection
              key={file.src}
              name={file.name}
              image={file.src}
              mediaType={file.mediaType}
            />
          ))}
        </>
      </MetadataSection>
    </>
  );
}

function FileSection(props: {
  name: string;
  image: string;
  mediaType: string;
}): JSX.Element {
  return (
    <MetadataSection name={props.name}>
      <MetadataEntry name={"image"} value={props.image} />
      <MetadataEntry name={"media type"} value={props.mediaType} />
    </MetadataSection>
  );
}

function MetadataSection(props: {
  name: string;
  children: (JSX.Element | string) | JSX.Element[];
}): JSX.Element {
  return (
    <VStack alignItems={"start"}>
      <Text textStyle={"body-bold"}>{props.name}</Text>
      <VStack pl={4} alignItems={"start"}>
        {props.children}
      </VStack>
    </VStack>
  );
}

function MetadataEntry(props: {
  name: string;
  value: string;
  href?: string;
}): JSX.Element {
  return (
    <HStack spacing={8}>
      <Text textStyle={"body"} width={"120px"}>
        {props.name}
      </Text>
      {props.href ? (
        <HStack color={"tertiary.500"}>
          <Link textStyle={"link"} href={props.href} isExternal>
            {props.value}
          </Link>
          <Icons.External />
        </HStack>
      ) : (
        <Text textStyle={"body"}>{props.value}</Text>
      )}
    </HStack>
  );
}
