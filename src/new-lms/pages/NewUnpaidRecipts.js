import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
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
export default function NewUnPaidRecipts(props) {
    const { globalUser } = useSelector((state) => state.userReducer);
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true);
    const [allPayments, setAllPayments] = useState(undefined);
    const [unSuccessfullPayments, setUnSuccessfullPayments] = useState(undefined);
    const [paymentWithCourseDetails, setPaymentWithCourseDetails] = useState(undefined);
    useEffect(() => {
        getAllPayments();
        return () => {
            if (apiCall.current !== undefined) apiCall.current.cancel();
        };
    }, []);
    useEffect(() => {
        if (allPayments != undefined) purchaseDetector();
    }, [allPayments]);
    useEffect(() => {
        if (unSuccessfullPayments != undefined) getCourses();
    }, [unSuccessfullPayments]);
    useEffect(() => {
        if (paymentWithCourseDetails != undefined) setLoading(false);
    }, [paymentWithCourseDetails]);
    const getAllPayments = async () => {
        try {
            apiCall.current = API.request(
                "/portal/payment/all/unsuccessful/",
                true,
                {
                    user_id: globalUser.user_id,
                },
                globalUser.accessToken
            );
            const response = await apiCall.current.promise;
            if (response.message == "Valid token") {
                if (response.data.length == 0) setAllPayments([])
                else setAllPayments(response.data)
            }

        } catch (err) {
            console.log(err);
        }
    };
    const purchaseDetector = () => {
        if (allPayments != undefined) {
            let tmparr = [];
            let len = allPayments.length;
            for (var i = 0; i < len; i++) {
                if (allPayments[i].ref_id.length == 0) tmparr.push(allPayments[i]);
            }
            setUnSuccessfullPayments([allPayments]);
        }
    };
    const getCourses = async () => {
        if (unSuccessfullPayments != undefined) {
            setPaymentWithCourseDetails(unSuccessfullPayments);
        }
    };
    return (
        <>
            <Helmet>
                <title>پرداخت های ناموفق</title>
            </Helmet>
            <NewUserDashboard currentTab={"recipts"} secondChildSelected={true} >
                {loading ? (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "85vh",
                        }}
                    >
                        <CircularProgress style={{ color: "#64c5ba" }} />
                    </div>
                ) : (
                    <div>
                        {allPayments.length == 0 ?
                            <div style={{
                                display: 'flex',
                                alignItems: "center",
                                justifyContent: "center",
                                height: '60vh',
                            }}>
                                <h3 style={{ color: '#64c5ba' }}>شما پرداختی نداشته‌اید</h3>
                            </div>
                            :
                            <div className={classes.reciptsWrapper}>
                                <h4 className={classes.header}>پرداختی های ناموفق</h4>
                                <div className="row">
                                    {allPayments.map((payment) => {
                                        return (< div className="col-md-4" key={payment.id} >
                                            <NewQuizCards
                                                link={`/recipts-fail/${payment.id}`}
                                                title={payment.product_info.course_info.title}
                                                bgImage={'/svg/fail.svg'}
                                                description={payment.product_info.course_info.short_description}
                                                isFactor={true}
                                            />
                                        </div>
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                )}
            </NewUserDashboard>
        </>
    );
}
