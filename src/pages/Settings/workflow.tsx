import Layout from "../../components/layout";
import BackBtn from "../../components/backButton";
import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ChangeWorkflow from "../../components/ChangeWorkFlow";
import { IUser } from "../dashboard";
import axios from "axios";

const WorkFlow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flowValue, setFlowValue] = useState("");
  const [currentFlow, setCurrentFlow] = useState<any>()
  const [rolesFlow, setRolesFlow] = useState<any>()

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  // const { response: rolesFlow, loading }: { response: any; loading: boolean } =
  //   useAxios({
  //     method: "POST",
  //     url: "AssetManagerServices.asmx/RolesWorkFlowByPortalIdList",
  //     headers: {
  //       // no need to stringify
  //       accept: "*/*",
  //     },
  //     data: {
  //       PortalId: user.PortalId,
  //     },
  //   });

  // const { response: currentFlow }: { response: any } = useAxios({
  //   method: "POST",
  //   url: "AssetManagerServices.asmx/UtilityByNameGet",
  //   headers: {
  //     // no need to stringify
  //     accept: "*/*",
  //   },
  //   data: {
  //     PortalId: user.PortalId,
  //     UtilityName: "TemplateId",
  //   },
  // });

  // const changeFlowFn = async () => {
  //   try {
  //     const result = await axios.request({
  //       method: "POST",
  //       url: "AssetManagerServices.asmx/UtilityUpdate",
  //       headers: {
  //         // no need to stringify
  //         accept: "*/*",
  //       },
  //       data: {
  //         rfidInfo: {
  //           ControlTypeToUse: "",
  //           CreatedByUser: user.CreatedBy,
  //           CreatedDate: "2014-10-13T10:13:00.000Z",
  //           Id: 12,
  //           PortalId: user.PortalId,
  //           UtilityDescription: "0=Basic,1=Intermidiate and 2=Complex",
  //           UtilityName: "TemplateId",
  //           UtilityValue: flowValue,
  //         },
  //       },
  //     });
  //     if (result) {
  //       console.log(result.data);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     onClose();
  //   }
  // };

  useEffect(() => {
    const getCurrentFlow = async () => {
      try {
        const result = await axios.request({
          method: "POST",
          url: "AssetManagerServices.asmx/UtilityByNameGet",
          headers: {
            // no need to stringify
            accept: "*/*",
          },
          data: {
            PortalId: user.PortalId,
            UtilityName: "TemplateId",
          },
        });
        if (result) {
          console.log(result.data);
          setCurrentFlow(result.data.d)
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    const getRolesFlow = async () => {
      try {
        const result = await axios.request({
          method: "POST",
          url: "AssetManagerServices.asmx/RolesWorkFlowByPortalIdList",
          headers: {
            // no need to stringify
            accept: "*/*",
          },
          data: {
            PortalId: user.PortalId,
          },
        });
        if (result) {
          console.log(result.data);
          setRolesFlow(result.data.d)
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    getCurrentFlow()
    getRolesFlow()
  }, [])
  

  console.log(currentFlow);
  console.log(rolesFlow);

  // const simple = rolesFlow && rolesFlow.d.filter((r) => r.TemplateId == 0);
  // const standard = rolesFlow && rolesFlow.d.filter((r) => r.TemplateId == 1);
  // const complex = rolesFlow && rolesFlow.d.filter((r) => r.TemplateId == 2);


  return (
    <Layout>
      <>
        <ChangeWorkflow
          isOpen={isOpen}
          onClose={onClose}
          setFlowValue={setFlowValue}
        />
        <BackBtn />
        {console.log(flowValue)}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"9"}
        >
          <Flex direction={"column"}>
            <Text fontSize={"3xl"} fontWeight={"bold"} color={"brandRed.100"}>
              Workflow
            </Text>
          </Flex>
          <Box>
            <Button
              onClick={onOpen}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              Change work flow
            </Button>
          </Box>
        </Box>
        <Box
          bgColor={"white"}
          p={6}
          borderRadius={"xl"}
          border={"1px"}
          borderColor={"brandGrey.400"}
        >
          <>
            <TableContainer>
              <Table size="md">
                <>
                  <Thead>
                    <Tr>
                      <Th>Role</Th>
                      <Th>Type</Th>
                      <Th>Function</Th>
                    </Tr>
                  </Thead>
                  {/* <Tbody>
                    {(currentFlow && currentFlow.d.UtilityValue == 0
                      ? simple
                      : currentFlow.d.UtilityValue == 1
                      ? standard
                      : complex
                    ).map((flow) => (
                      <Tr>
                        <Td>{flow.RoleName}</Td>
                        <Td>{flow.CanBeSkipped ? "Optional" : "Mandatory"}</Td>
                        <Td>
                          {flow.IsFinalApproval ? "Approval" : "Initiator"}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody> */}
                </>
                {/* <Box>
                  <EmptyState msg={"No Workflows"} />
                </Box> */}
              </Table>
            </TableContainer>
          </>
        </Box>
      </>
    </Layout>
  );
};

export default WorkFlow;
