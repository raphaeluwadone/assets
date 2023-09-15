import Layout from "../../components/layout";
import { Box, Flex, Text } from "@chakra-ui/react";
import UsersTab from "../../components/usersTab";

const UserManagement = () => {
  const usersTabsList = [
    {
      title: "User Records  ",
      content: "Create and Reorder Menu",
      link: "users/records",
      url: "",
    },
    {
      title: "Roles",
      content: "Set Workflow Management",
      link: "users/roles",
      url: "",
    },
    {
      title: "Movement Records",
      content: "Set Workflow Management",
      link: "users/movement",
      url: "",
    },
  ];

  return (
    <Layout>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              User Management
            </Text>
          </Flex>
        </Box>
        <Flex flexWrap={"wrap"} gap={"4"}>
          {usersTabsList.map((user) => (
            <UsersTab tab={user} />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export default UserManagement;
