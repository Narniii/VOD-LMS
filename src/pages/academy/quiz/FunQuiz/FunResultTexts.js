import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CircularProgress, Divider, Hidden } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Helmet } from "react-helmet";


const useStyles = makeStyles((theme) => ({
    select: {
        borderRadius: "5px",
        border: "1px solid #f2f2f2"
    },
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
        marginTop: '10vh',
        overflow: 'scroll',
        width: '100%',
        padding: "20px"
    },
    quizContainer: {
        width: '80%',
        margin: '0 auto'
    },
    createQuizTitle: {
        color: '#64c5ba',
        fontSize: '30px'
    },
    subHeaders: {
        color: '#64c5ba',
        margin: '10px 0px'
    },
    quizCard: {
        backgroundColor: '#d8d8d8',
        padding: '10px 20px',
        borderRadius: '5px',
        margin: '10px 0px'
    },
    questionTitleWrapper: {
        display: 'block',
        width: '100%'
    },
    questionTitle: {
        fontWeight: 'bold',
        color: 'black'
    },
    questionDeleteIcon: {
        color: 'black',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    inputsWrapper: {
        margin: '10px 0px'
    },
    isCorrectIconCorrect: {
        width: '50px !important',
        height: '40px !important',
        color: 'green',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    isCorrectIconNotCorrect: {
        width: '50px !important',
        height: '40px !important',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    buttonsWrapper: {
        margin: '0 auto',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    loginDoneModal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '10%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none !important',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        outline: 'none'
    }
}));

const FunResultTexts = () => {
    const apiCall = useRef(undefined);
    const [modal, setModal] = useState(false)
    const classes = useStyles();
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { globalUser } = useSelector(state => state.userReducer)
    const temp = useState(
        [
            {
                level: "عالی بود",
                quotes: [
                    'یک نمونه متن',
                    'یک نمونه متن عالی',
                    'یک نمونه متن دیگه',
                    'اینم از این',
                    'اونم ازون',
                    'باریکلا خیلی بلدی',
                    'یک نمونه شمشما میتونی یه خفن شی',
                    'یک نمونه متن راضیم',
                    'راضی ام ازت'
                ]
            },
            {
                level: "خوب بود",
                quotes: [
                    'یک نمونه متن',
                    'یک نمونه متن خوب',
                    'یک نمونه متن دیگه',
                    'اینم از این',
                    'اونم ازون',
                    'باریکلا  بلدی',
                    'شما میتونی یه خفن شی',
                    'یک نمونه متن راضیم',
                    'راضی ام ازت'
                ]
            },
            {
                level: "متوسط بود",
                quotes: [
                    'یک نمونه متن',
                    'یک نمونه متن متوسط',
                    'یک نمونه متن دیگه',
                    'اینم از این',
                    'اونم ازون',
                    ' بدی',
                    'ی شما  شاید بعدا میتونی یه خفن شی',
                    'یک نمونه متن نا راضیم',
                    'راضی نیستم ازت'
                ]
            },
            {
                level: "ضعیف بود",
                quotes: [
                    'یک نمونه متن',
                    'یک نمونه متن ضعیف',
                    'یک نمونه متن دیگه',
                    'اینم از این',
                    'اونم ازون',
                    ' خیلی بدی',
                    'یک نمونه شما نمیتونی یه خفن شی',
                    'یک نمونه متن نا راضیم',
                    'راضی نیستم ازت'
                ]
            },
        ]
    )




    return (
        <>
            <Helmet>
                <title>ساخت متن نتایج </title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"bit-quiz"} thirdChildSelected={true} />} />
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
                            <div className="col-md-3 no-mobile">
                                <UserDashboard currentTab={"bit-quiz"} thirdChildSelected={true} />
                            </div>

                            <div className="col-md-9 overFlowHandler ">
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
                                            <>
                                                <h1 className={classes.createQuizTitle}>ساخت متن نتیجه جدید</h1>
                                            </>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
            <Modal
                open={modal}
                onClose={() => setModal(false)}
            >
                <div className={classes.loginDoneModal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ثبت تغییرات موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
        </>

    );
}

export default FunResultTexts;

