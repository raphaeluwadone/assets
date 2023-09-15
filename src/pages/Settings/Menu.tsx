import { useState } from "react";
import Layout from "../../components/layout";
import BackBtn from "../../components/backButton";
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
import AddMenu from "../../components/AddMenu/Index";
import MenuModalRow from "../../components/ModalRow";
import { DotLoader } from "react-spinners";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import EmptyState from "../../components/EmptyState";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const { response, loading }: { response: any; loading: boolean } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/PagesParentByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: { PortalId: user.PortalId },
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
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  return (
    <Layout>
      <>
        <AddMenu isOpen={isOpen} onClose={onClose} />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Menu Settings
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={onOpen}
            >
              Add New Menu
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
                        <Th>Module</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody overflow={"visible"}>
                      {response.d.map((menu: any, i: number) => (
                        <MenuModalRow key={i} menu={menu} />
                      ))}
                    </Tbody>
                  </>
                ) : (
                  <Box>
                    <EmptyState msg={"No Setting Menu's"} />
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

export default Menu;
