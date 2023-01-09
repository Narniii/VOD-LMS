import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
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
        marginTop: '60px',
        overflow: 'scroll',
        width: '100%'
    },
    singleBox: {
        border: '2px solid green',
        borderRadius: '20px',
        margin: '20px 35px',
        position: "relative",
        overflow: 'hidden',
        height: '30vh'
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

}));
export default function Posts() {
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
        try {
            apiCall.current = API.request('/post/all/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Valid token") {
                setCourses(response.data)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }


    return (
        <>
            <Helmet>
                <title>خبر ها</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"post"} secondChildSelected={true} />} />
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
                                <UserDashboard currentTab={"post"} secondChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {loading ? <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div> :
                                        <div className={classes.coursesInProgressWrapper}>
                                            <h3 className="mobile-only" style={{ textAlign: 'center', color: '#64c5ba' }}>خبر های ساخته شده</h3>
                                            <div className="row" style={{ height: '100%', padding: '0px 2%' }} >
                                                {courses.length != 0 ?
                                                    <>
                                                        {courses.map((course, index) => {
                                                            return <div className="col-md-6 col-lg-4" key={index}>
                                                                <CourseAndQuizCards
                                                                    link={`/post-preview/${course.slug}`}
                                                                    user={globalUser}
                                                                    bgImage={`https://api.aqua.ir:8283${course.image}`}
                                                                    title={
                                                                        course.title.length > 15 ? course.title.substring(0, 15) + "..." : course.title
                                                                    }
                                                                />
                                                            </div>
                                                            // <div className="col-md-4">
                                                            //     <div className={classes.singleBox}>
                                                            //         <div style={{
                                                            //             backgroundImage: BG_URL(PUBLIC_URL()),
                                                            //             backgroundSize: "cover",
                                                            //             backgroundPosition: 'center',
                                                            //             height: "15vh",
                                                            //         }} />
                                                            //         <div className="text-dark" style={{ padding: '10px ' }}>
                                                            //             {course.title.length > 15 ?
                                                            //                 <div>عنوان:{course.title.substring(0, 15) + "..."}</div> :
                                                            //                 <div>عنوان:{course.title}</div>
                                                            //             }
                                                            //             <div>
                                                            //                 {course.short_description.length > 15 ?
                                                            //                     <div>درباره دوره:<span>{course.short_description.substring(0, 15) + "..."}</span></div> :
                                                            //                     <div>عنوان:{course.short_description}</div>
                                                            //                 }
                                                            //             </div>
                                                            //             <div>
                                                            //                 <Link to={{ pathname:  }}>
                                                            //                     <div className="text-center"><button className={classes.greenBtn}>نمایش خبر</button></div>
                                                            //                 </Link>
                                                            //             </div>
                                                            //         </div>
                                                            //     </div>
                                                            // </div>
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
                                                            در حال حاضر خبری وجود ندارد
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