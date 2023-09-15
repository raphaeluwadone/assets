import { makeStyles } from '@material-ui/core';
import React from 'react'
import { FaRegPaperPlane, FaShoppingCart } from "react-icons/fa";
import Card from '../../components/Card';
import Header from '../../components/Header';
import PageHeader from '../../components/PageHeader';

const useStyles = makeStyles({
    root: {
        background: 'url(http://www.asset.bz/aims/admin/images/crossword.png)',
        height: "100vh"
    },
    contents: {
        padding: "15px",
        marginBottom: "20px",
        display: "flex",
        flexWrap: "wrap"
    }
})

function Fufilment() {
    const classes = useStyles();
  return (
    <div className={classes.root}>
        <Header />
        <PageHeader title="Fulfilment" description="Issue requested items to employees"/>
        <div className={classes.contents}>
            <Card icon={<FaRegPaperPlane />} title="Issue Approved Items" description="Issue items duly approved to requesting employee" link="/fufilment/approvedIssue" />
            <Card icon={<FaShoppingCart />} title="Unavailable Items Log" description="Treat items required by employees that are not available in store" link="/fufilment/unavailaibleItem" />
        </div>
    </div>
  )
}

export default Fufilment