import {
  Flex,
  Button,
  Box,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import Layout from "../../components/layout";
import BackBtn from "../../components/backButton";

const StoreStocks = () => {
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
            Add Items to Stock
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
        <Box
          h={"14"}
          mb={24}
          w={"full"}
          bgColor={"white"}
          display={"flex"}
          alignItems={"center"}
          px={"6"}
          borderRadius={"xl"}
          border={"1px"}
          borderColor={"brandGrey.400"}
          // fontSize={"2xl"}
          fontWeight={"bold"}
        >
          ADD ITEMS TO STOCK
        </Box>
        <Box
          bgColor={"white"}
          p={6}
          borderRadius={"xl"}
          border={"1px"}
          borderColor={"brandGrey.400"}
        >
          <>
            <Flex
              justifyContent={"space-between"}
              pb={5}
              borderBottom={"4px"}
              borderColor={"brandRed.100"}
              mb={10}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>
                {" "}
                STOCK
              </Text>
              {/* <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="1">
                    Items in Store
                  </Radio>
                  <Radio colorScheme="red" value="2">
                    Items Issued
                  </Radio>
                </Stack>
              </RadioGroup> */}
            </Flex>
            <RadioGroup defaultValue="2" px={"40"} mb={"14"}>
                <Flex justifyContent={"space-between"} >
                  <Radio colorScheme="red" value="1">
                    Items in Store
                  </Radio>
                  <Radio colorScheme="red" value="2">
                    Items Issued
                  </Radio>
                </Flex>
              </RadioGroup>
            <TableContainer>
              <Table size="md">
                <Thead>
                  <Tr>
                    <Th>ITEM CODE </Th>
                    <Th>ITEM</Th>
                    <Th>CATEGORY </Th>
                    <Th>COST</Th>
                    <Th>PURCHASED BY </Th>
                  </Tr>
                </Thead>
                <Tbody></Tbody>
              </Table>
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default StoreStocks;
