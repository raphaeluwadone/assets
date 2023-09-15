import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import { DotLoader } from "react-spinners";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import EmptyState from "../../components/EmptyState";
import AddPosition from "../../components/AddPosition/Index";
import { useState } from "react";

const OrganizationPosition = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response,
    loading,
  }: { response: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/PositionByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: { PortalId: user.PortalId },
  });

  // AssetManagerServices.asmx/PositionAdd



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
      <AddPosition isOpen={isOpen} onClose={onClose} />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Organization Position
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={onOpen}
            >
              Add Position
            </Button>
          </Box>
        </Box>
        <Box bgColor={"white"} p={6} borderRadius={"xl"}>
          <>
            <Flex justifyContent={"flex-end"} pb={5} mb={10}>
              <Input w={"xs"} />
            </Flex>
            <TableContainer>
              <Table size="md">
                {response ? (
                  <>
                    <Thead>
                      <Tr>
                        <Th>Position</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {response.d.map((data: any, i: number) => (
                        <Tr key={i}>
                          <Td>{data.PositionName}</Td>
                          <Td>{data.PositionDescription}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </>
                ) : (
                  <Box>
                    <EmptyState msg={"No Organizations"} />
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

export default OrganizationPosition;
