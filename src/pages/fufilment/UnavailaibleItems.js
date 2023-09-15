import { FormControl, FormControlLabel, Grid, makeStyles, Radio, RadioGroup, TableBody, TableCell, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Accordion from '../../components/Accordion';
import { Controls } from '../../components/controls/Controls';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import useTable from '../../components/useTable';
import { getUnavailaibleItems } from '../../services/fufilment';
import { convertXmlToJson } from '../../utils/xmlToJson';

const useStyles = makeStyles({
    main: {
      background: 'url(http://www.asset.bz/aims/admin/images/crossword.png)',
      height: "100vh",
      width: "100%"
    },
    grid: {
      padding: "15px",
    },
    mainGrid: {
        display: "flex"
    },
    conatner: {
        display: "flex",
        flexDirection: "column"
    },
    radioGroup: {
        display: "flex"
    }
})

const headCells = [
    { id:"STATUS", label:"STATUS" },
    { id:"ITEM DESCRIPTION", label:"ITEM DESCRIPTION" },
    { id:"QUANTITY", label:"QUANTITY" },
    { id:"INITIATOR", label:"INITIATOR" },
    { id:"REQUESTED DATE", label:"REQUESTED DATE" },
    { id:"TREATED BY", label:"TREATED BY" },
]


const radioItems = [
    {id:'pending', title:'Pending'},
    {id:'treated', title:'Treated'},
]

function UnavailaibleItems() {
    const classes = useStyles();
    const portalId = localStorage.getItem("portalId");
    const [status, setStatus] = useState("pending");
    const [filterFn, setFilterFn] = useState({fn : items => {return items;}});
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(headCells, filterFn);

    useEffect(() => {
        getUnavailaibleItems(portalId)
          .then((res) => {
              let json = convertXmlToJson(res.data);
              console.log(json)
            //   let items = json.ArrayOfStaffRequisitionsInfo.StaffRequisitionsInfo;
            //   if(items != null){
            //     setrequisitions(items);
            //       console.log("Null Item", requisitions);
            //     }
            //   console.log("Items", items);
              
          })
    }, [])

    const unavailabeRequest = () => {

    }

    const handleRadioChange = (e) => {
        setStatus(e.ta)
    }
  return (
    <div className={classes.main}>
        <Header />
        <PageHeader title="Process Items Not Available Request" description="Home" page=" Approvals"/>
        <Grid container>
          <Grid item md={12} className={classes.grid}>
            <Accordion summary="users list">
                <div className={classes.conatner}>
                    <div className={classes.radioGroup}>
                        <FormControl>
                            <RadioGroup row name="staus" onChange={handleRadioChange}>
                                {radioItems.map(item => (
                                    <FormControlLabel key={item.id} control={<Radio />} value={item.id}  label={item.title} ></FormControlLabel>
                                ))}
                                
                                <FormControlLabel control={<Radio />} value={status} onChange={handleRadioChange} label="Pending Final Approval"></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                        {/* <Controls.RadioGroup name="gender" items={genderItems} onChange/> */}
                    </div>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            <TableRow>
                                <TableCell><Controls.Button size="small" variant="contained" title="approved"/></TableCell>
                                <TableCell>Blower for removing dusts from our system 2. CM</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>Blower for removing dusts from our system 2. CM</TableCell>
                                <TableCell>24/6/2015</TableCell>
                                <TableCell>.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Controls.Button size="small" variant="contained" title="approved"/></TableCell>
                                <TableCell>Blower for removing dusts from our system 2. CM</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>Blower for removing dusts from our system 2. CM</TableCell>
                                <TableCell>24/6/2015</TableCell>
                                <TableCell>.</TableCell>
                            </TableRow>
                        </TableBody>
                    </TblContainer>
                </div>
            </Accordion>
          </Grid>
        </Grid>
    </div>
  )
}

export default UnavailaibleItems