import { Grid, makeStyles, TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react'
import Accordion from '../../components/Accordion';
import { Controls } from '../../components/controls/Controls';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';
import useTable from '../../components/useTable';

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
    { id:"ITEM CODE", label:"ITEM CODE" },
    { id:"ITEM", label:"ITEM" },
    { id:"QUANTITY", label:"QUANTITY" },
    { id:"REQUESTED BY", label:"REQUESTED BY" },
    { id:"REQUESTED FOR", label:"REQUESTED FOR" },
    { id:"DEPARTMENT", label:"DEPARTMENT" },
    { id:"DATE REQUESTED", label:"DATE REQUESTED" },
    { id:"DELIVERY DATE", label:"DELIVERY DATE" },
]

const genderItems = [
    {id:'approved', title:'Approved'},
    {id:'pending', title:'Pending Final Approval'},
]


function ApprovedIssue() {
  const classes = useStyles();
  const { TblContainer, TblHead, TblPagination } = useTable(headCells);
  return (
    <div className={classes.main}>
        <Header />
        <PageHeader title="Request Fulfilment" description="Home" page="Fulfilment"/>
        <Grid container>
          <Grid item md={12} className={classes.grid}>
            <Accordion summary="REQUESTS">
                <div className={classes.conatner}>
                    <div className={classes.radioGroup}>
                        <Controls.RadioGroup name="gender" items={genderItems}/>
                    </div>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            <TableRow>
                                <TableCell>001</TableCell>
                                <TableCell>Staff ID Card</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>AJIBOLA,  Adelowo</TableCell>
                                <TableCell>AJIBOLA,  Adelowo</TableCell>
                                <TableCell>Technology Services</TableCell>
                                <TableCell>17/3/2020</TableCell>
                                <TableCell>18/3/2020</TableCell>
                                <TableCell>Card for Test</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>001</TableCell>
                                <TableCell>Staff ID Card</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>AJIBOLA,  Adelowo</TableCell>
                                <TableCell>AJIBOLA,  Adelowo</TableCell>
                                <TableCell>Technology Services</TableCell>
                                <TableCell>17/3/2020</TableCell>
                                <TableCell>18/3/2020</TableCell>
                                <TableCell>Card for Test</TableCell>
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

export default ApprovedIssue