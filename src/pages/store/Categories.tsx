import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import Layout from "../../components/layout";
import EmptyState from "../../components/EmptyState";
import BackBtn from "../../components/backButton";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../dashboard";
import axios from "axios";
import { BsChevronDown } from "react-icons/bs";

const StoreCategories = () => {
  const logedUser: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  const {
    response,
  }: { response: any; } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/ItemsCategoryByPortalId",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: logedUser.PortalId,
    },
  });

  console.log({ response });

  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [code, setCode] = useState<string | undefined>();
  const [category, setCategory] = useState<string | undefined>();
  const [showForm, setShowForm] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setErr] = useState<string | undefined>();
  const [, setResp] = useState<string | undefined>();

  const addCategory = async () => {
    setIsLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "http://api.asset.bz/AssetManagerServices.asmx/ItemsCategoryAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CatCode: code,
          CategoryDescription: description,
          CategoryName: name,
          CategoryType: category,
          CreatedBy: logedUser.CreatedBy,
          PortalId: logedUser.PortalId,
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

  console.log(name, category, code, description);

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
              Categories of Assets
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
            ADD CATEGORY
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
                      <option value="0">Standard Items</option>
                      <option value="1">Identification Materials</option>
                      <option value="2">Consumable</option>
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
                    onClick={addCategory}
                  >
                    {isLoading ? "Adding..." : "Add Category"}
                  </Button>
                </GridItem>
              </Grid>
            </Box>
          )}
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
          <TableContainer mt={"10"}>
            {response ? (
              <Table variant={"striped"}>
                <Thead>
                  <Tr>
                    <Th textAlign={"center"}>CODE </Th>
                    <Th textAlign={"center"}>CATEGORY NAME</Th>
                    <Th textAlign={"center"}>DESCRIPTION</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {response.d.map((cat: any, i: number) => (
                    <tr key={i}>
                      <td align="center">{cat.CatCode}</td>
                      <td align="center">{cat.CategoryName}</td>
                      <td align="center">{cat.CategoryDescription}</td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <EmptyState msg="No categories" />
            )}
          </TableContainer>
        </Box>
      </>
    </Layout>
  );
};

export default StoreCategories;
