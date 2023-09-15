import { Box, Flex, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import SettingsTab from "../../components/settingsTab";

const Settings = () => {
  const settingsList = [
    {
      title: " Menu  ",
      content: "Create and Reorder Menu",
      link: "menu",
      url: "",
    },
    {
      title: "Workflow",
      content: "Set Workflow Management",
      link: "workflow",
      url: "",
    },
  ];
 
  return (
    <Layout>
      <>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Settings
            </Text>
          </Flex>
        </Box>
        <Flex flexWrap={"wrap"} gap={"4"}>
          {settingsList.map((set) => (
            <SettingsTab setting={set} />
          ))}
        </Flex>
      </>
    </Layout>
  );
};

export default Settings;
