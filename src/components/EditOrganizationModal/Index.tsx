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
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../../pages/dashboard";
import axios from "axios";
import { useNavigate } from "react-router";

interface IOrganization {
  AuthorizedSignUrl: string;
  CompanyAddress: string;
  CompanyEmail: string;
  CompanyLogoUrl: string;
  CompanyName: string;
  ContactPersonName: string;
  CountryId: number;
  CountryName: string;
  CreatedBy: number;
  DateCreated: string;
  Id: number;
  MobileNo: string;
  Password: string;
  PlanId: number;
  SubId: number;
}

const EditOrganization = ({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: IOrganization;
}) => {
  console.log(data);
  const [name, setName] = useState(data.CompanyName);
  const [address, setAddress] = useState(data.CompanyAddress);
  const [email, setEmail] = useState(data.CompanyEmail);
  const [phone, setPhone] = useState(data.MobileNo);
  const [contactPerson, setContactPerson] = useState(data.ContactPersonName);
  const [country, setCountry] = useState(data.CountryId);
  const [loading, setLoading] = useState(false);
  const [logoUrl] = useState(data.CompanyLogoUrl);
  const [signatureUrl] = useState(data.AuthorizedSignUrl);

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const navigate = useNavigate();
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

  const editCompany = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/CompanyUpdate",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          tInfo: {
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
        },

        // CompanyNameWrapped
        // :
        // "<a class='edit-wrapper' ref='1068'>Astro</a>"
        // Controls
        // :
        // "<img src='images/close.png' ref='1068' class='ParentControls Delete'/><img src='images/edit.png' ref='1068' class='ParentControls Edit'/>"
        // CountryName
        // :
        // "Nigeria"
        // DT_RowId
        // :
        // 1068
        // DateCreated
        // :
        // "2014-10-13T10:13:00.000Z"
        // Delete
        // :
        // "<img src='images/close.png' ref='1068' class='ParentControls Delete'/>"
        // Edit
        // :
        // "<img src='images/edit.png' ref='1068' class='ParentControls Edit'/>"
        // Id
        // :
        // 1068
        // LogoImage
        // :
        // "<img class=\"table-inner-image\" src=\"http://api.asset.bz/images/no-logo.phf\" />"
        // Password
        // :
        // null
        // PlanId
        // :
        // 0
        // SignImage
        // :
        // "<img class=\"table-inner-image\" src=\"http://api.asset.bz/images/no-signature.phf\" />"
        // SubId
        // :
        // 0
        // __type
        // :
        // "Asset_BE.Company"
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
        onClose();
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);

      onClose();
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={"3xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Organization</ModalHeader>
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
                  value={country}
                  onChange={(e) =>
                    setCountry(e.target.value as unknown as number)
                  }
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
              onClick={editCompany}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              {loading ? "Updating Organization..." : "Update Organization"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditOrganization;
