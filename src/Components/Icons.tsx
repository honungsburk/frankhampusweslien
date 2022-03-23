import { Icon, IconProps } from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoMdWallet } from "react-icons/io";
import { MdContentCopy } from "react-icons/md";
import {
  BiLinkExternal,
  BiCaretUp,
  BiCaretDown,
  BiRightArrowAlt,
  BiLeftArrowAlt,
} from "react-icons/bi";
import { BsLink45Deg, BsCheckCircleFill } from "react-icons/bs";

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

export function WhatIDoItem(props: IconProps) {
  return <Icon {...props} as={BsCheckCircleFill} />;
}

export function CaretUp(props: IconProps) {
  return <Icon {...props} as={BiCaretUp} />;
}

export function CaretDown(props: IconProps) {
  return <Icon {...props} as={BiCaretDown} />;
}

export function LeftArrow(props: IconProps) {
  return <Icon {...props} as={BiLeftArrowAlt} />;
}

export function RightArrow(props: IconProps) {
  return <Icon {...props} as={BiRightArrowAlt} />;
}
