import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, responsiveFontSizes } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import './Quizes.css';
import Navbar from '../Navbar/Navbar'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import CourseAndQuizCards from "../../../common/cards/CourseAndQuizCards";

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
    },
    khakibox: {
        backgroundColor: '#f2f2f2',
        height: '85vh',
        width: '100%',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        marginTop: '60px',
        overflow: 'scroll',
        width: '100%'
    },
    singleBox: {
        border: '2px solid green',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px',
        borderBottomLeft: 'none',
        padding: '20px',
        margin: '20px 35px',
        position: "relative"
    },
    videoWrapper: {
        textAlign: 'center'
    },
    videoThumbnail: {
        width: '140px'
    },
    progressWrapper: {
        position: 'absolute',
        bottom: '-30px',
        left: '-35px'
    },
    progressImage: {
        width: '70px'
    },
    imageAndTxtWrapper: {
        position: 'relative'
    },
    progressPercentage: {
        position: 'absolute',
        top: ' 50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)'
    },
    loadingSingleBox: {
        borderRadius: '40px',
        width: '30%',
        margin: '10px',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
}));
export default function DoneQuizes() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [certificates, setCertificates] = useState(undefined)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        let certifs = []
        try {
            apiCall.current = API.request('/course/user/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            console.log(response)
            if (response.message == "Valid token")
                if (response.data.length == 0) {
                    setCertificates([]);
                    return;
                }
                else {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].quiz_score >= 80) {
                            let tmpObj = {}
                            tmpObj.course = response.data[i].course_info
                            certifs.push(tmpObj)
                        }
                    }
                    setCertificates(certifs)
                }
            else setCertificates([])
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (certificates != undefined) {
            setLoading(false)
        }
    }, [certificates])
    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 9; i++) {
                views.push(
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                        <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                    </div>)
            }
        else for (var i = 0; i < 3; i++) {
            views.push(
                <div className={classes.loadingSingleBox} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                    <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                </div>)
        }
        return views
    }
    return (
        <>
            <Helmet>
                <title>کوییز های گذرانده شده</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"quiz"} thirdChildSelected={true} />} />

            <section
                className={classes.wrapper}
                style={{
                    backgroundImage: BG_URL(PUBLIC_URL("images/bg.png")),
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center",
                    display: "flex",
                    height: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="container">
                    <div className={classes.whiteBox}>
                        <div className="row">
                            <div className="col-sm-3 no-mobile">
                                <UserDashboard currentTab={"quiz"} thirdChildSelected={true} />
                            </div>

                            <div className="col-sm-9  overFlowHandler">
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        {loading ? <LoadingRow /> :
                                            <>
                                                {certificates.length == 0 ?
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '100%'
                                                    }}>
                                                        <h3 style={{ color: '#64c5ba' }}>شما کوییزی نگذرانده‌اید </h3>
                                                    </div>
                                                    :
                                                    <div style={{ padding: '10px 1%' }}>
                                                        <div className="row" style={{ width: '100%' }}>
                                                            {certificates.map((certif) => {
                                                                return <div className="col-md-6 col-lg-4">
                                                                    <CourseAndQuizCards
                                                                        bgImage={`https://api.aqua.ir:8283${certif.course.image}`}
                                                                        title={certif.course.title}
                                                                        link={`/my-certificates`}
                                                                    />
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}