import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IFulfilment {
  title: string;
  content: string;
  link: string;
}

const FulfilmentTab = ({ fulfilment }: { fulfilment: IFulfilment }) => {
  return (
    <Link to={`/fulfillment/${fulfilment.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {fulfilment.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {fulfilment.content}
        </Text>
      </Box>
    </Link>
  );
};

export default FulfilmentTab;
