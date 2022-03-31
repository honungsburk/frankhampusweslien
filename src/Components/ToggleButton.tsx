import { Center, BoxProps, useStyleConfig } from "@chakra-ui/react";

type ToggleButtonProps = {
  isToggled: boolean;
  onToggle: () => void;
  colorScheme?: string;
} & BoxProps;

export default function ToggleButton(props: ToggleButtonProps): JSX.Element {
  const { children, onToggle, isToggled, colorScheme, ...rest } = props;
  const styles = useStyleConfig("ToggleButton", {
    colorScheme: colorScheme,
    isToggled: isToggled,
  });

  return (
    <Center userSelect="none" onClick={onToggle} __css={styles} {...rest}>
      {children}
    </Center>
  );
}
