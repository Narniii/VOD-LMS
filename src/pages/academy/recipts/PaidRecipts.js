import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import axios from 'axios'
import Navbar from '../Navbar/Navbar'
import API from "../../../utils/api";
import OverLayComponent from "../common/OverLayComponent";
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        paddingTop: '10vh',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        overflow: 'scroll !important',
        width: '100%',
        padding: '10px 20px'
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    submitButton: {
        backgroundColor: '#64c5ba !important',
        border: '1px solid #64c5ba !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important'
    },
    whiteBtn: {
        backgroundColor: 'white !important',
        border: '1px solid #64c5ba !important',
        color: '#64c5ba !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '0px 10px'
    },
}));
export default function PaidRecipts(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [allPayments, setAllPayments] = useState(undefined)
    const [successfullPayments, setSuccessfullPayments] = useState(undefined)
    const [courses, setCourses] = useState(undefined)
    const [paymentWithCourseDetails, setPaymentWithCourseDetails] = useState(undefined)
    useEffect(() => {
        getAllPayments()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (allPayments != undefined)
            purchaseDetector()
    }, [allPayments])
    useEffect(() => {
        if (successfullPayments != undefined)
            getCourses()
    }, [successfullPayments])
    useEffect(() => {
        if (paymentWithCourseDetails != undefined)
            setLoading(false)
    }, [paymentWithCourseDetails])

    const getAllPayments = async () => {
        try {
            apiCall.current = API.request('/portal/payment/all/successful/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == 'Valid token') {
                if (response.data.length == 0)
                    setPaymentWithCourseDetails([])
                else setAllPayments(response.data)
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    const purchaseDetector = () => {
        if (allPayments != undefined) {
            setSuccessfullPayments([allPayments])
        }
    }
    const getCourses = async () => {
        if (successfullPayments != undefined) {
            setPaymentWithCourseDetails(successfullPayments)
        }
    }
    return (
        <>
            <Helmet>
                <title>پرداخت های موفق</title>
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
                                <UserDashboard currentTab={"recipts"} firstChildSelected={true} />
                            </div>
                            <div className="col-sm-9 overFlowHandler">
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
                                            <div >
                                                {allPayments.length == 0 ?
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '30vh',
                                                    }}>
                                                        <h3 style={{ color: '#64c5ba' }}>شما پرداختی نداشته‌اید</h3>
                                                    </div>
                                                    :
                                                    <div className="row">
                                                        {allPayments.map((payment) => {
                                                            return <div className="col-md-4">
                                                                <OverLayComponent image={"images/academy/paid-recipts.svg"} link={`/recipts-success/${payment.id}`} title={`${payment.product_info.course_info.title}`} />
                                                            </div>
                                                        })}
                                                    </div>
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