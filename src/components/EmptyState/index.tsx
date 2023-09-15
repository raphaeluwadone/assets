import { Box } from "@chakra-ui/react";

const EmptyState = ({msg}:{msg: string}) => {
  return (
    <Box
      height={40}
      mt={4}
      border={"1px dashed black"}
      w={"full"}
      borderRadius={"md"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {msg}
    </Box>
  );
};

export default EmptyState;
