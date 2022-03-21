import { Icon, IconProps } from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import { BiLinkExternal } from "react-icons/bi";
import { BsLink45Deg } from "react-icons/bs";

// Social Media
export function Discord(props: IconProps) {
  return <Icon {...props} as={FaDiscord} />;
}

export function Youtube(props: IconProps) {
  return <Icon {...props} as={FaYoutube} />;
}

export function Twitter(props: IconProps) {
  return <Icon {...props} as={FaTwitter} />;
}

// Wallet

export function Wallet(props: IconProps) {
  return <Icon {...props} as={IoMdWallet} />;
}

// Util

export function ContentCopy(props: IconProps) {
  return <Icon {...props} as={MdContentCopy} />;
}

export function ExternalIcon(props: IconProps) {
  return <Icon {...props} as={BiLinkExternal} />;
}

export function Link(props: IconProps) {
  return <Icon {...props} as={BsLink45Deg} />;
}
