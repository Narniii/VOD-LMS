import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import axios from 'axios'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GenerateRandomCode from 'react-random-code-generator';
import TaskIcon from '@mui/icons-material/Task';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import CancelIcon from '@mui/icons-material/Cancel';
import Navbar from '../Navbar/Navbar'
import moment from 'jalali-moment'
const JDate = require('jalali-date');

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
        overflow: 'scroll !important',
        width: '100%',
    },
    container: {
        width: '100%',
        paddingRight: "6rem",
        paddingLeft: "6rem",
        marginRight: 'auto',
        marginLeft: 'auto',
        textAlign: "center",
    },
    paymentIcon: {
        width: '15vw !important',
        height: '15vh !important',
        color: 'red'
    },
    paymentIconSuccess: {
        width: '15vw !important',
        height: '15vh !important',
        color: 'green'
    },
    paper: {
        height: '40vh'
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
export default function ReciptPreviewFail(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const id = props.match.params.id
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [payment, setPayment] = useState(undefined)
    const [product, setProduct] = useState(undefined)
    const [course, setCourse] = useState(undefined)
    useEffect(() => {
        getPayment()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (payment != undefined)
            getProduct()
    }, [payment])
    useEffect(() => {
        if (product != undefined)
            getCourse()
    }, [product])
    useEffect(() => {
        if (course != undefined)
            setLoading(false)
    }, [course])
    const getPayment = async () => {
        try {
            apiCall.current = API.request(`/portal/payment/`, true, {
                payment_id: id
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Valid token") {
                setPayment(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const getProduct = async () => {
        if (payment != undefined){
            setProduct(payment.product_info)
        }
    }
    const getCourse = async () => {
        if (product != undefined){
            setCourse(product.course_info)
        }
    }
    return (
        <>
        <Navbar children={<UserDashboard currentTab={"quiz"} secondChildSelected={true} />} />

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
                            <UserDashboard currentTab={"recipts"} secondChildSelected={true} />
                        </div>

                        <div className="col-sm-9 overFlowHandler" >
                            <div className={classes.khakibox}>
                                <div className={classes.coursesInProgressWrapper}>
                                    {loading ? <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '85vh',
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div> :
                                        <div className={classes.container}>
                                            <Paper className={classes.paper}>
                                                <CancelIcon className={classes.paymentIcon} />
                                                <div className="text-dark">
                                                    <h2 style={{ color: 'black' }}>پرداخت شما موفقیت آمیز نبوده است</h2>
                                                    <div>عنوان درس:{course.title}</div>
                                                    <Link style={{ display: 'inline-block', margin: '20px' }} to={{ pathname: `/course-preview/${course.slug}` }}>
                                                        <button style={{ width: '100%' }} className={classes.greenBtn}>مشاهده محصول</button>
                                                    </Link>
                                                    <div></div>
                                                </div>
                                            </Paper>
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