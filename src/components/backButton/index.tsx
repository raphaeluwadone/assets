import { Flex, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <Flex
      mb={8}
      alignItems={"center"}
      cursor={"pointer"}
      w={"14"}
      onClick={() => navigate(-1)}
    >
      <AiOutlineArrowLeft />
      <Text color={"gray.500"} ml={1} fontSize={"sm"}>
        Back
      </Text>
    </Flex>
  );
};

export default BackBtn;
