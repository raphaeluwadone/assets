import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IPrinter {
  title: string;
  content: string;
  link: string;
}

const PrintingTab = ({ printing }: { printing: IPrinter }) => {
  return (
    <Link to={`/printing/${printing.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {printing.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {printing.content}
        </Text>
      </Box>
    </Link>
  );
};

export default PrintingTab;
