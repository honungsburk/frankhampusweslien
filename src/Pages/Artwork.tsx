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

export default function Artwork(): JSX.Element {
  const artworkData = {
    name: "Milk Man",
    thumbNail: refImage,
    lowResSrc: refImage,
    highResSrc: refImage,
    resolution: {
      x: 3000,
      y: 4000,
    },
    id: "1",
    description: `
**AlgoMarble** is a series of 512 unique generative artworks. Each artwork can be bought as a one-of-a-kind NFT.&nbsp;  
&nbsp;  
The basic idea was to stack layers of noise on top of each other until fantastical textures emerged. 
This is not a completely new idea but can trace its orgin back as far as 1983 with the invention of Perlin noise by Ken Perlin. 
If you want to check out the code you can head over to the [git repo](https://gitlab.com/HampusWeslien/algomarble). 
Where you will also find further explanations and instructions for generating super high resolution images. 
The algorithm uses the name of the artwork as the seed, in this case the seed is '511'.&nbsp;  
&nbsp;  
There is also a [youtube video](https://www.youtube.com/watch?v=q1AVe5wOdR4&feature=youtu.be) that explain the basic idea behind the algorithm.&nbsp;  
&nbsp;  
Some of the images are not made justice when they are made to small. 
If the image looks pixelated I recommend downloading the high resolution image; you find the download link beneath the image.`,
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

type ArtWorkData = {
  name: string;
  thumbNail: string;
  lowResSrc: string;
  highResSrc: string;
  resolution: Resolution;
  id: string;
  description: string;
};

type Resolution = {
  x: number;
  y: number;
};

function generateImageTags(artworkData: ArtWorkData): string[] {
  const mime = mimeType(artworkData.highResSrc);
  const res = prettyResolution(artworkData.resolution);
  if (mime) {
    return [mime, res];
  } else {
    return [res];
  }
}

function prettyResolution(resolution: Resolution): string {
  return resolution.x + "px by " + resolution.y + "px";
}

function mimeType(src: string): string | undefined {
  const re = /(?:\.([^.]+))?$/;

  const extR: RegExpExecArray | null = re.exec(src);
  const ext: string | undefined = extR ? extR[1] : undefined;

  switch (ext?.toLowerCase()) {
    case "jpg":
      return "image/jpg";
    case "jpeg":
      return "image/jpeg";
    case "svg":
      return "image/svg+xml";
    case "png":
      return "image/png";
    default:
      return undefined;
  }
}

function InfoArea(props: { artworkData: ArtWorkData }): JSX.Element {
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
            <Markup>{props.artworkData.description}</Markup>
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

function MetadataTab(props: { artworkData: ArtWorkData }): JSX.Element {
  return <Text>IN PROGRESS!</Text>;
}
