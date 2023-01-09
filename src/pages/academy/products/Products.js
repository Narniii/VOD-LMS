import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import axios from 'axios'
import API from "../../../utils/api";
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
        height: '75vh',
        marginTop: '60px',
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
export default function Products(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProducts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (products.length != 0)
            setLoading(false)
    }, [products])
    // const getProducts = async() => {
    //     try {
    //         var myHeaders = new Headers();
    //         myHeaders.append(
    //           "Authorization",
    //           "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjozLCJleHAiOjE2NzQ0NjU5ODksImlhdCI6MTY0MjkyOTk4OX0.jo9slneTigcATZpFJr5IghPif5ZODufTCKFLbx2Mgrg"
    //         );

    //         var requestOptions = {
    //           method: "GET",
    //           headers: myHeaders,
    //           redirect: "follow",
    //         };

    //         fetch(`https://api.aqua.ir:8283/product/all`, requestOptions)
    //           .then((response) => response.json())
    //           .then((result) => {
    //             if (result.detail == "Not found.") {
    //               history.push("/404");
    //             } else if (result.message == "Valid token") {
    //               setProducts(result.data);
    //             }
    //           })
    //           .catch((error) => console.log("error", error));
    //       } catch (err) {
    //         setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    //       }

    // }
    const getProducts = async () => {
        try {
            apiCall.current = API.request('/product/all/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.data.length != 0) {
                setProducts(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Helmet>
                <title>محصولات</title>
            </Helmet>
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
                                <UserDashboard currentTab={"products"} secondChildSelected={true} />
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
                                            <div >
                                                <div className="row">
                                                    {products.map((product) => {
                                                        return <div className="col-md-4" key={product.id}>
                                                            <Paper style={{
                                                                display: 'flex',
                                                                justifyContent: "center",
                                                                minHeight: '30vh',
                                                                flexDirection: 'column',
                                                                marginBottom: '10px',
                                                                padding: '10px 20px'
                                                            }}>
                                                                <div style={{ width: '100%', textAlign: 'center', paddingBottom: '30px' }}>
                                                                    <img style={{ width: '40%' }} className={classes.courseThumbnail} src={PUBLIC_URL("images/academy/p.png")} />
                                                                </div>
                                                                <div className="text-dark">
                                                                    <span style={{ color: '#64c5ba' }}>نام درس:</span>
                                                                    &nbsp;
                                                                    <span >{product.course_info.slug}</span>
                                                                </div>
                                                                <div className="text-center">
                                                                    <Link style={{ display: 'inline-block', margin: '20px' }} to={{
                                                                        pathname: `/edit-product/${product.course_info.slug}`,
                                                                        state: { product }
                                                                    }}>
                                                                        <button style={{ width: '100%' }} className={classes.submitButton}>ویرایش محصول</button>
                                                                    </Link>
                                                                </div>
                                                            </Paper>
                                                        </div>

                                                    })}
                                                </div>

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