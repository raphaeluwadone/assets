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
import { useNavigate } from "react-router";
import { IUser } from "../../pages/dashboard";
import { DotLoader } from "react-spinners";
import toast from "react-hot-toast";

const AddPosition = ({
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
  const navigate = useNavigate();
  const successToast = () =>
    toast.success("Success, position has been added", {
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
  const addPosition = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/PositionAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          PortalId: user.PortalId,
          PositionDescription: desc,
          PositionName: name,
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        // refresh
        navigate(0);
        onClose();
        setName("");
        setDesc("");
        successToast();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setName("");
      setDesc("");
      errorToast();
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Position</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
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
              onClick={addPosition}
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
                "Add Position"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPosition;
