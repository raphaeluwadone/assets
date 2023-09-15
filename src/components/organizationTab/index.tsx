import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IOrganization {
  title: string;
  content: string;
  link: string;
}

const OrganizationTab = ({ org }: { org: IOrganization }) => {
  return (
    <Link to={`/organization/${org.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {org.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {org.content}
        </Text>
      </Box>
    </Link>
  );
};

export default OrganizationTab;
