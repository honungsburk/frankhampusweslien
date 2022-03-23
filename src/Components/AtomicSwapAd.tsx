import { BoxProps, Text, Flex, Spacer, Link, Center } from "@chakra-ui/react";
import * as Icons from "./Icons";

export default function AtomicSwapAd(props: BoxProps): JSX.Element {
  return (
    <Link
      width="100%"
      _hover={{}}
      href="https://atomic-swap.io/"
      target="_blank"
    >
      <Flex width="100%" border={"4px"} p={2} {...props}>
        <Center>
          <Text fontWeight={"bold"}>
            AD - ATOMIC SWAP - Trustless Escrow Serive On Cardnao - ONLY 1 ₳ Per
            Swap
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Icons.RightArrow boxSize={8} />
        </Center>
      </Flex>
    </Link>
  );
}
