import defaultTheme from "@chakra-ui/theme";
import { selectAnatomy as parts } from "@chakra-ui/anatomy";
import { StyleFunctionProps, PartsStyleFunction } from "@chakra-ui/theme-tools";
import { getColor, mode } from "@chakra-ui/theme-tools";
import colors from "../colors";

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props;
  return {
    focusBorderColor: fc || mode("blue.500", "blue.300")(props),
    errorBorderColor: ec || mode("red.500", "red.300")(props),
  };
}

const variantBrutalist: PartsStyleFunction<typeof parts> = (
  props: StyleFunctionProps
) => {
  const { theme } = props;
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props);

  return {
    field: {
      rounded: "0",
      border: "2px solid",
      borderColor: mode("#000", "#fff")(props),
      bg: "inherit",
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 1px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: "1px solid",
      borderColor: mode("inherit", "whiteAlpha.50")(props),
      bg: mode("gray.100", "whiteAlpha.300")(props),
    },
  };
};

const select = {
  variants: {
    brutalist: variantBrutalist,
  },
  defaultProps: {
    focusBorderColor: colors.secondary[500],
  },
};

export default select;
