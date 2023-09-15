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
import { DotLoader } from "react-spinners";
import { useAxios } from "../../hooks/useAxios";
import { IUser } from "../../pages/dashboard";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const CreateRecord = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [selectedBranch, setSelectedBranch] = useState<undefined | any>();
  const [selectedDept, setSelectedDept] = useState<undefined | any>();
  const [selectedRole, setSelectedRole] = useState([]);
  const [otherNames, setOtherNames] = useState("");
  const [surName, setSurName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [userSignUrl] = useState("/no-signature.phf");
  const [staffCode, setStaffCode] = useState("");
  const [positionId] = useState(0);
  const [photoUrl] = useState("/no-photo.phf");
  const [isSuperUser] = useState(false);
  const [isPortalAdmin] = useState(false);
  const [address, setAddress] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const {
    response: deptResponse,
    loading: deptLoading,
  }: { response: any; loading: boolean } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/DepartmentByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
  });
  const {
    response: roleResponse,
    loading: roleLoading,
  }: { response: any; loading: boolean } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/RolesAsssetByPortalIdList",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
  });
  const {
    response: branchResponse,
    loading: branchLoading,
  }: { response: any; loading: boolean } = useAxios({
    method: "POST",
    url: "AssetManagerServices.asmx/CompanyBranchByPortalIdListAll",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {
      PortalId: user.PortalId,
    },
  });
  if (deptLoading || roleLoading || branchLoading) {
    return (
      <Flex h={"md"} w={"full"} justifyContent={"center"} alignItems={"center"}>
        <DotLoader
          color={"#E1003A"}
          loading={deptLoading || roleLoading || branchLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Flex>
    );
  }
  console.log(branchResponse.d);
  console.log(deptResponse);
  console.log(roleResponse);

  const branchDept = deptResponse.d.filter(
    (dept: any) => dept.CompanyBranchId == selectedBranch
  );

  console.log(branchDept);
  console.log({ selectedBranch });

  const options = roleResponse.d.map((roleOptions: any) => ({
    label: roleOptions.RoleName,
    value: roleOptions.Id,
  }));

  const successToast = () =>
    toast.success("Success, record has been created", {
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

  const addUser = async () => {
    setLoading(true);
    try {
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/UsersAdd",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          Address: address,
          AddressCity: addressCity,
          AddressStreet: addressStreet,
          BranchId: selectedBranch,
          CreatedBy: user.CreatedBy,
          DepartmentId: selectedDept,
          IsActive: true,
          IsPortalAdmin: isPortalAdmin,
          IsSuperUser: isSuperUser,
          PhotoURL: photoUrl,
          PortalId: user.PortalId,
          PositionId: positionId,
          StaffCode: staffCode,
          UserSignURL: userSignUrl,
          email: email,
          hostname: "http://www.asset.bz/aims",
          isGuardian: false,
          othernames: otherNames,
          phonenumber: phoneNumber,
          surname: surName,
        },
      });
      if (result) {
        console.log(result.data);
        setLoading(false);
        // refresh
        navigate(0);
        successToast();
        onClose();
        setAddress("");
        setAddressCity("");
        setAddressStreet("");
        setStaffCode("");
        setEmail("");
        setPhoneNumber("");
        setOtherNames("");
        setSurName("");
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      errorToast();
      onClose();
    }
  };

  console.log(selectedDept);

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
                  placeholder="Staff Code"
                  value={staffCode}
                  onChange={(e) => setStaffCode(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Other Name"
                  value={otherNames}
                  onChange={(e) => setOtherNames(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Surname"
                  value={surName}
                  onChange={(e) => setSurName(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Select
                  w={"sm"}
                  mb={"4"}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                >
                  {branchResponse.d.map((branch: any, i: number) => (
                    <option key={i} value={branch.Id}>
                      {branch.BranchName}
                    </option>
                  ))}
                </Select>
                {selectedBranch ? (
                  <Select
                    w={"sm"}
                    mb={"4"}
                    onChange={(e) => setSelectedDept(e.target.value)}
                  >
                    {branchDept.map((dept: any, i: number) => (
                      <option key={i} value={dept.Id}>
                        {dept.DepartmentName}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <Select
                    w={"sm"}
                    mb={"4"}
                    placeholder="Select Department"
                  ></Select>
                )}
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
                  placeholder="Street"
                  value={addressStreet}
                  onChange={(e) => setAddressStreet(e.target.value)}
                />
                <Input
                  w={"sm"}
                  mb={"4"}
                  placeholder="City"
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                />
                <MultiSelect
                  options={options}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  labelledBy="Select"
                  className="multi-select"
                />
              </Flex>
              <Box
                w={"sm"}
                display={"flex"}
                justifyContent={"center"}
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
                  mb={8}
                >
                  <label
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    htmlFor="image-upload"
                  >
                    Upload Logo
                  </label>
                  <Input type="file" display={"none"} id="image-upload" />
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
                  <label
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    htmlFor="sign-upload"
                  >
                    Upload Signature
                  </label>
                  <Input type="file" display={"none"} id="sign-upload" />
                </Box>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={addUser}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              {loading ? "Creating User" : "Create User"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateRecord;
