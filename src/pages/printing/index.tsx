import { Box, Flex, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import PrintingTab from "../../components/printingTab";

const Printing = () => {
  const settingsList = [
    {
      title: " ID Card Printing  ",
      content: "Print ID Card for employees",
      link: "printing",
    },
    {
      title: "Tags",
      content: "Print or re-print asset tags",
      link: "tags",
    },
    {
      title: "Search ID",
      content: "Search Student ID Status",
      link: "search",
    },
    {
      title: "Download/Upload",
      content: "Download and Upload assets for ID card printing",
      link: "download",
    },
    {
      title: "Export",
      content: "Export student card info",
      link: "export",
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
              Printing
            </Text>
          </Flex>
        </Box>
        <Flex flexWrap={"wrap"} gap={"4"}>
          {settingsList.map((print) => (
            <PrintingTab printing={print} />
          ))}
        </Flex>
      </>
    </Layout>
  );
};

export default Printing;
