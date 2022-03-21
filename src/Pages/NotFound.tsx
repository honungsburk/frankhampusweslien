import { Center, Heading, Spacer, VStack } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <>
      <Spacer></Spacer>
      <Center>
        <VStack>
          <Heading size={"xl"}>404 - Page Not Found</Heading>
        </VStack>
      </Center>
    </>
  );
}
