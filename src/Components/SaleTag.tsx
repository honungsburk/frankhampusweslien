import { Tooltip, Center, Text } from "@chakra-ui/react";
import DisplayUnit from "../Components/DisplayUnit";
import { BigNum } from "@emurgo/cardano-serialization-lib-browser";
import * as Artwork from "../Types/Artwork";

export function SaleTag(props: {
  saleInfo?: Artwork.SaleInfo;
  size?: "sm" | "lg";
}): JSX.Element {
  let fontStyle = "body";
  let px = 4;
  let py = 2;

  if (props.size === "sm") {
    fontStyle = "small";
    px = 2;
    py = 1;
  }

  return (
    <Tooltip label={props.saleInfo ? props.saleInfo.status : "Not For Sale"}>
      <Center
        px={px}
        py={py}
        bg={Artwork.saleStatusColor(props.saleInfo?.status)}
      >
        {props.saleInfo ? (
          <DisplayUnit
            quantity={BigNum.from_str(props.saleInfo.price)}
            decimals={6}
            symbol={"₳"}
            hide={true}
            fontStyle={fontStyle}
          />
        ) : (
          <Text fontStyle={fontStyle}>Not&nbsp;For&nbsp;Sale</Text>
        )}
      </Center>
    </Tooltip>
  );
}
