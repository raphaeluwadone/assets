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

const MakeRequisition = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUser;
}) => {
  const successToast = () =>
    toast.success("Success, request has been sent", {
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

  const [itemCategory, setItemCategory] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [requestedFor, setRequestedFor] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // AssetManagerServices.asmx/ItemsCategoryByPortalId

  // AssetManagerServices.asmx/ItemsByPortalIdList

  const addRole = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/StaffRequisitionsAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },

        // PortalId: $scope.user.PortalId, ItemId: null, Quantity: 1, Description: "",
        // DepartmentId: 1, RequestMadeForStaffId: null, DeliveryDate: null, CreatedBy: $scope.user.Id

        data: {
          CreatedBy: user.CreatedBy,
          PortalId: user.PortalId,
          ItemId: 1,
          Quantity: qty,
          RequestMadeForStaffId: requestedFor,
          DeliveryDate: deliveryDate,
          DepartmentId: 1,
          Description: additionalInfo,
        },
      });
      if (result) {
        console.log(result.data);
        // refresh
        navigate(0);
        successToast();
        setLoading(false);
        onClose();
      }
    } catch (error: any) {
      setLoading(false);
      errorToast();
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Make Requisition</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Item Category"
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                />
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
                  placeholder="Quantity"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Additional Information"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Requested For"
                  value={requestedFor}
                  onChange={(e) => setRequestedFor(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Delivery Date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  type="date"
                />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addRole}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
              w={"40"}
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
                "Make requisition"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MakeRequisition;
