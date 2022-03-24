import {
  Container,
  Flex,
  HStack,
  Spacer,
  Link,
  Text,
  Center,
  Icon,
  Image,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { Link as ReachLink } from "react-router-dom";
import * as Icons from "./Icons";
import RepeatingImage from "../assets/img/background/circles.png";
import { BasicWallet } from "cardano-web-bridge-wrapper";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-browser";

export default function TopNav(props: {
  variant: "background" | "empty";
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}): JSX.Element {
  return (
    <Center backgroundImage={RepeatingImage}>
      <Container maxW="container.xl">
        <Flex py={12} align={"center"}>
          <Logo></Logo>
          <Spacer />
          <HStack spacing={4}>
            <HeaderLink to="/home#projects">Projects</HeaderLink>
            <HeaderLink to="/work">Work</HeaderLink>
            <HeaderLink to="/home#about">About</HeaderLink>
            <HeaderLink to="/faq">FAQ</HeaderLink>
            <HeaderLink to="/art">Art</HeaderLink>
            <UnconnectedWallet
              onWalletChange={props.onWalletChange}
              lib={props.lib}
            />
          </HStack>
        </Flex>
      </Container>
    </Center>
  );
}

function HeaderLink(props: { children: string; to: string }) {
  return (
    <Link as={ReachLink} to={props.to}>
      <Text fontWeight={"bold"}>{props.children.toUpperCase()}</Text>
    </Link>
  );
}

function Logo() {
  return (
    <Center>
      <Link as={ReachLink} to="/home">
        <Text> LOGO</Text>
      </Link>
    </Center>
  );
}

function mkWalletIcon(src?: string) {
  return src === undefined ? (
    <Icon fontSize={24} as={Icons.Wallet} />
  ) : (
    <Image width={"32px"} src={src}></Image>
  );
}

function UnconnectedWallet(props: {
  onWalletChange: (wallet: BasicWallet) => void;
  lib: typeof CardanoSerializationLib;
}): JSX.Element {
  return (
    <IconButton
      variant="ghost"
      aria-label="Connect Wallet"
      icon={<Icons.Wallet fontSize={24} />}
    />
  );
}

// function Wallet(props: {
//   wallet?: BasicWallet;
//   onWalletChange: (wallet: BasicWallet) => void;
//   lib?: typeof CardanoSerializationLib;
// }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   if(wallet){

//   }

//   return (
//     <Box>
//       <Menu>
//         <MenuButton
//           px={props.px}
//           aria-label="User Settings"
//           variant="ghost"
//           as={IconButton}
//           icon={mkWalletIcon(props.wallet?.icon())}
//         >
//           INFO
//         </MenuButton>
//         <MenuList>
//           <Link as={ReachLink} to="/settings">
//             <MenuItem icon={<Icons.Settings />}>Settings</MenuItem>
//           </Link>
//           {props.lib !== undefined ? (
//             <MenuItem icon={<Icons.Wallet />} onClick={onOpen}>
//               Connect Wallet
//             </MenuItem>
//           ) : (
//             <></>
//           )}
//           {canInstallPWA ? (
//             <MenuItem icon={<Icons.Install />} onClick={installPWA}>
//               Install
//             </MenuItem>
//           ) : (
//             <></>
//           )}
//         </MenuList>
//       </Menu>
//       {props.lib !== undefined ? (
//         <WalletSelector
//           lib={props.lib}
//           onWalletChange={props.onWalletChange}
//           isOpen={isOpen}
//           onClose={onClose}
//         />
//       ) : (
//         <></>
//       )}
//     </Box>
//   );
// }
