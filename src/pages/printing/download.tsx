import { Box, Button, Input, Text } from "@chakra-ui/react";
import Layout from "../../components/layout";
import { useAxios } from "../../hooks/useAxios";
import BackBtn from "../../components/backButton";
import ReprintModal from "../../components/ReprintModal";
import { useState } from "react";
import { IUser } from "../dashboard";
import axios from "axios";

const Download = () => {
  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );
  const [isOpen, setIsOpen] = useState(false);
  const [matNo, setMatNo] = useState<string | any>();
  const [count, setCount] = useState<number>(10);
  const { response }: { response: any } = useAxios({
    method: "GET",
    url: "api/image/count",
    headers: {
      // no need to stringify
      accept: "*/*",
    },
    data: {},
  });

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  // CFB/22/23/286945

  // http://api.asset.bz/api/image/download?MatricNumber=CFB/22/23/286945&portalId=5

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href =
      `http://api.asset.bz/api/image/download?MatricNumber=${matNo}&portalId=${user.PortalId}` as string;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bulkDownload = async () => {
    try {
      const result = await axios.request({
        method: "GET",
        url: `api/image/downloadbulk/${user.PortalId}/${count}`,
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {},
      });
      if (result) {
        console.log(result.data);
        const link = document.createElement("a");
        link.href =
          `http://api.asset.bz/api/image/downloadzip/${result.data}` as string;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error: any) {
      console.log(error);
      onClose();
    }
  };

  const uploadImage = async (uploadInput: any) => {
    try {
      const result = await axios.request({
        method: "POST",
        url: "api/image/upload",
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: [...uploadInput],
      });
      if (result) {
        console.log(result.data);
      }
    } catch (error: any) {
      console.log(error);
      onClose();
    }
  };

  const convertToBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(file);
    const uploadInput = {
      Base64String: base64,
      Name: File.name,
      PortalId: user.PortalId,
      UserId: user.Id,
    };
    uploadImage(uploadInput);
    // setPostImage({ ...postImage, myFile: base64 });
  };

  return (
    <Layout>
      <>
        <ReprintModal isOpen={isOpen} onClose={onClose} user={user} />
        <BackBtn />
        <Box
          bgColor={"white"}
          py={10}
          rounded={"sm"}
          display={"flex"}
          justifyContent={"center"}
        >
          <Box w={"lg"} p={4}>
            <Text textAlign={"center"} mb={4}>
              {response && `There are ${response} images ready for download`}
            </Text>
            <Input
              placeholder="Matric No"
              value={matNo}
              onChange={(e) => setMatNo(e.target.value)}
            />
            <Text textAlign={"center"} mt={8} mb={4}>
              Count per batch
            </Text>
            <Input
              placeholder="Count"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <Box>
              <Box
                w={"full"}
                display={"flex"}
                justifyContent={"space-between"}
                mt={8}
                borderTop={"1px"}
                borderColor={"brandGrey.100"}
                pt={8}
              >
                <Button
                  w={44}
                  h={12}
                  bgColor={"brandRed.100"}
                  _hover={{ bgColor: "brandRed.200" }}
                  textColor={"white"}
                  onClick={matNo ? downloadImage : bulkDownload}
                >
                  Download
                </Button>
                <Box
                  w={44}
                  h={12}
                  bgColor={"brandRed.100"}
                  _hover={{ bgColor: "brandRed.200" }}
                  textColor={"white"}
                  rounded={"md"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <label className="file_label" htmlFor="upload">
                    Upload
                  </label>
                  <Input
                    type="file"
                    id="upload"
                    display={"none"}
                    accept=".jpeg, .png, .jpg"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </Box>
              </Box>
              <Box
                w={"full"}
                display={"flex"}
                justifyContent={"center"}
                mt={10}
              >
                <Button
                  onClick={onOpen}
                  w={44}
                  h={16}
                  bgColor={"brandRed.100"}
                  _hover={{ bgColor: "brandRed.200" }}
                  textColor={"white"}
                >
                  Enable Reprint
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </Layout>
  );
};

export default Download;
