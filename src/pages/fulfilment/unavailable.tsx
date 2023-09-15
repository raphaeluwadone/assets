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
import { useState } from "react";
import EmptyState from "../../components/EmptyState";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import { DotLoader } from "react-spinners";
import axios from "axios";

const UnavailableFulfilment = () => {
  const [view, setView] = useState("1");

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response,
    loading,
  }: { response: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/RequisitionsNotAvailableByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: { PortalId: user.PortalId },
  });

  const approveItem = async (data: any) => {
    //
    try {
      const result = await axios.request({
        method: "POST",
        url: "http://api.asset.bz/AssetManagerServices.asmx/RequisitionsNotAvailableUpdate",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          hostname: "http://www.asset.bz/aims",
          rfidInfo: {
            CreatedBy: data.CreatedBy,
            CreatedByFullName: data.CreatedByFullName,
            Id: data.Id,
            IncludeBy: data.IncludedBy,
            IncludedByFullName: data.IncludedByFullName,
            IsIncluded: true,
            ItemDescription: data.ItemDescription,
            PortalId: data.PortalId,
            Quantity: data.Quantity,
          },
        },
      });
      if (result) {
        console.log(result.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

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
  console.log({ response });
  const included = response.d.filter((resp: any) => resp.IsIncluded == true);

  const notIncluded = response.d.filter(
    (resp: any) => resp.IsIncluded == false
  );

  console.log(included);
  console.log(notIncluded);
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
          <RadioGroup defaultValue="2" m={6} onChange={setView} value={view}>
            <Stack spacing={5} direction="column">
              <Radio colorScheme="red" value="1">
                Pending
              </Radio>
              <Radio colorScheme="red" value="2">
                Treated
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box borderRadius={"md"} bgColor={"white"} mt={"16"} p={4}>
          <Text
            mb={8}
            fontSize={"xl"}
            fontWeight={"bold"}
            pb={"4"}
            borderBottom={"4px"}
            borderColor={"brandRed.100"}
          >
            {" "}
            Categories
          </Text>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"} alignItems={"center"}>
              <Text>Show</Text>
              <Select mx={1}></Select>
              <Text>entries</Text>
            </Box>
            <Input w={"xs"} />
          </Box>
          <TableContainer mt={10}>
            {response.d.length > 0 ? (
              view == "2" ? (
                <>
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th textAlign={"center"}>ACTION</Th>
                        <Th textAlign={"center"}>ITEM</Th>
                        <Th textAlign={"center"}>QUANTITY</Th>
                        <Th textAlign={"center"}>REQUESTED BY</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {included.map((data: any, i: number) => (
                        <Tr key={i}>
                          <Td textAlign={"center"}>
                            <Box
                              bgColor={"brandRed.200"}
                              h={8}
                              w={24}
                              rounded={"sm"}
                              display={"flex"}
                              justifyContent={"center"}
                              alignItems={"center"}
                              textColor={"white"}
                              alignSelf={"center"}
                            >
                              Approved
                            </Box>
                          </Td>
                          <Td textAlign={"center"}>{data.ItemDescription}</Td>
                          <Td textAlign={"center"}>{data.Quantity}</Td>
                          <Td textAlign={"center"}>{data.CreatedByFullName}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              ) : (
                <>
                  <Table size="md">
                    <Thead>
                      <Tr>
                        <Th textAlign={"center"}>ACTION</Th>
                        <Th textAlign={"center"}>ITEM</Th>
                        <Th textAlign={"center"}>QUANTITY</Th>
                        <Th textAlign={"center"}>REQUESTED BY</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {notIncluded.map((data: any, i: number) => (
                        <Tr key={i}>
                          <Td
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            alignContent={"center"}
                          >
                            <Button
                              colorScheme="red"
                              onClick={() => approveItem(data)}
                            >
                              Approve
                            </Button>
                          </Td>
                          <Td textAlign={"center"}>{data.ItemDescription}</Td>
                          <Td textAlign={"center"}>{data.Quantity}</Td>
                          <Td textAlign={"center"}>{data.CreatedByFullName}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </>
              )
            ) : (
              <EmptyState msg="No categories" />
            )}
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default UnavailableFulfilment;
