import {
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
  Text,
  Image,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import * as CIP30 from "cardano-web-bridge-wrapper/lib/CIP30";
import { BasicWallet } from "cardano-web-bridge-wrapper/lib/BasicWallet";
import colors from "../Theme/colors";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

export default function WalletSelector(props: {
  onWalletChange: (wallet: BasicWallet) => void;
  isOpen: boolean;
  onClose: () => void;
  lib: typeof CardanoSerializationLib;
}) {
  const walletChoices: JSX.Element[] = [];

  for (const property in window.cardano) {
    const api: any = window.cardano[property];
    if (CIP30.isInitalAPI(api)) {
      walletChoices.push(
        <WalletChoice
          lib={props.lib}
          key={api.name}
          api={api}
          onWalletChange={(wallet) => {
            props.onClose();
            props.onWalletChange(wallet);
          }}
        />
      );
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent bgColor={"white"} rounded={0}>
        <ModalHeader>WALLETS</ModalHeader>
        <ModalCloseButton colorScheme={"whiteAlpha"} rounded={0} />
        <ModalBody>
          <VStack width={"fill"}>
            {walletChoices.length > 0 ? walletChoices : <NoWallet />}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function NoWallet() {
  return (
    <VStack>
      <Heading>NO WALLET</Heading>
      <Text>I couldn&apos;t find your wallet!</Text>
    </VStack>
  );
}

function WalletChoice(props: {
  api: CIP30.InitalAPI<any>;
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}) {
  return (
    <Flex
      border={"4px"}
      borderColor="black"
      px={8}
      py={4}
      cursor={"pointer"}
      onClick={async () => {
        const fullAPI = await props.api.enable();
        props.onWalletChange(new BasicWallet(props.api, fullAPI, props.lib));
      }}
      width={"full"}
    >
      <Center>
        <Text fontSize={32} fontWeight={"bold"}>
          {props.api.name.toUpperCase()}
        </Text>
      </Center>
      <Spacer></Spacer>
      <Image width={"40px"} src={props.api.icon}></Image>
    </Flex>
  );
}
