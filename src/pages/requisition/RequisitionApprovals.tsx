import {
  Flex,
  RadioGroup,
  Stack,
  Radio,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Box,
  Td,
} from "@chakra-ui/react";
import { DotLoader } from "react-spinners";
import { useAxios } from "../../hooks/useAxios";
import EmptyState from "../../components/EmptyState";
import Layout from "../../components/layout";
import BackBtn from "../../components/backButton";
import { IUser } from "../dashboard";

const RequisitionApprovals = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response,
    loading,
  }: { response: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/StaffRequisitionsPendingList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: { PortalId: user.PortalId, CreatedBy: user.CreatedBy },
  });

  console.log(response);
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
              RequisitionApprovals
            </Text>
          </Flex>
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
                Requisition list
              </Text>
              <RadioGroup defaultValue="2">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="red" value="1">
                    Request by Me
                  </Radio>
                  <Radio colorScheme="red" value="2">
                    Request on my behalf
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <TableContainer>
              <Table size="md">
                {response && response.d.length > 0 ? (
                  <>
                    <Thead>
                      <Tr>
                        <Th>Item </Th>
                        <Th>Quantity</Th>
                        <Th w={"lg"}>Description</Th>
                        <Th>Requested for </Th>
                        <Th>Delivery Date</Th>
                        <Th>Status </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {response.d.map((data: any, i: number) => (
                        <Tr key={i}>
                          <Td>{data.ItemDescription}</Td>
                          <Td>{data.Quantity}</Td>
                          <Td>{data.ItemDescription}</Td>
                          <Td>{data.CreatedByFullName}</Td>
                          <Td>-</Td>
                          <Td>Pending</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </>
                ) : (
                  <Box>
                    <EmptyState msg={"No Requisitions"} />
                  </Box>
                )}
              </Table>
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default RequisitionApprovals;
