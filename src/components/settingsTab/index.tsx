import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ISettings {
  title: string;
  content: string;
  link: string;
}

const SettingsTab = ({ setting }: { setting: ISettings }) => {
  return (
    <Link to={`/settings/${setting.link}`}>
      <Box className="req-tab">
        <Text
          borderBottom={"4px"}
          borderColor={"brandRed.100"}
          pb={"5"}
          fontWeight={"bold"}
          fontSize={"xl"}
          color={"black"}
        >
          {setting.title}
        </Text>
        <Text mt={5} fontSize={"sm"}>
          {setting.content}
        </Text>
      </Box>
    </Link>
  );
};

export default SettingsTab;
