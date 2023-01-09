import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import UserDashboard from "../../pages/academy/common/UserDashboard";
import { useSelector } from "react-redux";
import axios from 'axios'
import Navbar from '../../pages/academy/Navbar/Navbar'
import API from "../../utils/api";
import OverLayComponent from "../../pages/academy/common/OverLayComponent";
import { Helmet } from "react-helmet";
import NewUserDashboard from "../dashboard/NewDashboard";
import NewQuizCards from "../comps/QuizCards/NewQuizCards";

const useStyles = makeStyles((theme) => ({
    reciptsWrapper: {
        width: '80%',
        margin: '0 auto',
        "@media (max-width: 576px)": {
            width: '100%'
        }
    },
    header: {
        color: '#64c5ba',
        marginTop: '30px',
        margin: '0px 20px',
        fontWeight: 'bold',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
}));
export default function NewPaidRecipts(props) {
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
            // console.log(response)
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
            <NewUserDashboard currentTab={"recipts"} firstChildSelected={true}>
                {loading ? <div style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    height: '85vh',
                }}>
                    <CircularProgress style={{ color: "#64c5ba" }} />
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
                            <div className={classes.reciptsWrapper}>
                                <h4 className={classes.header}>پرداختی های موفق</h4>
                                <div className="row">
                                    {allPayments.map((payment) => {
                                        return <div className="col-md-4" key={payment.id}>
                                            <NewQuizCards
                                                link={`/recipts-success/${payment.id}`}
                                                title={payment.product_info.course_info.title}
                                                bgImage={'/svg/success.svg'}
                                                description={payment.product_info.course_info.short_description}
                                                isFactor={true}
                                            />
                                        </div>
                                    })}
                                </div>
                            </div>
                        }

                    </div>
                }
            </NewUserDashboard>
        </>
    );
}