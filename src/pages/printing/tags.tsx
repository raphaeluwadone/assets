import {
  Box,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";

const Tags = () => {
  return (
    <Layout>
      <>
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Print Tags
            </Text>
          </Flex>
        </Box>
        <Flex justifyContent={"center"}>
          <Box bgColor={"white"} p={6} borderRadius={"xl"} w={"full"}>
            <>
              <Flex justifyContent={"flex-end"} pb={5} mb={10}>
                <Input w={"xs"} />
              </Flex>
              <TableContainer overflow={"visible"}>
                <Table size="md" overflow={"visible"}>
                  <>
                    <Thead overflow={"visible"}>
                      <Tr>
                        <Th>Item Code</Th>
                        <Th>Serial No</Th>
                        <Th>Item</Th>
                        <Th>Category</Th>
                        <Th>Description</Th>
                        <Th>Date Purchased</Th>
                        <Th>Branch</Th>
                      </Tr>
                    </Thead>
                    <Tbody overflow={"visible"}></Tbody>
                  </>
                  {/* <Box>
                    <EmptyState msg={"No Setting Menu's"} />
                  </Box>
                 */}
                </Table>
              </TableContainer>
            </>
          </Box>
        </Flex>
      </>
    </Layout>
  );
};

export default Tags;
