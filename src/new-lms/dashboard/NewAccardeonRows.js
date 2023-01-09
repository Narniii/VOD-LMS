import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    AcardeonRowBox: {
        display: "flex",
        width: "100%",
        color: 'white'
    },
    AcardeonRowDetailsBox: {
        flex: 5,
        color: 'white'
    },
    typo: {
        fontWeight: '600 !important',
        fontSize: '15px !important',
        color: 'white'
    },
    selectedItemText: {
        color: '#64c5ba',
        fontWeight: '600 !important',
        fontSize: '15px !important',

    },

    selectedItemRow: {
        color: '#536d66',
        fontWeight: '600 !important',
        fontSize: '12px',
    },
    SelectedItemaccardeonDetailsText: {
        color: '#64c5ba',
        paddingRight: '10px',
        fontSize: '13px',
        paddingRight: '10px'
    },
    accardeonDetailsText: {
        paddingRight: '10px',
        color: 'lightgrey',
        fontSize: '13px',

    },
    userPanelLinks: {
        textDecoration: 'none',
        color: 'white'
    },
    accardeonRows: {
        boxShadow: 'none !important'
    },
    ExpandIcon: {
        color: 'white'
    }
}))
export default function NewAccardeonRows({ name, defaultExpanded, isSelected, isFirstChildSelected, isSecondChildSelected, isThirdChildSelected, isFourthChildSelected, rowTitle, FirstchildLink, FirstchildImage, FirstchildText, secondChildLink, secondChildImage, secondChildText, thirdChildLink, thirdChildImage, thirdChildText, fourthchildLink, fourthchildImage, fourthchildText }) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(undefined)
    const { globalUser } = useSelector((state) => state.userReducer)
    return (
        <div className={classes.AcardeonRowBox}>
            <div className={classes.AcardeonRowDetailsBox}>
                <Accordion className={classes.accardeonRows} defaultExpanded={defaultExpanded} >
                    {/* title for selected and not selected */}
                    <AccordionSummary expandIcon={<ExpandMoreIcon className={classes.ExpandIcon} />}>
                        {isSelected ?
                            <Typography className={classes.selectedItemText}>{rowTitle}</Typography>
                            :
                            <Typography className={classes.typo}>{rowTitle}</Typography>
                        }
                    </AccordionSummary>
                    {/* first row for selected or not selected */}
                    {isFirstChildSelected ?
                        <div className={classes.selectedItemRow}>
                            <AccordionDetails>
                                <Link to={FirstchildLink} className={classes.userPanelLinks}>
                                    <span className={classes.SelectedItemaccardeonDetailsText}>
                                        {FirstchildText}
                                    </span>
                                </Link>
                            </AccordionDetails>
                        </div> :
                        <div>
                            <AccordionDetails>
                                <Link to={FirstchildLink} className={classes.userPanelLinks}>
                                    <span className={classes.accardeonDetailsText}>
                                        {FirstchildText}
                                    </span>
                                </Link>
                            </AccordionDetails>
                        </div>
                    }
                    {/* second row for selcted or not selected */}
                    {secondChildText !== undefined ?
                        isSecondChildSelected ?
                            <div className={classes.selectedItemRow} >
                                <AccordionDetails>
                                    <Link to={secondChildLink} className={classes.userPanelLinks}>
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {secondChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={secondChildLink} className={classes.userPanelLinks}>
                                        <span className={classes.accardeonDetailsText}>
                                            {secondChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div>
                        :
                        undefined
                    }
                    {thirdChildText !== undefined ?
                        isThirdChildSelected ?
                            <div className={classes.selectedItemRow} >
                                <AccordionDetails>
                                    <Link to={thirdChildLink} className={classes.userPanelLinks}>
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {thirdChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={thirdChildLink} className={classes.userPanelLinks}>
                                        <span className={classes.accardeonDetailsText}>
                                            {thirdChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div>
                        :
                        undefined
                    }
                    {fourthchildText !== undefined ?
                        isFourthChildSelected ?
                            <div className={classes.selectedItemRow} >
                                <AccordionDetails>
                                    <Link to={fourthchildLink} className={classes.userPanelLinks}>
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {fourthchildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={fourthchildLink} className={classes.userPanelLinks}>
                                        <span className={classes.accardeonDetailsText}>
                                            {fourthchildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div>
                        :
                        undefined
                    }
                </Accordion>
            </div >
        </div >
    )
}
