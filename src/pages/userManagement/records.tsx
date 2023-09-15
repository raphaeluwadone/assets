import {
  Box,
  Button,
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
import { useState } from "react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import CreateRecord from "../../components/CreateRecord/Index";

const UserRecords = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  
  // const user: IUser = JSON.parse(
  //   localStorage.getItem("user") as unknown as string
  // );
  // const {
  //   response,
  //   loading,
  //   error,
  // }: { response: any; loading: boolean; error: any } = useAxios({
  //   method: "POST",
  //   url: "AssetManagerServices.asmx/RolesAsssetByPortalIdList",
  //   headers: {
  //     // no need to stringify
  //     accept: "*/*",
  //   },
  //   data: {
  //     PortalId: user.PortalId,
  //   },
  // });
  // if (loading) {
  //   return (
  //     <Flex h={"md"} w={"full"} justifyContent={"center"} alignItems={"center"}>
  //       <DotLoader
  //         color={"#E1003A"}
  //         loading={loading}
  //         size={150}
  //         aria-label="Loading Spinner"
  //         data-testid="loader"
  //       />
  //     </Flex>
  //   );
  // }

  return (
    <Layout>
      <>
        <CreateRecord isOpen={isOpen} onClose={onClose} />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
             User Record
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={onOpen}
            >
             Create Record
            </Button>
          </Box>
        </Box>
        <Box bgColor={"white"} p={6} borderRadius={"xl"}>
          <>
            <Flex justifyContent={"flex-end"} pb={5} mb={10}>
              <Input w={"xs"} />
            </Flex>
            <TableContainer overflow={"visible"}>
              <Table size="md" overflow={"visible"}>
                {/* {response ? ( */}
                <>
                  <Thead overflow={"visible"}>
                    <Tr>
                      <Th>Code</Th>
                      <Th>Surname</Th>
                      <Th>Other Name</Th>
                      <Th>Email</Th>
                      <Th>Mobile</Th>
                      <Th>Branch</Th>
                      <Th>Department</Th>
                    </Tr>
                  </Thead>
                  <Tbody overflow={"visible"}>
                  </Tbody>
                </>
                {/* // ) : ( */}
                {/* <Box>
                        <EmptyState msg={"No Organizations"} />
                      </Box> */}
                {/* // )} */}
              </Table>
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default UserRecords;
