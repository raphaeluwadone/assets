import { Avatar, Box, Flex, Input } from "@chakra-ui/react";
import { IUser } from "../../pages/dashboard";

const TopNav = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  return (
    <Flex
      position={"fixed"}
      top={0}
      left={0}
      height={24}
      bgColor={"white"}
      pl={"72"}
      width={"full"}
      alignItems={"center"}
      zIndex={"sticky"}
    >
      <Box
        display={"flex"}
        width={"full"}
        pl={"16"}
        pr={"12"}
        justifyContent={"space-between"}
      >
        <Box>
          <Input />
        </Box>
        <Avatar
          name={user.FirstName + " " + user.SurName}
          src={user.PhotoUrl}
        />
      </Box>
    </Flex>
  );
};

export default TopNav;
