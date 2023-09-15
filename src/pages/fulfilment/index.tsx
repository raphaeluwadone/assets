import { Flex, Button, Box, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import FulfilmentTab from "../../components/fulfilmentTab.tsx";

const Fulfillment = () => {
  const fulfilmentList = [
    {
      title: " Issue Approved Items  ",
      content: "Issue items duly approved to requesting employee",
      link: "approved",
      url: "",
    },
    {
      title: "Unavailable Item",
      content:
        "Treat items required by employees that are not available in store",
      link: "unavailable",
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
              Fulfillment
            </Text>
            <Text color={"brandGrey.300"}>Issue requested items to employees</Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              Make Request
            </Button>
          </Box>
        </Box>
        <Flex flexWrap={"wrap"} gap={"4"}>
          {fulfilmentList.map((req) => (
            <FulfilmentTab fulfilment={req} />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Fulfillment;
