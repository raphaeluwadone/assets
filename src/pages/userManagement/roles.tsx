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
import { useState } from "react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import AddRole from "../../components/AddRole/Index";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import { DotLoader } from "react-spinners";
import EmptyState from "../../components/EmptyState";

const UserRoles = () => {
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
    url: "AssetManagerServices.asmx/RolesAsssetByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
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

  console.log(response.d);
  return (
    <Layout>
      <>
        <AddRole
          isOpen={isOpen}
          onClose={onClose}
          user={user}
        />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              User Roles
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={onOpen}
            >
              Create Role
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
                {response ? (
                  <>
                    <Thead overflow={"visible"}>
                      <Tr>
                        <Th>Roles</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody overflow={"visible"}>
                      {response.d.map((role: any, i: number) => (
                        <Tr key={i}>
                          <Td fontWeight={"semibold"}>{role.RoleName}</Td>
                          <Td>{role.RoleDescription}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </>
                ) : (
                  <Box>
                    <EmptyState msg={"No Roles"} />
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

export default UserRoles;
