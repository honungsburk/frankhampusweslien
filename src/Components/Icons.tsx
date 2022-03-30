import { Icon, IconProps } from "@chakra-ui/react";
import { FaDiscord } from "react-icons/fa";
import {
  FiTwitter,
  FiYoutube,
  FiLinkedin,
  FiInstagram,
  FiGithub,
} from "react-icons/fi";
import { AiFillWallet, AiOutlineDownload } from "react-icons/ai";
import { MdContentCopy } from "react-icons/md";
import {
  BiLinkExternal,
  BiCaretUp,
  BiCaretDown,
  BiRightArrowAlt,
  BiLeftArrowAlt,
  BiErrorAlt,
} from "react-icons/bi";
import { BsLink45Deg, BsCheckCircleFill } from "react-icons/bs";
import { GiUnplugged, GiAchievement } from "react-icons/gi";
import { ImImage } from "react-icons/im";

// Social Media
export function Discord(props: IconProps) {
  return <Icon {...props} as={FaDiscord} />;
}

export function Github(props: IconProps) {
  return <Icon {...props} as={FiGithub} />;
}

export function Youtube(props: IconProps) {
  return <Icon {...props} as={FiYoutube} />;
}

export function LinkedIn(props: IconProps) {
  return <Icon {...props} as={FiLinkedin} />;
}

export function Instagram(props: IconProps) {
  return <Icon {...props} as={FiInstagram} />;
}

export function Twitter(props: IconProps) {
  return <Icon {...props} as={FiTwitter} />;
}

// Wallet

export function Wallet(props: IconProps) {
  return <Icon {...props} as={AiFillWallet} />;
}

export function WalletDisconnect(props: IconProps) {
  return <Icon {...props} as={GiUnplugged} />;
}

export function Rewards(props: IconProps) {
  return <Icon {...props} as={GiAchievement} />;
}

// Util

export function Image(props: IconProps) {
  return <Icon {...props} as={ImImage} />;
}

export function Error(props: IconProps) {
  return <Icon {...props} as={BiErrorAlt} />;
}

export function Download(props: IconProps) {
  return <Icon {...props} as={AiOutlineDownload} />;
}

export function ContentCopy(props: IconProps) {
  return <Icon {...props} as={MdContentCopy} />;
}

export function External(props: IconProps) {
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
