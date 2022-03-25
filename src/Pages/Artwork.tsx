import {
  VStack,
  Image,
  Center,
  Text,
  Flex,
  HStack,
  Spacer,
  Link,
} from "@chakra-ui/react";
import refImage from "../assets/tmp/Tiny_Tsunami_Thumb_Nail.jpg";
import * as Icons from "../Components/Icons";

export default function Artwork(): JSX.Element {
  return (
    <ImageArea
      src={refImage}
      tags={["image/jpeg", "3000px by 4000px"]}
      downloadSrc={refImage}
    />
  );
}

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
