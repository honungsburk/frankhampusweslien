import type { StyleFunctionProps } from "@chakra-ui/theme-tools";
import defaultTheme from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";
import { ComponentStyleConfig } from "@chakra-ui/react";

const ghostIconButton = (props: StyleFunctionProps) => {
  return {
    _focus: {
      bg: mode("darken.200", "lighten.200")(props),
    },
    _active: {
      bg: mode("darken.300", "lighten.300")(props),
    },
    _hover: { bg: mode("darken.200", "lighten.200")(props) },
  };
};

const button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: 0,
  },
  variants: {
    ghost: ghostIconButton,
  },
};

export default button;
