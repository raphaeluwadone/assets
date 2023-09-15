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

const ItemRequest = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}) => {
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // http://api.asset.bz/AssetManagerServices.asmx/RequisitionsNotAvailableByCreatedByList

  const submitCreator = async () => {
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/RequisitionsNotAvailableByCreatedByList",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          PortalId: user.PortalId,
        },
      });
      if (result) {
        console.log(result.data);
        // refresh
        navigate(0);
        setLoading(false);
        onClose();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      onClose();
    }
  };

  const requestItem = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/RequisitionsNotAvailableAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          PortalId: user.PortalId,
          ItemDescription: desc,
          Quantity: +qty,
        },
      });
      if (result) {
        console.log(result.data);
        // refresh
        submitCreator();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Item Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={requestItem}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              w={32}
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
                "Request Item"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ItemRequest;
