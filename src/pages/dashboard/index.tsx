import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAxios } from "../../hooks/useAxios";
import { DotLoader } from "react-spinners";
import Layout from "../../components/layout";

export interface IUser {
  Id: number;
  PortalId: number;
  StaffCode: string;
  ScreenName: string;
  UserName: string;
  Email: string;
  Mobile: string;
  SurName: string;
  FirstName: string;
  OtherNames: string;
  AddressLine1: string;
  AddressStreet: string;
  AddressCity: string;
  AddressState: string;
  AddressCountry: string;
  Birthdate: string;
  DeviceUserId: number;
  ContactPicture: boolean;
  IsActive: boolean;
  IsPortalAdmin: boolean;
  IsSuperUser: boolean;
  CreatedBy: number;
  DateCreated: string;
  DateModified: string;
  Password: string;
  BranchId: number;
  DepartmentId: number;
  SkinId: number;
  PhotoUrl: string;
  UserSignURL: string;
  BranchName: string;
  DepartmentName: string;
  CorrespondenceEmail: string;
  PositionName: string;
  PositionId: number;
  CompanyName: string;
  PlanId: number;
  VerificationCode: string;
}

const Dashboard = () => {
  const {
    response,
    loading,
    error,
  }: { response: any; loading: boolean; error: any } = useAxios({
    method: "POST",
    url: "api/users/login",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      Email: "result@delsu.edu.ng",
      Password: "1111111",
    },
  });

  console.log(error);
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
      <Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Hello,{" "}
              {(response as unknown as IUser) && response?.FirstName
                ? response.FirstName
                : response?.OtherNames}
              !
            </Text>
            <Text color={"brandGrey.300"}>
              Explore a world of seamless requests.{" "}
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
        <Flex>
          <Box
            w={"sm"}
            bgColor={"white"}
            h={"60"}
            borderRadius={"xl"}
            border={"1px"}
            borderColor={"brandGrey.400"}
            mr={"3"}
            p={"4"}
          >
            <Text fontWeight={"bold"} fontSize={"lg"}>
              Total Requisition{" "}
            </Text>
            <Text fontWeight={"700"} fontSize={"9xl"} ml={"5"}>
              4
            </Text>
          </Box>
          <Box
            bgColor={"white"}
            h={"60"}
            borderRadius={"xl"}
            border={"1px"}
            flex={"1"}
            borderColor={"brandGrey.400"}
            p={"4"}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"lg"}>
                Statistics{" "}
              </Text>
              <Box w={"40"} h={"6"} borderRadius={"base"} bg={"brandGrey.500"}>
                1
              </Box>
            </Box>
          </Box>
        </Flex>
        <Box
          bgColor={"white"}
          minH={"60"}
          borderRadius={"xl"}
          border={"1px"}
          borderColor={"brandGrey.400"}
          mt={"8"}
          p={"4"}
        >
          <Text fontWeight={"bold"} fontSize={"lg"} mb={"4"}>
            Recent Activities
          </Text>
          <Box
            display={"flex"}
            borderBottom={"1px"}
            py={"3"}
            borderColor={"brandGrey.400"}
          >
            <Box
              w={"10"}
              h={"10"}
              bgColor={"white"}
              border={"1px"}
              borderColor={"brandGrey.400"}
              borderRadius={"md"}
            ></Box>
            <Box display={"flex"} flexDirection={"column"} ml={"4"}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Finger Print Scanner
              </Text>
              <Text fontSize={"xs"} color={"brandGrey.300"}>
                Mar 14, 2023 at 08:10
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            borderBottom={"1px"}
            py={"3"}
            borderColor={"brandGrey.400"}
          >
            <Box
              w={"10"}
              h={"10"}
              bgColor={"white"}
              border={"1px"}
              borderColor={"brandGrey.400"}
              borderRadius={"md"}
            ></Box>
            <Box display={"flex"} flexDirection={"column"} ml={"4"}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Finger Print Scanner
              </Text>
              <Text fontSize={"xs"} color={"brandGrey.300"}>
                Mar 14, 2023 at 08:10
              </Text>
            </Box>
          </Box>
          <Box
            display={"flex"}
            borderBottom={"1px"}
            py={"3"}
            borderColor={"brandGrey.400"}
          >
            <Box
              w={"10"}
              h={"10"}
              bgColor={"white"}
              border={"1px"}
              borderColor={"brandGrey.400"}
              borderRadius={"md"}
            ></Box>
            <Box display={"flex"} flexDirection={"column"} ml={"4"}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Finger Print Scanner
              </Text>
              <Text fontSize={"xs"} color={"brandGrey.300"}>
                Mar 14, 2023 at 08:10
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Dashboard;
