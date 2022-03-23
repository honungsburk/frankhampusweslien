import {
  Input,
  Center,
  Container,
  HStack,
  BoxProps,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function Art(): JSX.Element {
  return (
    <Container mt={8}>
      <VStack maxW="md">
        <SearchBar />
        <StatusBar />
      </VStack>
    </Container>
  );
}

function SearchBar(): JSX.Element {
  return <Input variant="brutalist" placeholder="SEARCH..."></Input>;
}

function StatusBar(): JSX.Element {
  return (
    <HStack>
      <Status bg="accent.600">total: 816</Status>
      <Status bg="success.200">available: 69</Status>
      <Status bg="secondary.100">reserved: 0</Status>
      <Status bg="primary.100">Sold: 700</Status>
      <Status bg="accent.600">not for sale: 14</Status>
    </HStack>
  );
}

function Status(props: BoxProps): JSX.Element {
  const { children, ...rest } = props;
  return (
    <Center px={1} {...rest}>
      <Text textTransform={"uppercase"} fontSize={10} fontWeight={"bold"}>
        {children}
      </Text>
    </Center>
  );
}
