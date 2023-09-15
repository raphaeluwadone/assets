import { Box } from "@chakra-ui/react";
import SideNav from "../sideNav";
import TopNav from "../topNav";

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <TopNav />
      <Box
        bgColor={"brandGrey.200"}
        minH={"container.sm"}
        ml={"72"}
        mt={"24"}
        py={"9"}
        pl={"16"}
        pr={"12"}
      >
        {children}
      </Box>
      <SideNav />
    </>
  );
};

export default Layout;
