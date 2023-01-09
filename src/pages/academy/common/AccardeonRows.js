import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BG_URL, PUBLIC_URL } from '../../../utils/utils';
import { Link } from 'react-router-dom';
import { ReactComponent as Certif } from './certif.svg'
import { ReactComponent as Cours } from './cours.svg'
import { ReactComponent as EditImage } from './edit-image.svg'
import { ReactComponent as Editprofile } from './edit-profile.svg'
import { ReactComponent as Exit } from './exit.svg'
import { ReactComponent as Profile } from './profile.svg'
import { ReactComponent as Quiz } from './quiz.svg'
import { ReactComponent as Security } from './security.svg'
import { ReactComponent as Upload } from './upload.svg'
import { ReactComponent as Recipts } from './recipt-icon.svg'
import { ReactComponent as Verification } from './haghe-tadris.svg'
import { CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
    AcardeonRowBox: {
        display: "flex",
        width: "90%",
        paddingRight: "5px",
    },
    AcardeonRowBoxImageWrapper: {
        flex: 1,
        paddingTop: '7px'
    },
    AcardeonRowBoxImage: {
        width: "40px",
        fill: '#7a7574 !important'
    },
    AcardeonRowBoxImageSelected: {
        width: "40px",
        fill: '#64c5ba !important'
    },
    AcardeonRowDetailsBox: {
        flex: 5,
    },
    typo: {
        fontWeight: '600 !important',
        fontSize: '15px !important',
        color: '#7a7574 !important'
    },
    selectedItemText: {
        color: '#64c5ba !important',
        fontWeight: '600 !important',
        fontSize: '15px !important',

    },
    SelectedItemaccardeonDetailsText: {
        color: 'white !important',
        fontWeight: '600 !important',
        paddingRight: '10px'
    },
    selectedItemRow: {
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        fontWeight: '600 !important'
    },
    keshoi: {
        width: "10px",
    },
    accardeonDetailsImage: {
        width: "22px",
        fill: 'black !important'
    },
    selectedAccardeonDetailsImage: {
        width: "22px",
        fill: 'white !important'

    },
    accardeonDetailsText: {
        paddingRight: '5px',
        fontWeight: 600,
        color: '#7a7574 !important'
    },
    userPanelLinks: {
        textDecoration: 'none'
    },
    accardeonRows: {
        boxShadow: 'none !important'
    }
}))
export default function AccardeonRows({ name, defaultExpanded, isSelected, isFirstChildSelected, isSecondChildSelected, isThirdChildSelected, isFourthChildSelected, rowTitle, FirstchildLink, FirstchildImage, FirstchildText, secondChildLink, secondChildImage, secondChildText, thirdChildLink, thirdChildImage, thirdChildText, fourthchildLink, fourthchildImage, fourthchildText }) {
    const classes = useStyles()
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState(undefined)
    const { globalUser } = useSelector((state) => state.userReducer)

    useEffect(() => {
        if (name === "profile") {
            if (globalUser.image_url.indexOf("google") != -1) {
                setView(<div className={classes.AcardeonRowBoxImageSelected} style={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${globalUser.image_url}`)),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '25px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop: '-7px'
                }} />)
                setLoading(false)
            }
            else if (globalUser.image_url.length != 0) {
                setView(<div className={classes.AcardeonRowBoxImageSelected} style={{
                    backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${globalUser.image_url}`)),
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '25px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginTop: '-7px'
                }} />)
                setLoading(false)
            }
            else {
                setView(<Profile className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        }
        else if (name === "courses")
            if (isSelected) {
                setView(<Cours className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Cours className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "quiz")
            if (isSelected) {
                setView(<Quiz className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Quiz className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "certificates")
            if (isSelected) {
                setView(<Certif className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Certif className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "videoUpload")
            if (isSelected) {
                setView(<Upload className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Upload className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "recipts")
            if (isSelected) {
                setView(<Recipts className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Recipts className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "reqForTeacher")
            if (isSelected) {
                setView(<Verification className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<Verification className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "prerequisities")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/tree-icon.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/tree-icon.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "cats")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/tags.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/tags.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "products")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/p.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/p.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "ticket")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/ticket.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/ticket.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "post")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/post.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/post.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "comment")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/comment.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/comment.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "edituser")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/edit-profile.svg')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/edit-profile.svg')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "proposal")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/proposal.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/proposal.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }
        else if (name === "bit-quiz")
            if (isSelected) {
                setView(<img src={PUBLIC_URL('images/academy/proposal.png')} className={classes.AcardeonRowBoxImageSelected} />)
                setLoading(false)
            }
            else {
                setView(<img src={PUBLIC_URL('images/academy/proposal.png')} className={classes.AcardeonRowBoxImage} />)
                setLoading(false)
            }

    }, [])

    if (loading) return (<CircularProgress />)
    else return (
        <div className={classes.AcardeonRowBox}>
            <div className={classes.AcardeonRowBoxImageWrapper}>
                {view}
            </div>
            <div className={classes.AcardeonRowDetailsBox}>
                <Accordion className={classes.accardeonRows} defaultExpanded={defaultExpanded} >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {/* title for selected and not selected */}
                        {isSelected ?
                            <Typography className={classes.selectedItemText}>{rowTitle}</Typography> :
                            <Typography className={classes.typo}>{rowTitle}</Typography>
                        }
                    </AccordionSummary>
                    {/* first row for selected or not selected */}
                    {isFirstChildSelected ?
                        <div className={classes.selectedItemRow}>
                            <AccordionDetails>
                                <Link to={FirstchildLink} className={classes.userPanelLinks}>
                                    <img
                                        className={classes.selectedAccardeonDetailsImage}
                                        src={PUBLIC_URL(FirstchildImage)}
                                    />
                                    <span className={classes.SelectedItemaccardeonDetailsText}>
                                        {FirstchildText}
                                    </span>
                                </Link>
                            </AccordionDetails>
                        </div> :
                        <div>
                            <AccordionDetails>
                                <Link to={FirstchildLink} className={classes.userPanelLinks}>
                                    <img
                                        className={classes.accardeonDetailsImage}
                                        src={PUBLIC_URL(FirstchildImage)}
                                    />
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
                                        <img
                                            className={classes.selectedAccardeonDetailsImage}
                                            src={PUBLIC_URL(secondChildImage)}
                                        />
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {secondChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={secondChildLink} className={classes.userPanelLinks}>
                                        <img
                                            className={classes.accardeonDetailsImage}
                                            src={PUBLIC_URL(secondChildImage)}
                                        />
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
                                        <img
                                            className={classes.selectedAccardeonDetailsImage}
                                            src={PUBLIC_URL(thirdChildImage)}
                                        />
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {thirdChildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={thirdChildLink} className={classes.userPanelLinks}>
                                        <img
                                            className={classes.accardeonDetailsImage}
                                            src={PUBLIC_URL(thirdChildImage)}
                                        />
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
                                        <img
                                            className={classes.selectedAccardeonDetailsImage}
                                            src={PUBLIC_URL(fourthchildImage)}
                                        />
                                        <span className={classes.SelectedItemaccardeonDetailsText}>
                                            {fourthchildText}
                                        </span>
                                    </Link>
                                </AccordionDetails>
                            </div> :
                            <div>
                                <AccordionDetails>
                                    <Link to={fourthchildLink} className={classes.userPanelLinks}>
                                        <img
                                            className={classes.accardeonDetailsImage}
                                            src={PUBLIC_URL(fourthchildImage)}
                                        />
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
