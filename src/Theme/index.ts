import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import { Dict } from "@chakra-ui/utils";
import input from "./components/input";
import button from "./components/button";

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

const shadows = {
  outline: "0 0 0 2px " + colors.black,
};

export const Theme = extendTheme({
  styles: {
    global: global,
  },
  components: {
    Input: input,
    Button: button,
  },
  colors: colors,
  shadows,
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
  textStyles: {
    "logo-large": {
      fontFamily: "Monoton",
      fontSize: ["48px", "72px"],
      fontWeight: "normal",
      textTransform: "uppercase",
    },
    "logo-small": {
      fontFamily: "Monoton",
      fontSize: ["32px"],
      fontWeight: "normal",
      textTransform: "uppercase",
    },
    button: {
      fontFamily: "Roboto",
      fontSize: ["16px"],
      fontWeight: "bold",
      letterSpacing: "3%",
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: "Roboto",
      fontSize: ["42px"],
      fontWeight: "bold",
      letterSpacing: "-2%",
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: "Roboto",
      fontSize: ["26px"],
      fontWeight: "bold",
      letterSpacing: "-2%",
      textTransform: "uppercase",
    },
    body: {
      fontFamily: "Roboto",
      fontSize: ["16px"],
      fontWeight: "normal",
      lineHeight: "140%",
    },
    "body-bold": {
      fontFamily: "Roboto",
      fontSize: ["16px"],
      fontWeight: "bold",
      lineHeight: "140%",
    },
    small: {
      fontFamily: "Roboto",
      fontSize: ["14px"],
      fontWeight: "normal",
    },
    "small-bold": {
      fontFamily: "Roboto",
      fontSize: ["14px"],
      fontWeight: "bold",
    },
    xsmall: {
      fontFamily: "Roboto",
      fontSize: ["10px"],
      fontWeight: "normal",
      letterSpacing: "3%",
    },
    "xsmall-bold": {
      fontFamily: "Roboto",
      fontSize: ["10px"],
      fontWeight: "bold",
      letterSpacing: "3%",
    },
  },
});

export default Theme;
