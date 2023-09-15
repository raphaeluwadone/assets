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
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddStockModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [branch, setBranch] = useState<undefined | any>();
  const [item, setItem] = useState<undefined | any>();
  const [storeLocation, setStoreLocation] = useState("");
  const [qty, setQty] = useState<string>();
  const [serialNumber, setSerialNumber] = useState("");
  const [itemCost, setItemCost] = useState<string>();
  const [purchasedBy, setPurchasedBy] = useState("");
  const [date, setDate] = useState("");

  const [, setLoading] = useState(false);
  const successToast = () =>
    toast.success("Success, item has been added", {
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

  const addItem = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/UsersAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {},
      });
      if (result) {
        console.log(result.data);
        successToast();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      errorToast();
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"3xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Menu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Item"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Store Location"
                  value={storeLocation}
                  onChange={(e) => setStoreLocation(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Serial Number"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Item Cost"
                  value={itemCost}
                  onChange={(e) => setItemCost(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Purchased By"
                  value={purchasedBy}
                  onChange={(e) => setPurchasedBy(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addItem}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              Add Item to Stock
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStockModal;
