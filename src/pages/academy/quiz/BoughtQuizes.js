import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import './Quizes.css'
import Navbar from '../Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import CourseAndQuizCards from "../../../common/cards/CourseAndQuizCards";
import { Skeleton } from "@mui/material";

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
        justifyContent: "center",
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
        borderRadius: '20px',
        padding: '20px',
        margin: '20px 35px',
        position: "relative",
        height: '30vh'
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
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Spartan !important',
        fontSize: '12px',
        color: '#1d5643',
        fontWeight: 400
    },
    wrapper: {
        display: "flex",
        height: "20vh",
        border: '1px solid green',
        padding: '20px',
        borderRadius: '10px',
        margin: '10px 0px',
        position: 'relative',
        overflow: 'hidden',
        flexDirection: 'column',
        textAlign: 'center'
    },
    bgImage: {
        height: '100%',
        width: '100%',
        backgroundSize: "auto 100%",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        transition: '0.5s ease',
        backgroundColor: ' rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'column',
        textDecoration: 'none',
        '&:hover': {
            opacity: 1,
        }
    },
    Btn: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
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
    loadingRowContainer: {
        marginTop: '100px',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px'
        },
    }
}));
export default function BoughtQuizes() {
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const { globalUser } = useSelector((state) => state.userReducer)
    const [quizes, setQuizes] = useState(undefined)
    const [courses, setCourses] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(undefined)
    const [products, setProducts] = useState(undefined)
    useEffect(() => {
        fetchData()
    }, [])
    useEffect(() => {
        if (done != undefined)
            setLoading(false)
    }, [done])
    const fetchData = async () => {
        var allQuizzes = [];
        try {
            apiCall.current = API.request('/product/all/', false, {});
            let response = await apiCall.current.promise;
            if (response.length == 0) {
                setDone([]);
                return;
            }
            if (response.message == "Fetched successfully") {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].course_info.video_count == 0) {
                        for (var j = 0; j < response.data[i].course_info.user_course.length; j++) {
                            let buyerUserId = response.data[i].course_info.user_course[j].user_id
                            if (buyerUserId == globalUser.user_id) {
                                var course_info = {}
                                course_info.course_short_description = response.data[i].course_info.short_description
                                course_info.course_image = response.data[i].course_info.image
                                course_info.course_slug = response.data[i].course_info.slug
                                let course_and_quiz_merged = {
                                    ...course_info,
                                    ...response.data[i].course_info.quizes
                                };
                                allQuizzes.push(course_and_quiz_merged)
                            }
                        }
                    }
                }
            }
            if (response.message !== "Fetched successfully") {
                throw new Error('failed to load courses');
            }
            setDone(allQuizzes);
        }
        catch (err) {
            console.log(err);
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const LoadingRow = () => {
        console.log(window.innerWidth)
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
            <Navbar children={<UserDashboard currentTab={"quiz"} secondChildSelected={true} />} />

            <section
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
                                <UserDashboard currentTab={"quiz"} secondChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {loading ?
                                        <div className={classes.loadingRowContainer}>
                                            <div className="row" style={{ margin: '20px 1%' }}>
                                                <LoadingRow />
                                            </div>
                                        </div>
                                        :
                                        <div className={classes.coursesInProgressWrapper}>
                                            <div style={{ padding: '10px 20px' }}>
                                                {done.length == 0 ?
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '65vh'
                                                    }}>
                                                        <h3 style={{ color: '#64c5ba' }}>کوییزی وجود ندارد</h3>
                                                    </div>
                                                    :
                                                    <div className="row ">
                                                        {done.map((quiz) => {
                                                            return <div className="col-md-6 col-lg-4" key={quiz.id}>
                                                                <CourseAndQuizCards
                                                                    link={`/course-preview/${quiz.course_slug}`}
                                                                    title={quiz.course_short_description}
                                                                    bgImage={`https://api.aqua.ir:8283${quiz.course_image}`}
                                                                />
                                                            </div>
                                                        })}
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