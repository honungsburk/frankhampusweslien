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

export default function FirestoreImage(
  props: { storageRef: StorageReference } & BoxProps
): JSX.Element {
  const { storageRef, ...rest } = props;
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
    content = <Image src={value} />;
  } else if (loading) {
    content = (
      <Center>
        <Spinner color="black" size="xl" thickness="4px" speed="1s" />
      </Center>
    );
  }

  return <Box {...rest}>{content}</Box>;
}
