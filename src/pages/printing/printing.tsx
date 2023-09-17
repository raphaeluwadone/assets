import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPrinter } from "react-icons/ai";
import EmptyState from "../../components/EmptyState";
import BackBtn from "../../components/backButton";
import Layout from "../../components/layout";
import { IUser } from "../dashboard";

const Print = () => {
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [type, setType] = useState("regular");
  const [catList, setCatList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [cardList, setCardList] = useState<any[]>([]);
  const [cardInfo, setCardInfo] = useState<any[]>([]);
  const [showIdViews, setShowIdViews] = useState(false);
  const [activeBtn, setActiveBtn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const user: IUser = JSON.parse(
    localStorage.getItem("user") as unknown as string
  );

  useEffect(() => {
    if (faculty && branch && category) {
      setActiveBtn(true);
    }
  }, [faculty, branch, category]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const result = await axios.request({
          method: "POST",
          url: "AssetManagerServices.asmx/ItemsCategoryByPortalId",
          headers: {
            // no need to stringify
            accept: "*/*",
          },
          data: {
            PortalId: user.PortalId,
          },
        });
        if (result) {
          // console.log(result.data.d);
          setCatList(result.data.d);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getBranch = async () => {
      try {
        const result = await axios.request({
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
        if (result) {
          console.log(result);
          setBranchList(result.data.d);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
    getBranch();
  }, []);

  useEffect(() => {
    const getFaculty = async () => {
      try {
        const result = await axios.request({
          method: "POST",
          url: "AssetManagerServices.asmx/DepartmentByCompanyBranchIdList",
          headers: {
            // no need to stringify
            accept: "*/*",
          },
          data: {
            CompanyBranchId: branch,
            PortalId: user.PortalId,
          },
        });
        if (result) {
          console.log(result);
          setFacultyList(result.data.d);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getFaculty();
  }, [branch]);

  const getAsset = async () => {
    setIsFetching(true);
    const url =
      type == "regular"
        ? "AssetManagerServices.asmx/RFIDTagsByCategoryIdBranchIdFacultyStatusList"
        : "AssetManagerServices.asmx/RFIDTagsByBranchIdFacultyReprintList";
    try {
      const result = await axios.request({
        method: "POST",
        url: url,
        headers: {
          // no need to stringify
          accept: "*/*",
        },
        data: {
          BranchId: branch,
          CategoryId: category,
          FacultyAccr: faculty,
          isAssigned: true,
        },
      });
      if (result) {
        console.log(result.data);
        setCardList(result.data.d);
        setIsFetching(false)
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false)
    }
  };
  const updateCardList = (card: any) => {
    const cardArray: any[] = [...cardInfo];
    console.log(cardInfo, "first");
    if (cardArray.includes(card)) {
      console.log("found");
      const ind = cardArray.indexOf(card);
      cardArray.splice(ind, 1);
      setCardInfo(cardArray);
      console.log(cardInfo);
    } else {
      console.log("Not found");

      const cardData = {
        PortalName: "Delta State University",
        LogoURL: "http://api.asset.bz/images/delsu_logo.png",
        Barcode: `http://api.asset.bz/images${card.BarcodeUrl}`,
        Firstname: card.OtherNames,
        Lastname: card.SurName,
        CodeValue: card.Barcode,
        Type: 201,
        HolderSignature: "http://api.asset.bz/images",
        AuthorizedSignature: "http://api.asset.bz/images/delsu_signature.png",
        Address: "P.M.B. 1, Abraka",
        Phone: "08035466066",
        Passport: `http://api.asset.bz/images${card.PhotoUrl}`,
        Department: card.DepartmentName,
        Hostname: "http://api.asset.bz/images",
        Branch: card.BranchName,
        PortalId: card.PortalId,
      };
      setCardInfo([...cardInfo, cardData]);
      console.log(cardInfo);
    }
  };

  // http://api.asset.bz/PDFdownloader.aspx?filename=IdcarddispatchCard

  // const ds = [
  //   {
  //     PortalName: "Delta State University",
  //     LogoURL: "http://api.asset.bz/images/delsu_logo.png",
  //     Barcode: "http://api.asset.bz/images/AssetImages/5/Barcode/78376.PNG",
  //     Firstname: "Favour Toluwalase",
  //     Lastname: "AJAGBE",
  //     CodeValue: "FOS/18/19/255200",
  //     Type: 201,
  //     HolderSignature: "http://api.asset.bz/images",
  //     AuthorizedSignature: "http://api.asset.bz/images/delsu_signature.png",
  //     Address: "P.M.B. 1, Abraka",
  //     Phone: "08035466066",
  //     Passport: "http://api.asset.bz/images/Users/5/Passport/78175.PNG",
  //     Department: "BIOCHEMISTRY",
  //     Hostname: "http://api.asset.bz/images",
  //     Branch: "Abraka",
  //     PortalId: 5,
  //   },
  // ];

  const getPdf = async (tagNum: number) => {
    const newCardInfo = cardInfo.map((card) => {
      card.Type = tagNum;
      return card;
    });
    console.log({ newCardInfo });
    const formData = new FormData();
    const payload = { TagJSON: newCardInfo };
    formData.append("", JSON.stringify(payload));

    let fileName: string;

    fetch("http://api.asset.bz/PDFdownloader.aspx", {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/form-data',
        TagJSON: JSON.stringify({ hasdata: true }),
      },
      body: formData,
    })
      .then((response) => {
        fileName = response.headers.get("filename") as unknown as string;
        response.json();
      })
      .then(() => {
        const form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "http://api.asset.bz/PDFdownloader.aspx");
        const inp = document.createElement("input");
        inp.setAttribute("type", "hidden");
        inp.setAttribute("name", "filename");
        inp.setAttribute("value", fileName);
        form.appendChild(inp);
        document.body.appendChild(form);
        form.submit();
      });
  };

  return (
    <Layout>
      <>
        <BackBtn />
        <Box p={4} px={48}>
          <Grid h="250px" templateColumns="repeat(1, 1fr)">
            <GridItem colSpan={2}>
              <Box display={"flex"} gap={6} alignItems={"center"} h={"full"}>
                <Box w={72}>
                  <label>Category</label>
                  <Select
                    w={"60"}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {!category && <option>Select Category</option>}
                    {catList.map((cat: any, i: number) => (
                      <option key={i} value={cat.Id}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w={72}>
                  <label>Type</label>
                  <Select w={"60"} onChange={(e) => setType(e.target.value)}>
                    <option value={"regular"}>Regular</option>
                    <option value={"re-print"}>Re-print</option>
                  </Select>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={2}>
              <Box display={"flex"} gap={6} alignItems={"center"} h={"full"}>
                <Box w={72}>
                  <label>Branch</label>
                  <Select w={"60"} onChange={(e) => setBranch(e.target.value)}>
                    {!branch && <option>Select Branch</option>}
                    {branchList.map((b: any, i: number) => (
                      <option key={i} value={b.Id}>
                        {b.BranchName}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w={72}>
                  <label>Faculty</label>
                  <Select w={"60"} onChange={(e) => setFaculty(e.target.value)}>
                    {!faculty && <option>Select Faculty</option>}
                    {facultyList.map((fac: any, i: number) => (
                      <option key={i} value={fac.DepartmentName}>
                        {fac.DepartmentName}
                      </option>
                    ))}
                  </Select>
                </Box>
              </Box>
            </GridItem>
            {type == "regular" ? (
              <GridItem colSpan={2}>
                <Box display={"flex"} gap={6} alignItems={"center"} h={"full"}>
                  <Box>
                    <label>Level</label>
                    <Select w={"60"}></Select>
                  </Box>
                  <Box></Box>
                </Box>
              </GridItem>
            ) : (
              ""
            )}
          </Grid>
          <Button
            mt={2}
            bgColor={"brandRed.100"}
            opacity={activeBtn ? 1 : 0.5}
            w={"4xs"}
            _hover={{ bgColor: activeBtn ? "brandRed.200" : "" }}
            color={"white"}
            onClick={activeBtn ? getAsset : () => null}
            disabled={activeBtn || !isFetching ? false : true}
            cursor={activeBtn ? "pointer" : "not-allowed"}
          >
            {!isFetching ? "Show" : "Loading..."}
          </Button>
        </Box>
        {cardInfo.length > 0 && (
          <Box
            mt={4}
            display={"flex"}
            alignItems={"center"}
            cursor="pointer"
            w={52}
            onClick={() => setShowIdViews(!showIdViews)}
          >
            <AiFillPrinter />
            <Box color={"brandRed.100"} ml={3}>
              Print selected item tags
            </Box>
          </Box>
        )}
        {showIdViews ? (
          <Box display={"flex"}>
            <Button
              variant={"outline"}
              borderColor={"blue.200"}
              textColor={"blue.200"}
              m={4}
              onClick={() => getPdf(100)}
            >
              Name tag
            </Button>
            <Button
              variant={"outline"}
              borderColor={"blue.200"}
              textColor={"blue.200"}
              m={4}
              onClick={() => getPdf(200)}
            >
              Landscape ID
            </Button>
            <Button
              variant={"outline"}
              borderColor={"blue.200"}
              textColor={"blue.200"}
              m={4}
              onClick={() => getPdf(300)}
            >
              Portrait ID
            </Button>
            <Button
              variant={"outline"}
              borderColor={"blue.200"}
              textColor={"blue.200"}
              m={4}
              onClick={() => getPdf(201)}
            >
              School ID
            </Button>
          </Box>
        ) : (
          ""
        )}
        <Box mt={8} bgColor={"white"}>
          {cardList.length > 0 ? (
            <TableContainer overflow={"visible"}>
              <Table size="md" overflow={"visible"}>
                <>
                  <Thead overflow={"visible"}>
                    <Tr>
                      <Th>
                        <Checkbox />
                      </Th>
                      <Th>Item</Th>
                      <Th>Description</Th>
                      <Th>Employee Code</Th>
                      <Th>Surname</Th>
                      <Th>Other names</Th>
                      <Th>Branch</Th>
                    </Tr>
                  </Thead>
                  <Tbody overflow={"visible"}>
                    {cardList &&
                      cardList.map((card, i) => (
                        <Tr key={i}>
                          <Td cursor={"pointer"}>
                            {" "}
                            <Checkbox
                              onChange={() => updateCardList(card)}
                              //  isChecked={true}
                            />
                          </Td>
                          <Td>{card.ItemName}</Td>
                          <Td>{card.ItemDescription}</Td>
                          <Td>{card.StaffCode}</Td>
                          <Td>{card.SurName}</Td>
                          <Td>{card.OtherNames}</Td>
                          <Td>{card.BranchName}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </>
              </Table>
            </TableContainer>
          ) : (
            <Box p={8}>
              <EmptyState msg={"No ID Cards Available"} />
            </Box>
          )}
        </Box>
      </>
    </Layout>
  );
};

export default Print;
