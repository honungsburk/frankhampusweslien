import { BoxProps, Center, Flex } from "@chakra-ui/react";
import { useState } from "react";

type ToggleGroupProps<A> = {
  options: { display: string; value: A }[];
  onToggle: (value?: A) => void;
};

export function ToggleOptionGroup<A>(props: ToggleGroupProps<A>): JSX.Element {
  const [hasToggle, setHasToggle] = useState<string | undefined>(undefined);

  return (
    <Flex>
      {props.options.map(({ display, value }, index) => {
        const commonProps: BoxProps = {
          px: 2,
          userSelect: "none",
          textStyle: "button",
          cursor: "pointer",
          borderLeft: "2px solid",
          borderTop: "2px solid",
          borderBottom: "2px solid",
          borderColor: "black",
        };

        if (index === props.options.length - 1) {
          commonProps.borderRight = "2px solid";
          commonProps.borderRightColor = "black";
        }

        if (display === hasToggle) {
          return (
            <Center
              onClick={() => {
                props.onToggle(undefined);
                setHasToggle(undefined);
              }}
              bg={"black"}
              color="white"
              _hover={{ color: "secondary.500" }}
              {...commonProps}
            >
              {display}
            </Center>
          );
        } else {
          return (
            <Center
              onClick={() => {
                props.onToggle(value);
                setHasToggle(display);
              }}
              _hover={{ bg: "black", color: "white" }}
              {...commonProps}
            >
              {display}
            </Center>
          );
        }
      })}
    </Flex>
  );
}
