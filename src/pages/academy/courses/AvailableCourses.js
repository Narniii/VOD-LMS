import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import './Courses.css'
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
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
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        overflow: 'scroll',
        width: '100%',
        marginTop: '60px',
        padding: '10px 30px'
    },
    singleBox: {
        border: '2px solid green',
        borderRadius: '20px',
        margin: '20px 35px',
        position: "relative",
        overflow: 'hidden'
    },
    videoWrapper: {

    },
    videoThumbnail: {
        width: '100%'
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
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Spartan !important',
        fontSize: '12px',
        color: '#1d5643',
        fontWeight: 400
    },
    greenBtn: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '80%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    loadingSingleBox: {
        borderRadius: '40px',
        width: '100%',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: '10px'
        },
    },
}));
export default function AvailableCourses() {
    const dispatch = useDispatch()
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [views, setViews] = useState([])
    const [courses, setCourses] = useState([])
    useEffect(() => {
        getCourses().then(() => {
            setLoading(false)
        })
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    const getCourses = async () => {
        let tmp = []
        try {
            apiCall.current = API.request('/product/all/', false, {});
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == "Fetched successfully")
                if (response.data.length != 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].course_info.video_count != 0)
                            tmp.push(response.data[i])
                    }
                    setCourses(tmp)
                }
                else setCourses(tmp)
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const LoadingRow = () => {
        // console.log(window.innerWidth)
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 9; i++) {
                views.push(
                    <div className="col-md-4">
                        <div className={classes.loadingSingleBox} >
                            <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                            <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                        </div>
                    </div>
                )
            }

        else for (var i = 0; i < 3; i++) {
            views.push(
                <div className="col-md-4">
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '10px' }} />
                        <Skeleton variant="text" height={40} style={{ borderRadius: '10px' }} />
                    </div>
                </div>
            )
        }
        return views
    }
    return (
        <>
            <Helmet>
                <title>دوره های موجود</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"courses"} thirdChildSelected={true} />} />
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
                                <UserDashboard currentTab={"courses"} thirdChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {loading ?
                                        <div style={{ width: "100%" }}>
                                            <div className="row" style={{ margin: '20px 1%' }}>
                                                <LoadingRow />
                                            </div>
                                        </div>
                                        :
                                        <div className={classes.coursesInProgressWrapper}>
                                            <div className="row" style={{ height: '100%' }} >
                                                {courses.length != 0 ?
                                                    <>
                                                        {courses.map((course) => {
                                                            return <div className=" col-md-6 col-lg-4" key={course.id}>
                                                                <CourseAndQuizCards
                                                                    link={`/course-preview/${course.course_info.slug}`}
                                                                    user={globalUser}
                                                                    bgImage={`https://api.aqua.ir:8283${course.course_info.image}`}
                                                                    title={course.course_info.content}
                                                                />
                                                            </div>
                                                        })}
                                                    </>
                                                    :
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '100%'
                                                    }}>
                                                        <h4 style={{ color: '#64c5ba' }}>
                                                            در حال حاضر دوره‌ای وجود ندارد
                                                        </h4>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}