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
import EmptyState from "../../components/EmptyState";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import AddOrganization from "../../components/AddOrganizationModal/Index";
import { useAxios } from "../../hooks/useAxios";
import { DotLoader } from "react-spinners";
import EditOrganization from "../../components/EditOrganizationModal/Index";

export const OrganizationRow = ({ data }: { data: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  return (
    <Tr onClick={() => setIsOpen(true)} cursor={"pointer"}>
      <EditOrganization isOpen={isOpen} onClose={onClose} data={data} />
      <Td>
        <img src={`http://api.asset.bz/images${data.CompanyLogoUrl}`} />
      </Td>
      <Td>{data.CompanyName}</Td>
      <Td>{data.CompanyAddress}</Td>
      <Td>{data.CompanyEmail}</Td>
      <Td>{data.MobileNo}</Td>
      <Td>{data.ContactPersonName}</Td>
      <Td>
        <img src={`http://api.asset.bz/images${data.AuthorizedSignUrl}`} />
      </Td>
      <Td>{data.CountryName}</Td>
    </Tr>
  );
};

const OrganizationInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const {
    response,
    loading,
  }: { response: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/CompanyList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {},
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
        <AddOrganization isOpen={isOpen} onClose={onClose} />
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Organization Information
            </Text>
          </Flex>
          <Box>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={() => onOpen()}
            >
              Add Organization
            </Button>
          </Box>
        </Box>
        <Box bgColor={"white"} p={6} borderRadius={"xl"}>
          <>
            <Flex justifyContent={"flex-end"} pb={5} mb={10}>
              <Input w={"xs"} />
            </Flex>
            <TableContainer>
              {response.d.length > 0 ? (
                <Table size="sm">
                  <>
                    <Thead>
                      <Tr>
                        <Th>Logo</Th>
                        <Th>
                          Company
                          <br /> Name
                        </Th>
                        <Th>Address</Th>
                        <Th>
                          Email
                          <br /> Address
                        </Th>
                        <Th>Phone</Th>
                        <Th>
                          Contact
                          <br /> Person
                        </Th>
                        <Th>
                          Authorized
                          <br /> Signature
                        </Th>
                        <Th>Country</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {response.d.map((data: any, i: number) => (
                        <OrganizationRow data={data} key={i} />
                      ))}
                    </Tbody>
                  </>
                </Table>
              ) : (
                <Box>
                  <EmptyState msg="No Organizations" />
                </Box>
              )}
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default OrganizationInformation;
