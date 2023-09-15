import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { DotLoader } from "react-spinners";

const ChangeWorkflow = ({
  onClose,
  isOpen,
  setFlowValue,
}: {
  onClose: () => void;
  isOpen: boolean;
  setFlowValue: any;
}) => {
  const [loading] = useState();
  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Workflow Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Select onChange={(e) => setFlowValue(e.target.value)} w={"sm"} cursor={"pointer"}>
                  <option value="0">Simple Workflow</option>
                  <option value="1">Standard Workflow</option>
                  <option value="2">Complex Workflow</option>
                </Select>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
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
                "Save"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeWorkflow;
