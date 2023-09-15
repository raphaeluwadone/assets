import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import BackBtn from "../../components/backButton";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import { DotLoader } from "react-spinners";

const ApprovedFulfilment = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response,
    loading,
  }: { response: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/StaffRequisitionsApprovalsPendingIssuanceList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: { PortalId: user.PortalId },
  });
  if (loading) {
    return (
      <Flex h={"md"} w={"full"} justifyContent={"center"} alignItems={"center"}>
        <DotLoader
          color={"#E1003A"}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Flex>
    );
  }
  return (
    <Layout>
      <Box>
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Guest Fulfillment
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
        <Box bg={"white"} p={4} borderRadius={"md"} w={"full"}>
          <Text
            borderBottom={"4px"}
            pb={"4"}
            borderColor={"brandRed.100"}
            fontWeight={"semibold"}
          >
            Requests
          </Text>
          <RadioGroup defaultValue="2" m={6}>
            <Stack spacing={5} direction="column">
              <Radio colorScheme="red" value="1">
                Approved
              </Radio>
              <Radio colorScheme="red" value="2">
                Pending Final Approval
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box borderRadius={"md"} bgColor={"white"} mt={"16"} p={4}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Text>Show</Text>
              <Select mx={1}></Select>
              <Text>entries</Text>
            </Box>
            <Input w={"xs"} />
          </Box>
          <TableContainer>
            <Table>
              {response.d.length > 0 ? (
                <>
                  <Thead>
                    <Tr>
                      <Th>ITEM CODE </Th>
                      <Th>ITEM</Th>
                      <Th>QUANTITY</Th>
                      <Th>REQUESTED BY</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {response.d.map((data: any, i: number) => (
                      <Tr key={i}>
                        <Td>{data.code}</Td>
                        <Td>{data.item}</Td>
                        <Td>{data.qty}</Td>
                        <Td>{data.requestedBy}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </>
              ) : (
                <Box>
                  <EmptyState msg={"No Data Available"} />
                </Box>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default ApprovedFulfilment;
