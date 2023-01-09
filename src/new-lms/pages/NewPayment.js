import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../utils/api";
import { useSelector } from "react-redux";
import TaskIcon from '@mui/icons-material/Task';
import CancelIcon from '@mui/icons-material/Cancel';
import NewUserDashboard from "../dashboard/NewDashboard";
import { Box } from "@mui/material";
const useStyles = makeStyles((theme) => ({
    container: {
        width: '70%',
        margin: '0 auto',
        textAlign: "center",
        height: '40vh',
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        background: '#2f3835',
        overflow: 'hidden',
        padding: '0px 0px 20px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    paymentIcon: {
        width: '15vw !important',
        height: '15vh !important',
        color: 'red'
    },
    paymentIconSuccess: {
        width: '15vw !important',
        height: '15vh !important',
        color: 'green',

    },
    greenBtn: {
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '0 auto',
        clipPath: 'polygon(10px 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 100%, 0 10px)',
        background: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
}));
export default function NwePayment(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const searchParams = new URLSearchParams(window.location.search);
    const Authority = searchParams.get('Authority');
    const Status = searchParams.get('Status');
    const [paymentStatus, setPaymentStatus] = useState(undefined)
    useEffect(() => {
        getsth()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (paymentStatus != undefined)
            setLoading(false)
    }, [paymentStatus])
    const getsth = async () => {
        try {
            apiCall.current = API.request(`/portal/verify-payment/?Authority=${Authority}&Status=${Status}`, false, {},);
            const response = await apiCall.current.promise
            if (response.message == "Transaction failed or canceled by user")
                setPaymentStatus("fail")
            else {
                setPaymentStatus("success")
                if (localStorage.getItem("discount_id") === null) {
                    // means user didn't use any discount code
                    //...
                } else {
                    var discount_id = localStorage.getItem("discount_id")
                    apiCall.current = API.request(`/product/discount/set-expire/`, true, { discount_id: discount_id }, globalUser.accessToken);
                    const response = await apiCall.current.promise
                    if (response.message == "Valid token") {
                        // discount code has expired
                        // ...
                    } else {
                        // something went wrong with expiring the discount code
                        // ...
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <NewUserDashboard
                currentTab={"recipts"} firstChildSelected={paymentStatus == "fail" ? false : true} secondChildSelected={paymentStatus == "fail" ? true : false}
            >
                {loading ? <div style={{
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    height: '85vh',
                }}>
                    <CircularProgress style={{ color: "#64c5ba" }} />
                </div> :
                    <>
                        {paymentStatus == "fail" ?
                            <Box className={classes.container}>
                                <CancelIcon className={classes.paymentIcon} />
                                <h2>پرداخت شما موفقیت آمیز نبود</h2>
                                <Link style={{ display: 'inline-block', margin: '20px' }} to={{ pathname: `/available-courses` }}>
                                    <div style={{ width: '100%' }} className={classes.greenBtn}>بازگشت به صفحه محصولات</div>
                                </Link>
                            </Box>
                            :
                            <div className={classes.container}>
                                <TaskIcon className={classes.paymentIconSuccess} />
                                <h2>پرداخت شما موفقیت آمیز بود</h2>
                                <Link style={{ display: 'inline-block', margin: '20px' }} to={{ pathname: `/welcome` }}>
                                    <button style={{ width: '100%' }} className={classes.greenBtn}>بازگشت به سایت</button>
                                </Link>
                            </div>
                        }
                    </>
                }
            </NewUserDashboard >
        </>
    );
}