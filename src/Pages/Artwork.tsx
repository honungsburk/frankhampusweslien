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
} from "@chakra-ui/react";
import refImage from "../assets/tmp/Tiny_Tsunami_Thumb_Nail.jpg";
import * as Icons from "../Components/Icons";
import ReactMarkdown from "react-markdown";
import * as ArtworkT from "../Types/Artwork";
import { mimeFromSrc } from "../Types/Mime";
import { prettyResolution } from "../Types/Resolution";
import { ReactElement } from "react";

export default function Artwork(): JSX.Element {
  const artworkData: ArtworkT.Artwork = {
    name: "Milk Man",
    thumbNail: refImage,
    lowResSrc: refImage,
    highResSrc: refImage,
    resolution: {
      x: 3000,
      y: 4000,
    },
    collection: "Frank's Fine Figures",
    policyID: "dd04ad427b8c2f76409502907063239518d81ad7415046e170d3da07",
    assetName: "FHWARTMilkMan",
    createdAt: 0,
    onChainMetadata: {
      name: "FHWARTMilkMan",
      image: "ipfs://QmcniBosAY875k2CT6VRHaJUK17hR7VrAsWLwnPh1XmLNp",
      mediaType: "image/jpeg",
      files: [
        {
          src: "ipfs://QmbwK5of4pF6nPiEp2784XyQcgySaY2EQKrY5o2zFz8fsj",
          name: "FHWARTHighResolution",
          mediaType: "image/jpeg",
        },
      ],
    },
  };

  return (
    <Center mt={16}>
      <HStack spacing={8} alignItems={"start"}>
        <ImageArea
          src={artworkData.lowResSrc}
          tags={generateImageTags(artworkData)}
          downloadSrc={artworkData.highResSrc}
        />
        <InfoArea artworkData={artworkData} />
      </HStack>
    </Center>
  );
}

////////////////////////////////////////////////////////////////////////////////
// Image Area
////////////////////////////////////////////////////////////////////////////////

function ImageArea(props: {
  src: string;
  tags: string[];
  downloadSrc: string;
}): JSX.Element {
  return (
    <VStack width="fit-content" spacing={0}>
      <Image src={props.src} layerStyle="border-lg" />
      <Flex width="100%">
        <Center>
          <HStack>
            {props.tags.map((s) => (
              <ImageTag>{s}</ImageTag>
            ))}
          </HStack>
        </Center>
        <Spacer />
        <Center>
          <DownloadButton src={props.downloadSrc} />
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

function DownloadButton(props: { src: string }): JSX.Element {
  return (
    <Link href={props.src} download aria-label="Download full resolution image">
      <Icons.Download boxSize={"8"} />
    </Link>
  );
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

  const mime = mimeFromSrc(artworkData.highResSrc);
  if (mime) {
    result.push(mime);
  }

  return result;
}

function InfoArea(props: { artworkData: ArtworkT.Artwork }): JSX.Element {
  return (
    <VStack alignItems={"start"}>
      <Text textStyle={"h2"}>{props.artworkData.name}</Text>;
      <Tabs variant="brutalist" colorScheme={"tertiary"}>
        <TabList>
          <Tab>ABOUT</Tab>
          <Tab>METADATA</Tab>
        </TabList>
        <TabPanels>
          <TabPanel width={"600px"}>
            <Markup>{ArtworkT.description(props.artworkData)}</Markup>
          </TabPanel>
          <TabPanel width={"600px"}>
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
        a: ({ children }) => (
          <Link textStyle={"body-link"} color={"tertiary.500"} as="span">
            {children}
          </Link>
        ),
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
          value={props.artworkData.createdAt.toString()}
        />
      </MetadataSection>
      <MetadataSection name={"Token"}>
        <MetadataEntry name={"assetName"} value={props.artworkData.assetName} />
        <MetadataEntry name={"policyID"} value={props.artworkData.policyID} />
        <MetadataEntry name={"assetID"} value={"TODO"} />
      </MetadataSection>
      <MetadataSection name={"Files"}>
        <>
          <FileSection
            name={props.artworkData.onChainMetadata.name}
            image={props.artworkData.onChainMetadata.image}
            mediaType={props.artworkData.onChainMetadata.mediaType}
          />
          {props.artworkData.onChainMetadata.files.map((file) => (
            <FileSection
              key={file.src}
              name={file.name}
              image={file.src}
              mediaType={file.mediaType}
            />
          ))}
        </>
      </MetadataSection>
    </VStack>
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

function MetadataEntry(props: { name: string; value: string }): JSX.Element {
  return (
    <HStack spacing={8}>
      <Text textStyle={"body"} width={"100px"}>
        {props.name}
      </Text>{" "}
      <Text textStyle={"body"}>{props.value}</Text>
    </HStack>
  );
}
