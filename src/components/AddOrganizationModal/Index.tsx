import {
  Box,
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
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IUser } from "../../pages/dashboard";
import axios from "axios";
import { useAxios } from "../../hooks/useAxios";
import toast from "react-hot-toast";

const AddOrganization = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoUrl] = useState("/no-logo.phf");
  const [signatureUrl] = useState("/no-signature.phf");

  //
  const navigate = useNavigate();
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  const { response: nationResponse }: { response: any } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/NationalityList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
  });

  const successToast = () =>
    toast.success("Success, organization has been added", {
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

  const addCompany = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/CompanyAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          AuthorizedSignUrl: signatureUrl,
          CompanyAddress: address,
          CompanyEmail: email,
          CompanyLogoUrl: logoUrl,
          CompanyName: name,
          ContactPersonName: contactPerson,
          CountryId: country,
          CreatedBy: user.CreatedBy,
          MobileNo: phone,
          hostname: "http://www.asset.bz/aims",
        },
      });
      if (result) {
        console.log(result.data);
        // refresh
        navigate(0);
        setLoading(false);
        setName("");
        setEmail("");
        setContactPerson("");
        setAddress("");
        setPhone("");
        setCountry("");
        onClose();
        successToast();
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
          <ModalHeader>Add Organization</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Contact Person"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />

                <Select
                  w={"90"}
                  h={"10"}
                  mb={"4"}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value={undefined}>Select Country</option>
                  {nationResponse &&
                    nationResponse.d.map((nation: any) => (
                      <option value={nation.Id}>{nation.CountryName}</option>
                    ))}
                </Select>
              </Flex>
              <Box
                w={"sm"}
                display={"flex"}
                justifyContent={"space-around"}
                flexDirection={"column"}
                alignItems={"center"}
              >
                <Box
                  h={"48"}
                  w={"48"}
                  rounded={"full"}
                  border={"2px"}
                  borderColor={"brandGrey.100"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"brandGrey.300"}
                  cursor={"pointer"}
                >
                  Upload Logo
                </Box>
                <Box
                  h={"24"}
                  w={"48"}
                  border={"2px"}
                  borderColor={"brandGrey.100"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  color={"brandGrey.300"}
                  cursor={"pointer"}
                >
                  Upload Signature
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addCompany}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              {loading ? "Adding Organization..." : "Add Organization"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrganization;
