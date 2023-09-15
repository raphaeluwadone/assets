import { Box, Button, Input } from "@chakra-ui/react";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import { useState } from "react";

const Export = () => {
  const [branch, setBranch] = useState({ abraka: "", asaba: "", oleh: "" });

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setBranch({ ...branch, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (branch.abraka || branch.asaba || branch.oleh) {
      //window.location.href = `https://uat.bts.com.ng/assetapi/api/image/dispatchList?[0].id=5&[0].BatchNo=${branch.abraka}&[1].id=6&[1].BatchNo=${branch.asaba}&[2].id=7&[2].BatchNo=${branch.oleh}`
      window.location.href = `http://api.asset.bz/api/image/dispatchList?[0].id=5&[0].BatchNo=${branch.abraka}&[1].id=6&[1].BatchNo=${branch.asaba}&[2].id=7&[2].BatchNo=${branch.oleh}`;
      setBranch({ abraka: "", asaba: "", oleh: "" });
    }
  };

  return (
    <Layout>
      <>
        <BackBtn />
        <Box
          bgColor={"white"}
          py={10}
          rounded={"sm"}
          display={"flex"}
          justifyContent={"center"}
        >
          <form onSubmit={handleSubmit}>
            <Box w={"lg"} p={4}>
              <Input
                my={4}
                placeholder="Enter BatchNos For Abraka"
                value={branch.abraka}
                onChange={handleInputChange}
              />
              <Input
                my={4}
                placeholder="Enter BatchNos For Asaba"
                value={branch.asaba}
                onChange={handleInputChange}
              />
              <Input
                my={4}
                placeholder="Enter BatchNos For Oleh"
                value={branch.oleh}
                onChange={handleInputChange}
              />
              <Box borderTop={"1px"} borderColor={"brandGrey.100"} mt={6}>
                <Box
                  w={"full"}
                  display={"flex"}
                  justifyContent={"center"}
                  mt={6}
                >
                  <Button
                    w={44}
                    h={16}
                    bgColor={"brandRed.100"}
                    _hover={{ bgColor: "brandRed.200" }}
                    textColor={"white"}
                    type="submit"
                  >
                    Export
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </>
    </Layout>
  );
};

export default Export;
