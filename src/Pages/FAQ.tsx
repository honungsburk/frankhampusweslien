import {
  VStack,
  Text,
  Box,
  Collapse,
  Flex,
  Heading,
  Center,
  Spacer,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import * as Icons from "../Components/Icons";

export default function FAQ(): JSX.Element {
  return (
    <Container maxW="container.lg">
      <VStack mt={8}>
        <FAQItem header="is it safe to buy nfts">
          <Text>Totaly, it is super safe</Text>
        </FAQItem>
      </VStack>
    </Container>
  );
}

function FAQItem(props: {
  header: string;
  children: string | JSX.Element | (string | JSX.Element)[];
}): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  const icon = isOpen ? (
    <Icons.CaretDown fontSize={32} />
  ) : (
    <Icons.CaretUp fontSize={32} />
  );

  return (
    <Box
      border={"4px"}
      _hover={{ cursor: "pointer" }}
      px={4}
      overflow="hidden"
      width={"100%"}
      onClick={onToggle}
    >
      <Collapse startingHeight={"60px"} in={isOpen} style={{ width: "100%" }}>
        <Flex height={"60px"}>
          <Center>
            <Heading fontSize={["md", "lg", "2xl"]} textTransform="uppercase">
              {props.header}
            </Heading>
          </Center>
          <Spacer />
          <Center>{icon}</Center>
        </Flex>
        {props.children}
        <Box height={"20px"}></Box>
      </Collapse>
    </Box>
  );
}
