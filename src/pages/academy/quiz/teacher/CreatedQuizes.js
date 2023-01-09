import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import '../Quizes.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
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
    quizBox: {
        padding: '10px 5px',
        margin: '10px 0px',
        overflow: 'hidden',
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
export default function CreatedQuizes() {
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const [quizes, seQuizes] = useState([])
    const { globalUser } = useSelector(state => state.userReducer)
    useEffect(() => {
        getQuizes().then(() => {
            setLoading(false)
        })
    }, [])
    const getQuizes = async () => {
        try {
            apiCall.current = API.request('/quiz/author/', true, {
                teacher_id: globalUser.user_id
            }, globalUser.accessToken)
            let res = await apiCall.current.promise
            console.log(res)
            if (res.message == 'Valid token') {
                seQuizes(res.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Helmet>
                <title>کوییز های ساخته شده</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"quiz"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9  overFlowHandler">
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        {loading ? <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '100%'
                                        }}>
                                            <CircularProgress style={{ color: "green" }} />
                                        </div>
                                            :
                                            <div className="row text-dark" style={{ padding: '10px 20px' }}>
                                                {quizes.length == 0 ?
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '60vh'
                                                    }}>
                                                        <h3 style={{ color: "green" }} >شما کوییزی نساخته‌اید</h3>
                                                    </div>
                                                    :
                                                    <>
                                                        {quizes.map((quiz) => {
                                                            return <div className="col-md-4" key={quiz.id}>
                                                                <Paper className={classes.quizBox}>
                                                                    <div style={{ marginTop: '20px' }} className="text-center">عنوان:{quiz.title}</div>
                                                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                                                        <button className="btn btn-md btn-outline-success" onClick={() => history.push(`/course-preview/${quiz.course_slug}`)}>لینک به دوره</button>
                                                                        <button className="btn btn-md btn-success" onClick={() => history.push(`quiz-preview/${quiz.id}`)}>نمایش کوییز</button>
                                                                    </div>
                                                                </Paper>
                                                            </div>
                                                        })}
                                                    </>
                                                }
                                            </div>
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