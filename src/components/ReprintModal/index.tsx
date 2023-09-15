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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { DotLoader } from "react-spinners";
import { IUser } from "../../pages/dashboard";

const ReprintModal = ({
  onClose,
  isOpen,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}) => {
  const [matNo, setMatNo] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const rePrint = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "GET",
        url: `api/image/enablereprint?MatricNumber=${matNo}&portalId=${user.PortalId}`,
        headers: {
          // no need to stringify
          accept: "*/*",
        },
      });
      if (result) {
        setLoading(false);
        console.log(result.data.status);
        toast({
          title: "Re-print",
          description: "Re-print has been triggered.",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Re-print",
        description: "Sorry, an error occured. Try again later.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please enter matric number</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Matric Number"
                  value={matNo}
                  onChange={(e) => setMatNo(e.target.value)}
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              onClick={rePrint}
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
                "Submit"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReprintModal;
