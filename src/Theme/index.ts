import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import { Dict } from "@chakra-ui/utils";
import input from "./components/input";
import button from "./components/button";
import tabs from "./components/tabs";
import { textStyles } from "./TextStyles";
import toggleButton from "./components/toggleButton";
import select from "./components/select";

const global = (props: Dict<any>) => ({
  body: {
    color: mode("black", "white")(props),
    bg: mode("background.light", "background.dark")(props),
  },

  /* Scrollbar */
  // "::-webkit-scrollbar": {
  //   width: "8px",
  // },

  // "::-webkit-scrollbar-track": {
  //   background: mode("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")(props),
  //   borderRadius: "40px",
  // },

  // "::-webkit-scrollbar-thumb": {
  //   borderRadius: "40px",
  //   background: mode("rgba(0, 0, 0, 0.4)", "rgba(255, 255, 255, 0.4)")(props),
  // },

  // "::-webkit-scrollbar-thumb:hover": {
  //   background: mode("rgba(0, 0, 0, 0.7)", "rgba(255, 255, 255, 0.7)")(props),
  // },
});

const privateShadows = {
  outline: "0 0 0 2px " + colors.black,
};

export const shadows = {
  md: "4px 4px 0px #000000",
};

export const Theme = extendTheme({
  styles: {
    global: global,
  },
  components: {
    Input: input,
    Button: button,
    Tabs: tabs,
    ToggleButton: toggleButton,
    Select: select,
  },
  colors: colors,
  privateShadows,
  initialColorMode: "dark",
  useSystemColorMode: false,
  layerStyles: {
    "border-lg": {
      border: "4px solid",
      borderColor: "black",
    },
    "border-md": {
      border: "2px solid",
      borderColor: "black",
    },
    shadow: {
      boxShadow: "4px 4px 0px #000000",
    },
  },
  textStyles: textStyles,
});

export default Theme;
