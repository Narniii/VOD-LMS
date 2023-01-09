import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useDispatch, useSelector } from "react-redux"
import './CreateCourse.css'
import Navbar from "../Navbar/Navbar";
import { Helmet } from "react-helmet";

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
        overflow: 'hidden',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesWrapper: {
        paddingTop: '8vh',
        width: '100%',
        padding: '0px 20px',
        overflow: 'scroll',
        height: '85vh',
    },
    videoBox: {
        padding: '10px 5px',
        margin: '10px 0px',
        overflow: 'hidden'
    },
    greenBtn: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '50%',
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
}));
export default function UploadedCourses() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [courses, setCourses] = useState(undefined)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCourses()
    }, [])
    const getCourses = async () => {
        try {
            apiCall.current = API.request('/course/author/', true, {
                teacher_id: globalUser.user_id
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            console.log(res)
            setCourses(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (courses != [] && courses != undefined)
            setLoading(false)
    }, [courses])
    return (
        <>
            <Helmet>
                <title>دوره های ساخته شده</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"videoUpload"} secondChildSelected={true} />} />
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
                                <UserDashboard currentTab={"videoUpload"} secondChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overflowHandler" >
                                <div className={classes.khakibox}>
                                    {loading ? <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div> :
                                        <div className={classes.coursesWrapper}>
                                            <h3 className="mobile-only text-center" style={{ color: '#64c5ba' }}>دوره های ساخته شده</h3>
                                            <div className="row text-dark">
                                                {courses.length == 0 ?
                                                    <div className="text-center" style={{ paddingTop: '20vh' }}>no course created by you</div> :
                                                    <>
                                                        {courses.map((course) => {
                                                            return <div className="col-md-4">
                                                                <Paper className={classes.videoBox}>
                                                                    <div style={{
                                                                        backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${course.image}`)),
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: 'center',
                                                                        height: "15vh",
                                                                    }} />
                                                                    {course.title.length > 15 ?
                                                                        <div>عنوان:{course.title.substring(0, 15) + "..."}</div> :
                                                                        <div>عنوان:{course.title}</div>
                                                                    }
                                                                    <div>درباره دوره:{course.content}</div>
                                                                    <div>
                                                                        {/* <Link to={`upload-new-video/${course.id}`}> */}
                                                                        <Link to={{ pathname: `course-preview/${course.slug}` }}>
                                                                            <div className="text-center"><button className={classes.greenBtn}>نمایش دوره</button></div>
                                                                        </Link>
                                                                    </div>
                                                                </Paper>
                                                            </div>
                                                        })}
                                                    </>
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