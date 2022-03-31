import { ComponentStyleConfig } from "@chakra-ui/react";
import { textStyles } from "../TextStyles";
import * as ThemeTools from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

function textColor(theme: Dict<any>, color: string): string {
  if (ThemeTools.isDark(color)(theme)) {
    return "white";
  } else {
    return "black";
  }
}

const toggleButton: ComponentStyleConfig = {
  baseStyle: (props) => {
    const { colorScheme: c, isToggled, theme } = props;

    const notToggled = "accent";
    const baseColor = c ? c : "primary";

    let bg = `${baseColor}.500`;
    let hoverbg = `${baseColor}.600`;
    let clickbg = `${baseColor}.700`;
    let color = textColor(theme, bg);

    if (!isToggled) {
      bg = `${notToggled}.500`;
      hoverbg = `${notToggled}.600`;
      clickbg = `${notToggled}.800`;
      color = textColor(theme, bg);
    }

    return {
      px: 2,
      py: 1,
      border: "2px solid",
      borderColor: "black",
      cursor: "pointer",
      bg: bg,
      color: color,
      _hover: {
        bg: hoverbg,
      },
      _active: {
        bg: clickbg,
      },
      ...textStyles.button,
    };
  },
  // The default size and variant values
  defaultProps: {},
};

export default toggleButton;
