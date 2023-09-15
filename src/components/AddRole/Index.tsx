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
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { IUser } from "../../pages/dashboard";
import { DotLoader } from "react-spinners";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AddRole = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}) => {
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const successToast = () =>
  toast.success("Success, role has been added", {
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

  const addRole = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/RolesAsssetAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          IsFixed: false,
          PortalId: user.PortalId,
          RoleDescription: roleDesc,
          RoleName: roleName,
        },
      });
      if (result) {
        console.log(result.data);
        // refresh
        navigate(0);
        setLoading(false);
        setRoleDesc("");
        setRoleName("");
        successToast()
        onClose();
      }
    } catch (error: any) {
      setLoading(false);
      errorToast()
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Role"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Description"
                  value={roleDesc}
                  onChange={(e) => setRoleDesc(e.target.value)}
                />
                {/* <Input w={"sm"} mb={"4"} placeholder="Permission" /> */}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addRole}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              {loading ? (
                <DotLoader
                  color={"#ffffff"}
                  loading={loading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Create Role"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddRole;
