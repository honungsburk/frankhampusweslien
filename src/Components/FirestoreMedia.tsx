import {
  BoxProps,
  VStack,
  Text,
  Center,
  Box,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { StorageReference } from "firebase/storage";
import { useDownloadURL } from "react-firebase-hooks/storage";
import * as Icons from "../Components/Icons";
import { findFileExtention } from "../Util";

export default function FirestoreMedia(
  props: {
    storageRef: StorageReference;
    loop?: boolean;
    muted?: boolean;
  } & BoxProps
): JSX.Element {
  const { storageRef, loop, muted, ...rest } = props;
  const [value, loading, error] = useDownloadURL(storageRef);

  let content = <></>;

  if (error) {
    content = (
      <VStack>
        <Icons.Error />
        <Text textStyle={"body"}>{error.message}</Text>
      </VStack>
    );
  } else if (value) {
    const ext = findFileExtention(storageRef.name);
    if (ext && isVideoExtention(ext)) {
      content = (
        <video controls loop={loop} muted={muted}>
          <source src={value} type={`video/${ext}`} />
          Your browser does not support the video tag. Update your browser.
        </video>
      );
    } else {
      content = <Image src={value} />;
    }
  } else if (loading) {
    content = <Spinner color="black" size="xl" thickness="4px" speed="1s" />;
  }

  return <Center {...rest}>{content}</Center>;
}

function isVideoExtention(ext: string): boolean {
  const exts = ["mp4", "mkv", "webm"];
  return exts.includes(ext.toLowerCase());
}
