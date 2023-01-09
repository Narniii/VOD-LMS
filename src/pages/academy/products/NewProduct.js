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
import "./Products.css"
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
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        overflow: 'scroll !important',
        width: '100%',
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
        borderRadius: '5px !important',
        margin: '20px 0px'
    },
    inputsHeader: {
        color: '#64c5ba',
        fontSize: '20px',
        margin: '10px 0px'
    },
    modal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        [theme.breakpoints.down('xs')]: {
            padding: '30px',
            width: '300px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            padding: '0px 40px',
            margin: '10px',
            width: '400px',
            height: '400px',
        },
        "@media (min-width: 1200px)": {
            // paddingTop: '10px',
        },
    },
    container: {
        width: '100%',
        paddingRight: "5rem",
        paddingLeft: "5rem",
        marginRight: 'auto',
        marginLeft: 'auto',
    }
}));
export default function NewProduct(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [doneModal, setDoneModal] = useState(false)
    const [courses, setCourses] = useState([])
    const [price, setPrice] = useState(undefined)
    const [selectedCourse, setSelectedCourse] = useState(undefined)
    const onChange = (e) => {
        setPrice(e.target.value)
    }
    useEffect(() => {
        getCourses()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (courses.length != 0) {
            setLoading(false)
        }
    }, [courses])
    const getCourses = async () => {
        try {
            apiCall.current = API.request('/course/published/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Fetched successfully") {
                setCourses(response.data)
                console.log(response.data)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const dropDownHandler = (e) => {
        setSelectedCourse(e.nativeEvent.target.value)
    }
    const submitProduct = async (e) => {
        e.preventDefault()
        if (selectedCourse == undefined || selectedCourse == '' || selectedCourse == -1) {
            setError('لطفا درس را انتخاب کنید')
            return
        }
        if (price == undefined || price == '') {
            setError('لطفا قیمت را وارد کنید')
            return
        }
        else {
            setLoading(true)
            setError(undefined)
            try {
                const res = await axios.post(`https://api.aqua.ir:8283/product/create/`,
                    {
                        course_id: selectedCourse,
                        price: price
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${globalUser.accessToken}`
                        }
                    });
                if (res.data.message == "Valid token") {
                    setDoneModal(true)
                    setTimeout(() => {
                        history.push('/show-products')
                    }, 2000);
                }
                setLoading(false)
            } catch (err) {
                console.log(err.message)
                if (err.message == "Request failed with status code 302")
                    setError('این درس قبلا به عنوان محصول اضافه شده است.')
                else
                    setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
                setLoading(false)
            }
        }
    }

    return (
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
            <Helmet>
                <title>ایجاد محصول</title>
            </Helmet>
            <div className="container">
                <div className={classes.whiteBox}>
                    <div className="row">
                        <div className="col-sm-3 no-mobile">
                            <UserDashboard currentTab={"products"} firstChildSelected={true} />
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
                                        <div>
                                            <div className="text-center newproducts-inputs">
                                                <div className={classes.inputsHeader}>ایجاد محصول</div>
                                                <form>
                                                    <div className="newproducts-inputs">
                                                        <div className={classes.container}>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <div className={classes.inputsHeader}>انتخاب دوره</div>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <Form.Select onChange={dropDownHandler}>
                                                                        <option value={-1}>دوره</option>
                                                                        {courses.length != 0 ?
                                                                            <>
                                                                                {courses.map((course) => {
                                                                                    return <option key={course.id} value={course.id}>{course.title}</option>
                                                                                })}
                                                                            </>
                                                                            : undefined}
                                                                    </Form.Select>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className={classes.inputsHeader}>قیمت دوره به ریال</div>
                                                                </div>
                                                                <div className="col-md-9">
                                                                    <input className="form-control" value={price} name="price" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2 !important' }} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <button type="submit" className={classes.submitButton} onClick={submitProduct}>ثبت محصول</button>
                                                        {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal
                open={doneModal}
                onClose={() => setDoneModal(false)}
                disableBackdropClick
            >
                <div className={classes.modal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ثبت محصول موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
        </section >
    );
}