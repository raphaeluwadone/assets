
import Layout from "../../components/layout";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import OrganizationTab from "../../components/organizationTab/index.tsx";

const Organization = () => {
    const organizationList = [
        {
          title: "Information",
          content: "View list of organization available on the platform",
          link: "information",
          url: "",
        },
        {
          title: "Branch",
          content:
            "Business location of existing organizations",
          link: "branch",
          url: "",
        },
        {
            title: "Department",
            content: "List of created departments across all the organizations",
            link: "department",
            url: "",
          },
          {
            title: "Position",
            content:
              "Designation of personels within organizations",
            link: "position",
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
                  Organization
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
              {organizationList.map((req) => (
                <OrganizationTab org={req} />
              ))}
            </Flex>
          </Box>
        </Layout>
      );
    };

export default Organization;
