import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDots } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router";
import { DotLoader } from "react-spinners";

const MenuModalRow = ({ menu }: { menu: any }) => {
  const [showInfo, setShowInfo] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const successToast = () =>
    toast.success("Success, menu has been deleted", {
      style: {
        border: "1px solid #4FFFB0",
        padding: "16px",
        fontWeight: 700,
        color: "#1B4D3E",
        backgroundColor: "#17B169",
      },
      position: "top-right",
    });

  const errorToast = () =>
    toast.error("Sorry something went wrong, try again later.", {
      style: {
        border: "1px solid #FF0800",
        padding: "16px",
        fontWeight: 600,
        color: "#AA0000",
        backgroundColor: "#fd5c63",
      },
      position: "top-right",
    });

  const deleteMenu = async (id: string | number) => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/PagesParentByIdDelete",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: { Id: id },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        // refresh
        navigate(0);
        setShowInfo(false);
        successToast();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      errorToast();
      setShowInfo(false);
    }
  };

  return (
    <>
      <Tr position={"relative"}>
        <Td>
          <Flex
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => setShowInfo(!showInfo)}
          >
            <Text mr={2} cursor={"pointer"}>
              {menu.PageName}
            </Text>
            <span>
              <Box>
                <FiChevronDown />
              </Box>
            </span>
          </Flex>
        </Td>
        <Td>
          <Flex
            position={"relative"}
            alignItems={"center"}
            justifyContent={"space-between"}
            zIndex={"modal"}
          >
            <Text mr={2} cursor={"pointer"}>
              {menu.PageDescription}
            </Text>
            <Box cursor={"pointer"}>
              <BsThreeDots />
            </Box>
          </Flex>
        </Td>
      </Tr>
      {showInfo ? (
        <Box
          position={"absolute"}
          w={"4xl"}
          h={"20"}
          bg={"white"}
          zIndex={"popover"}
          borderRadius={"xl"}
          boxShadow={"lg"}
          p={2}
        >
          <Flex justifyContent={"space-between"} h={"full"}>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Box>Name</Box>
              <Box color={"brandGrey.600"}>{menu.PageName}</Box>
            </Flex>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Box>Description</Box>
              <Box color={"brandGrey.600"}>{menu.PageDescription}</Box>
            </Flex>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Box>Url</Box>
              <Box color={"brandGrey.600"}>
                {menu.PageURL ? menu.PageURL : "-"}
              </Box>
            </Flex>
            <Flex
              flexDirection={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Box>Icon class</Box>
              <Box color={"brandGrey.600"}>{menu.IconClass}</Box>
            </Flex>
            <Flex
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              h={"full"}
            >
              <Box cursor={"pointer"} onClick={() => deleteMenu(menu.Id)}>
                {loading ? (
                  <DotLoader
                    color={"#E1003A"}
                    loading={loading}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <TiDelete fontSize={"20px"} fontColor={"red"} />
                )}
              </Box>
            </Flex>
          </Flex>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default MenuModalRow;
