import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
// import LogoImage from "../../assets/asset_simple.png";
import LogoImage from "../../assets/img/asset_simple.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { TfiBarChart } from "react-icons/tfi";
import { VscCreditCard } from "react-icons/vsc";
import { BsPercent } from "react-icons/bs";
import { HiOutlineShieldExclamation } from "react-icons/hi";
import { BsPiggyBank } from "react-icons/bs";
import { FiSettings, FiUsers } from "react-icons/fi";

const navLinks = [
  {
    title: "Dashboard ",
    icon: <LuLayoutDashboard />,
    href: "/dashboard",
  },
  {
    title: "Requisitions ",
    icon: <TfiBarChart />,
    href: "/requisition",
  },
  {
    title: "Store  ",
    icon: <VscCreditCard />,
    href: "/store",
  },
  {
    title: "Fulfillment  ",
    icon: <BsPercent />,
    href: "/fulfillment",
  },
  {
    title: "Organization  ",
    icon: <BsPiggyBank />,
    href: "/organization",
  },
  {
    title: "User Management",
    icon: <FiUsers />,
    href: "/users"
  },
  {
    title: "Printing  ",
    icon: <HiOutlineShieldExclamation />,
    href: "/printing",
  },
  {
    title: "Settings ",
    icon: <FiSettings />,
    href: "/settings",
  },
];

type INavs = {
  title: string;
  href: string;
  icon: any;
};
const SideNav = () => {
  return (
    <Box
      bgColor={"brandGrey.100"}
      position={"fixed"}
      left={0}
      top={0}
      height={"100vh"}
      width={"72"}
      zIndex={"sticky"}
    >
      <Flex direction="column" height={"full"} pt={"8"} alignItems={"center"}>
        <Box pb={"20"}>
          <img alt="logo" src={LogoImage} />
        </Box>
        <Box>
          {navLinks.map((link: INavs) => (
            <NavLink
              key={link.title}
              to={link.href}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <Box
                mb={"6"}
                display={"flex"}
                alignItems={"center"}
                height={"8"}
                px={"20"}
                className="active-border"
              >
                <Box mr={"4"}>{link.icon}</Box>
                <Text fontSize={"md"} fontWeight={"bold"} textAlign={"left"} whiteSpace={"nowrap"}>
                  {link.title}
                </Text>
              </Box>
            </NavLink>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default SideNav;
