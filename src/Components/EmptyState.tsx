import { VStack, Text } from "@chakra-ui/react";

/**
 * The empty state that is used throughout the application
 *
 * @param props
 * @returns
 */
export default function EmptyState(props: { subText?: string }): JSX.Element {
  return (
    <VStack>
      <Text textStyle="h2">EMPTY</Text>
      {props.subText ? (
        <Text textStyle="body-bold">{props.subText}</Text>
      ) : (
        <></>
      )}
    </VStack>
  );
}
