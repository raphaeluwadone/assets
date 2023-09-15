import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IRequisition {
  title: string;
  content: string;
  link: string;
}

const RequisitionTab = ({ requisition }: { requisition: IRequisition }) => {
  return (
    <Link to={`/requisition/${requisition.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {requisition.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {requisition.content}
        </Text>
      </Box>
    </Link>
  );
};

export default RequisitionTab;
