import { Box, Button, Flex, Text } from "@chakra-ui/react";
import RequisitionTab from "../../components/requisitionTab";
import Layout from "../../components/layout";

const requisitionList = [
  {
    title: " Requisition Management  ",
    content:
      "Make request for Item(s) needed, also manage pending requisitions. Requests are subject to approval",
    link: "management",
    url: "",
  },
  {
    title: " Unavailable Item Request",
    content: "Submit a request for item(s) not listed in store",
    link: "unavailable",
    url: "",
  },
  {
    title: " Approvals",
    content: "Respond to requests awaiting your approval or concurrence",
    link: "approvals",
    url: "/AssetManagerServices.asmx/StaffRequisitionsPendingList",
  },
  {
    title: " Returns ",
    content: "Return an item to the Store ",
    link: "returns",
    url: "",
  },
];

const Requisition = () => {


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
              Requisitions
            </Text>
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
          {requisitionList.map((req) => (
            <RequisitionTab requisition={req} />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Requisition;
