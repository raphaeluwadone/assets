import {
  Flex,
  Button,
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
} from "@chakra-ui/react";
import EmptyState from "../../components/EmptyState";
import { useAxios } from "../../hooks/useAxios";
import { DotLoader } from "react-spinners";
import Layout from "../../components/layout";
import {  useState } from "react";
import BackBtn from "../../components/backButton";
import { IUser } from "../dashboard";
import MakeRequisition from "../../components/makeRequisition/Index";
const RequisitionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response,
    loading,
    error,
  }: { response: any; loading: boolean; error: any } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/StaffRequisitionsByCreatedByList",
    // Url fr request made on my behalf `StaffRequisitionsByForStaffIdList`
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      CreatedBy: user.CreatedBy,
    },
  });

  console.log({ response });
  console.log({ error });
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
        <MakeRequisition isOpen={isOpen} onClose={onClose} user={user} />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              RequisitionManagement
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={onOpen}
            >
              Make Request
            </Button>
          </Box>
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
                    <Tbody></Tbody>
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

export default RequisitionManagement;
