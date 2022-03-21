import {
  Center,
  Heading,
  Spacer,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";

export default function Home() {
  const layout: "mobile" | "desktop" | undefined = useBreakpointValue({
    base: "mobile",
    lg: "desktop",
  });

  return (
    <>
      <Spacer />
      <Center mt={6} mx={2}>
        <VStack spacing={8}>
          <Heading fontSize={["3xl", null, "4xl"]} textAlign={"center"}>
            Frank Hampus Weslien - a new look
          </Heading>
        </VStack>
      </Center>
    </>
  );
}
