import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ITab {
  title: string;
  content: string;
  link: string;
}

const UsersTab = ({ tab }: { tab: ITab }) => {
  return (
    <Link to={`/${tab.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {tab.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {tab.content}
        </Text>
      </Box>
    </Link>
  );
};

export default UsersTab;
