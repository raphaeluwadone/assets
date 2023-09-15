import {
  Box,
  Button,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import { IUser } from "../dashboard";
import axios from "axios";
import { DotLoader } from "react-spinners";

const Movement = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const [loading, setLoading] = useState(false);
  const [dateTo, setDateTo] = useState("");
  const [dateFrom, setDateFrom] = useState("");

  const showRecord = async () => {
    const to = new Date(dateTo);
    const from = new Date(dateFrom);
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/AttendanceByPortalIdList",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          PortalId: user.PortalId,
          date1: to.toISOString(),
          date1str: to
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/"),
          date2: from.toISOString(),
          date2str: from
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/"),
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box>
        <BackBtn />
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Movement Record
            </Text>
          </Flex>
        </Box>
        <Box bg={"white"} p={1} borderRadius={"md"} w={"2xl"}>
          <RadioGroup defaultValue="2" m={6}>
            <Stack spacing={5} direction="row">
              <Radio colorScheme="red" value="1">
                All Employee Record
              </Radio>
              <Radio colorScheme="red" value="2">
                Single Employee Record
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Box borderRadius={"md"} bgColor={"white"} mt={"16"} p={4}>
          <Box w={"xs"}>
            <Input
              placeholder="Date From"
              mb={4}
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              placeholder="Date To"
              mb={4}
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              mb={6}
              onClick={showRecord}
              w={40}
            >
              {loading ? (
                <DotLoader
                  color={"#ffffff"}
                  loading={loading}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Show Records"
              )}
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Date </Th>
                  <Th>Employee</Th>
                  <Th>Time In</Th>
                  <Th>Time Out</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr></Tr>
              </Tbody>

              {/* <Box>
                <EmptyState msg={"No Data Available"} />
              </Box> */}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Layout>
  );
};

export default Movement;
