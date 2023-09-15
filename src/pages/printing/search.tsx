import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Text,
} from "@chakra-ui/react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import axios from "axios";
import { useState } from "react";
import { IUser } from "../dashboard";

const Search = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  const [loading, setLoading] = useState(false);
  const [regNo, setRegNo] = useState<string>();
  const [cardStatus, setCardStatus] = useState<any>();

  const searchRegNo = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/IDCardStudentCheck",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          PortalId: user.PortalId,
          regNo: regNo,
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        setRegNo("");
        setCardStatus(result.data.d);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };
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
              Search Student ID Status
            </Text>
          </Flex>
        </Box>
        <Flex justifyContent={"center"}>
          <Box
            w={"lg"}
            bgColor={"white"}
            p={4}
            h={"48"}
            rounded={"md"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Input
              placeholder="Enter Matric Number"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            <Button
              mt={"4"}
              w={40}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={searchRegNo}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Box>
        </Flex>
        {cardStatus && (
          <Box bgColor={"white"} mt={10} rounded={"md"} py={4}>
            <Text
              borderBottom={"1px"}
              pb={6}
              w={"full"}
              px={4}
              fontWeight={"bold"}
            >
              ID Card Details
            </Text>
            <Grid
              templateColumns="repeat(5, 1fr)"
              columnGap={10}
              rowGap={2}
              p={6}
            >
              <GridItem w="100%" colSpan={2}>
                <Text>Student Capture Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.StudentCapturedStatus
                    ? cardStatus.StudentCapturedStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>Photo Replication Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.PhotoReplicationStatus
                    ? cardStatus.PhotoReplicationStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>Beautification Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.PhotoBeautificationStatus
                    ? cardStatus.PhotoBeautificationStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>Photo Upload After Beautification</Text>
              </GridItem>
              <GridItem colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.PhotoUploadAfterBeautificationStatus
                    ? cardStatus.PhotoUploadAfterBeautificationStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>ID Card Print Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.IDCardPrintStatus
                    ? cardStatus.IDCardPrintStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>ID Card Encoded Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.IDCardEncodedStatus
                    ? cardStatus.IDCardEncodedStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>ID Card Collection Status</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.IDCardCollectedStatus
                    ? cardStatus.IDCardCollectedStatus
                    : "--"}
                </Text>
              </GridItem>
              <GridItem w="100%" colSpan={2}>
                <Text>Reg. Number</Text>
              </GridItem>
              <GridItem w="100%" h="10" colSpan={3}>
                <Text fontWeight={"bold"}>
                  {cardStatus.RegNo ? cardStatus.RegNo : "--"}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        )}
      </>
    </Layout>
  );
};

export default Search;
