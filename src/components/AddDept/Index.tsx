import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IUser } from "../../pages/dashboard";
import { DotLoader } from "react-spinners";
import { useAxios } from "../../hooks/useAxios";
import toast from "react-hot-toast";

const AddDept = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  const { response: branchResponse }: { response: any; } =
    useAxios({
      method: "POST",
      url: "AssetManagerServices.asmx/CompanyBranchByPortalIdListAll",
      headers: {
        // no need to stringify
        accept: "*/*",
      },
      data: {
        PortalId: user.PortalId,
      },
    });

  const successToast = () =>
    toast.success("Success, department has been added", {
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

  const addDept = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/DepartmentAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          arrdInfo: [
            {
              CompanyBranchId: branch,
              CreatedBy: user.CreatedBy,
              DepartmentDetails: desc,
              DepartmentName: name,
              PortalId: user.PortalId,
            },
          ],
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        // refresh
        navigate(0);
        successToast();
        onClose();
        setName("");
        setDesc("");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      errorToast();
      setName("");
      setDesc("");
      onClose();
    }
  };

  console.log(branchResponse);

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Department</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Select
                  w={"90"}
                  h={"10"}
                  mb={"4"}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option value={undefined}>Select branch</option>
                  {branchResponse &&
                    branchResponse.d.map((branch: any) => (
                      <option value={branch.Id}>{branch.BranchName}</option>
                    ))}
                </Select>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Department name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Textarea
                  w={"sm"}
                  mb={"4"}
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addDept}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
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
                "Add Department"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDept;
