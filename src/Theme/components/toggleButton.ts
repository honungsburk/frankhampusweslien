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

    let bg = c ? `${c}.500` : "black";
    let color = textColor(theme, bg);

    if (!isToggled) {
      bg = "none";
      color = "black";
    }

    return {
      px: 2,
      py: 1,
      border: "2px solid",
      borderColor: "black",
      cursor: "pointer",
      bg: bg,
      color: color,
      ...textStyles.button,
    };
  },
  // The default size and variant values
  defaultProps: {},
};

export default toggleButton;
