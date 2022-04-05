import { Box, HStack, Icon, IconProps, Link } from "@chakra-ui/react";
import * as Icons from "./Icons";

export default function Footer() {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      maxW="7xl"
      pt={{ base: "20", sm: "4" }}
      pb={{ base: "8", sm: "4" }}
      px={{ base: "4", md: "8" }}
    >
      <HStack spacing="4">
        <SocialMediaLink
          href="https://twitter.com/HampusFrank"
          icon={Icons.Twitter}
        />
        <SocialMediaLink
          href="https://github.com/honungsburk"
          icon={Icons.Github}
        />
        <SocialMediaLink
          href="https://www.instagram.com/frankhampusweslien/"
          icon={Icons.Instagram}
        />
        <SocialMediaLink
          href="https://www.youtube.com/channel/UC6fuoBfK8_B_cT35aKuJEgg"
          icon={Icons.Youtube}
        />
        <SocialMediaLink
          href="https://www.linkedin.com/in/frank-hampus-weslien-b81b59197/"
          icon={Icons.LinkedIn}
        />
      </HStack>
    </Box>
  );
}

function SocialMediaLink(props: {
  href: string;
  icon: (props: IconProps) => JSX.Element;
}): JSX.Element {
  return (
    <Link href={props.href} target="_blank">
      <Icon w={8} h={8} color={"black"} as={props.icon} />
    </Link>
  );
}
