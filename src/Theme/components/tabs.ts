import defaultTheme from "@chakra-ui/theme";
import { tabsAnatomy as parts } from "@chakra-ui/anatomy";
import { StyleFunctionProps, PartsStyleFunction } from "@chakra-ui/theme-tools";
import { getColor, mode } from "@chakra-ui/theme-tools";
import colors from "../colors";

const variantBrutalist: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props;
  return {
    tab: {
      borderTopRadius: "0",
      mb: "-2px",
      _selected: {
        border: "2px solid",
        color: mode(`${c}.600`, `${c}.300`)(props),
        borderColor: "black",
        borderBottomColor: mode(`white`, `black`)(props),
      },
    },
    tablist: {
      mb: "-2px",
      borderBottom: "2px solid",
      borderColor: "black",
    },
  };
};

const tabs = {
  variants: {
    brutalist: variantBrutalist,
  },
  defaultProps: {
    focusBorderColor: colors.primary[500],
  },
};

export default tabs;
