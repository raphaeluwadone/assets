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
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { DotLoader } from "react-spinners";

const AddMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [page, setPage] = useState<string>();
  const [desc, setDesc] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [iconClass, setIconClass] = useState<string>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  const successToast = () =>
    toast.success("Success, menu has been added", {
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

  const addMenu = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/PagesParentAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CreatedBy: user.CreatedBy,
          IconClass: iconClass,
          ListOrder: 16,
          PageDescription: desc,
          PageName: page,
          PageURL: url,
          ParentId: "0",
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        // refresh
        navigate(0);
        onClose();
        setDesc("");
        setIconClass("");
        setPage("");
        setUrl("");
        successToast();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setDesc("");
      setIconClass("");
      setPage("");
      setUrl("");
      errorToast();
      onClose();
    }
  };
  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
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
                  placeholder="Page"
                  value={page}
                  onChange={(e) => setPage(e.target.value as unknown as string)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value as unknown as string)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value as unknown as string)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Icon Class"
                  value={iconClass}
                  onChange={(e) =>
                    setIconClass(e.target.value as unknown as string)
                  }
                />
                {/* <Input w={"sm"} mb={"4"} placeholder="Parent" /> */}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addMenu}
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
                "Add Menu"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMenu;
