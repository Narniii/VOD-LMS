import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../utils/api";
import { useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import NewUserDashboard from "../dashboard/NewDashboard";
const useStyles = makeStyles((theme) => ({
    container: {
        width: '80%',
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        background: '#2f3835',
        display: 'flex',
        minHeight: '60vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '0 auto'
    },
    paymentIcon: {
        width: '15vw !important',
        height: '15vh !important',
        color: 'red'
    },
    paymentIconSuccess: {
        width: '15vw !important',
        height: '15vh !important',
        color: '#64c5ba'
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
export default function NewReciptPreviewFail(props) {
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
        if (payment != undefined) {
            setProduct(payment.product_info)
        }
    }
    const getCourse = async () => {
        if (product != undefined) {
            setCourse(product.course_info)
        }
    }
    return (
        <NewUserDashboard currentTab={"recipts"} secondChildSelected={true}>
            {loading ? <div style={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                height: '85vh',
            }}>
                <CircularProgress style={{ color: "#64c5ba" }} />
            </div> :
                <div className={classes.container}>
                    <CancelIcon className={classes.paymentIcon} />
                    <h2>پرداخت شما موفقیت آمیز نبوده است</h2>
                    <div style={{ margin: '10px 0px' }}>عنوان درس:{course.title}</div>
                    <Link style={{ display: 'inline-block', margin: '20px' }} to={{ pathname: `/course-preview/${course.slug}` }}>
                        <button style={{ width: '100%' }} className={classes.greenBtn}>مشاهده محصول</button>
                    </Link>
                </div>
            }
        </NewUserDashboard >
    );
}