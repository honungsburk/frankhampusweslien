import { VStack, Image } from "@chakra-ui/react";
import refImage from "../assets/tmp/Tiny_Tsunami_Thumb_Nail.jpg";

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
    <VStack>
      <Image src={props.src} layerStyle="border-md" />
    </VStack>
  );
}
