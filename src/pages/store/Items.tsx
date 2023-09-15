import {
  Flex,
  Button,
  TableContainer,
  Text,
  Box,
  GridItem,
  Input,
  Grid,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../../components/layout";
import EmptyState from "../../components/EmptyState";
import BackBtn from "../../components/backButton";
import { BsChevronDown } from "react-icons/bs";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import { DotLoader } from "react-spinners";
import axios from "axios";

const StoreItems = () => {
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setResp] = useState();
  const [, setErr] = useState();

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  const {
    response,
    loading,
  }: { response?: any; loading: boolean; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/ItemsCategoryByPortalId",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
  });

  console.log(response);

  const addItem = async () => {
    console.log({ category });
    setIsLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "http://api.asset.bz/AssetManagerServices.asmx/ItemsAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          ItemCategoryId: category,
          ItemCode: code,
          ItemDescription: description,
          ItemName: name,
          PortalId: user.PortalId,
        },
      });
      if (result) {
        setResp(result.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setErr(error);
      setIsLoading(false);
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
              Manage items
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
        <Box borderRadius={"md"} padding={4} bgColor={"white"}>
          <Text
            // mb={8}
            fontSize={"xl"}
            fontWeight={"bold"}
            pb={showForm ? "4" : ""}
            borderBottom={showForm ? "4px" : ""}
            borderColor={"brandRed.100"}
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            justifyContent={"space-between"}
            onClick={() => setShowForm(!showForm)}
          >
            ADD ITEM
            <BsChevronDown />
          </Text>
          {showForm && (
            <Box>
              <Grid
                templateColumns="repeat(2, 1fr)"
                columnGap={20}
                rowGap={6}
                mt={"8"}
              >
                <GridItem w="100%" h="16">
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <span>Name</span>
                    <Input
                      value={name}
                      w={"80"}
                      h={"12"}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Category name"
                    />
                  </Flex>
                </GridItem>
                <GridItem w="100%" h="16">
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <span>Code</span>
                    <Input
                      value={code}
                      w={"80"}
                      h={"12"}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Code"
                    />
                  </Flex>
                </GridItem>
                <GridItem w="100%" h="16">
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <span>Description</span>
                    <Input
                      value={description}
                      w={"80"}
                      h={"12"}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description"
                    />
                  </Flex>
                </GridItem>
                <GridItem w="100%" h="16">
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <span>Category</span>
                    <Select
                      w={"80"}
                      h={"12"}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value={undefined}>Select category</option>
                      {response &&
                        response.d.map((cat: any) => (
                          <option key={cat.Id} value={cat.Id}>
                            {cat.CategoryName}
                          </option>
                        ))}
                    </Select>
                  </Flex>
                </GridItem>
                <GridItem
                  w="100%"
                  h="16"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Button
                    w={"60"}
                    ml={"4"}
                    bgColor={"brandRed.100"}
                    color={"white"}
                    _hover={{ bg: "brandRed.200" }}
                    onClick={addItem}
                  >
                    {isLoading ? "Adding..." : "Add Item"}
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          )}
        </Box>
        <Box
          bgColor={"white"}
          p={6}
          borderRadius={"xl"}
          border={"1px"}
          borderColor={"brandGrey.400"}
          mt={"16"}
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
                ITEMS
              </Text>
              {/* <RadioGroup defaultValue="2">
              <Stack spacing={5} direction="row">
                <Radio colorScheme="red" value="1">
                  Request by Me
                </Radio>
                <Radio colorScheme="red" value="2">
                  Request on my behalf
                </Radio>
              </Stack>
            </RadioGroup> */}
            </Flex>
            <TableContainer>
              {/* <Table size="md">
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
              </Table> */}
              <EmptyState msg="No items to show" />
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default StoreItems;
