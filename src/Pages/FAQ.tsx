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
import AtomicSwapAd from "../Components/AtomicSwapAd";
import * as Icons from "../Components/Icons";

export default function FAQ(): JSX.Element {
  return (
    <Container maxW="container.lg">
      <VStack mt={8} spacing={4}>
        <AtomicSwapAd />
        <FAQItem header="How does buying an NFT work?">
          <Text>
            Everything happens in one transaction. You will pay the requested
            amount of ADA and receive the minted token without any waiting time.
            This is done using multisignatures, a technique I've used when
            building Atomic Swap. This means that it is virtually impossible to
            loose funds or accidentally send the wrong amount. Everything
            happens programatically, and you will be able to confirm that you
            will receive the token you are expecting before signing.
          </Text>
        </FAQItem>
        <FAQItem header="What if a transaction fails?">
          <Text>
            If a transaction would fails nothing happens. Since everything
            happens in one transaction no fund have been moved from your wallet.
          </Text>
        </FAQItem>
        <FAQItem header="Does the NFTs have any utility?">
          <Text>
            Every NFT can be assigned a community name by the current owner that
            is displayed on this website (but it not part of the NFT metadata).
            Collectors can also see their rank based on the number of NFTs they
            own.
          </Text>
          <Text>
            My next collection 'AutoTile' will be in part based on previous NFTs
            and some of the owners will be able to mint NFTs for free (but
            you'll pay for the transaction fee).
          </Text>
        </FAQItem>

        <FAQItem header="Which wallets can I use?">
          <Text>
            Any web wallet that supports the CIP30 wallet bridge api: Nami,
            Flint,
          </Text>
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
