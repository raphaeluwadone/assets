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
  Select,
} from "@chakra-ui/react";
import { IUser } from "../../pages/dashboard";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import axios from "axios";

const AddBranch = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // AssetManagerServices.asmx/StatesGetByCountryCode
  const [states, setStates] = useState([]);
  const [, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
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


  useEffect(() => {
    const getLocation = async () => {
      const nationResult = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/NationalityList",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CountryCode: nationResponse.CountryCode,
        },
      });
      // setStates(result.d)
      console.log(nationResult.data.d);
      setCountries(nationResult.data.d);
    };

    getLocation();
    // console.log(states)
  }, []);

  useEffect(() => {
    const getState = async () => {
      
      const result = await axios.request({
        method: "POST",
        url: "AssetManagerServices.asmx/StatesGetByCountryCode",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          CountryCode: country,
        },
      });
      setStates(result.data.d);
      // console.log(states)
    };

    getState();
    console.log(states);
    // console.log(country);
  }, [country]);

  return (
    <>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Branch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection={"column"}>
                <Input w={"sm"} mb={"4"} placeholder="Branch Name" />
                <Select
                  w={"90"}
                  h={"10"}
                  mb={"4"}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value={undefined}>Select Country</option>
                  {countries &&
                    countries.map((nation: any) => (
                      <option value={nation.CountryCode}>
                        {nation.CountryName}
                      </option>
                    ))}
                </Select>
                <Select
                  w={"90"}
                  h={"10"}
                  mb={"4"}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value={undefined}>Select State</option>
                  {states &&
                    states.map((state: any) => (
                      <option value={state.ID}>
                        {state.StateName}
                      </option>
                    ))}
                </Select>
                <Input w={"sm"} mb={"4"} placeholder="Location" />
                <Input w={"sm"} mb={"4"} placeholder="Other Information" />
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              bgColor={"brandRed.100"}
              color={"white"}
              _hover={{ bgColor: "brandRed.200" }}
            >
              Add Branch
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddBranch;
