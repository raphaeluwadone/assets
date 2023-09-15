import { Box, Button, Flex, Text } from "@chakra-ui/react";
import StoreTab from "../../components/storeTab";
import Layout from "../../components/layout";

const storeList = [
  {
    title: "Items  ",
    content: "Manage all item sets",
    link: "store/items",
    url: "",
  },
  {
    title: "Categories",
    content: "Manage item Categorization",
    link: "store/categories",
    url: "",
  },
  {
    title: "Stocks",
    content: "Manage addition of new items",
    link: "store/stocks",
    url: "",
  },
];

const Store = () => {
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user") as unknown as string);
  //   if (user) {
  //     setUser(user);
  //    }
  //   console.log(user)
  // }, []);

  return (
    <Layout>
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Store
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
        <Flex flexWrap={"wrap"} gap={"4"}>
          {storeList.map((store) => (
            <StoreTab tab={store} />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export default Store;
