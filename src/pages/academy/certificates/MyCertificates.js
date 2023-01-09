import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import '../UserPanel.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CourseAndQuizCards from '../../../common/cards/CourseAndQuizCards'
import { useMoralis, useNFTBalances } from "react-moralis";
import moment from 'jalali-moment'

const useStyles = makeStyles((theme) => ({
    whiteBox: {
        backgroundColor: "white",
        borderRadius: "20px",
        height: "85vh",
    },
    khakibox: {
        backgroundColor: '#f2f2f2',
        minHeight: '85vh',
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
        overflow: 'scroll !important',
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
    card: {
        width: '100%',
        minHeight: '28vh',
        margin: '10px 0px',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            minHeight: '40vh',
            marginBottom: '20px',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            width: '100%',
            minHeight: '40vh',
            marginBottom: '20px',
        },
    },
    courseThumbnail: {
        width: '100%',
        height: '150px',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
    },
}));
export default function MyCertificates() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [err, setErr] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [certificates, setCertificates] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
    const { Moralis, authenticate, isAuthenticated, user, logout, account, isInitialized, web3 } = useMoralis();
    const [address, setAddress] = useState(undefined);
    const [stacked, setStaked] = useState(undefined);
    const [cryptoErr, setCryptoErr] = useState(undefined)
    useEffect(async () => {
        var localItem = localStorage.getItem('stakedCertficates')
        var stakedCertficates = await JSON.parse(localItem)
        // console.log(stakedCertficates)
        setStaked(stakedCertficates)
        getCertificates()
        const wallet = localStorage.getItem("wallet")
        if (wallet) {
            setAddress(wallet)
        }
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (certificates != undefined) {
            setLoading(false)
        }
    }, [certificates])
    const getCertificates = async () => {
        var certifArr = []
        try {
            apiCall.current = API.request('/certificate/all/', true, { user_id: globalUser.user_id }, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message = "Valid token") {
                for (var i = 0; i < response.data.length; i++) {
                    for (var t = 0; t < response.data[i].course_info.user_course.length; t++) {
                        if (response.data[i].course_info.user_course[t].id == response.data[i].user_course_id &&
                            response.data[i].course_info.user_course[t].user_id == globalUser.user_id) {
                            var course_info = {}
                            course_info.course_title = response.data[i].course_info.title
                            course_info.course_image = response.data[i].course_info.image
                            let course_and_cert_merged = {
                                ...course_info,
                                ...response.data[i]
                            };
                            certifArr.push(course_and_cert_merged)
                        }
                    }
                }
                // console.log(certifArr)
                setCertificates(certifArr)
            }
            else setCertificates([])
        }
        catch (err) {
            setErr('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    useEffect(() => {
        if (isAuthenticated) {
            localStorage.setItem("wallet", user.attributes.ethAddress)
            setAddress(user.attributes.ethAddress);
        }
    }, [isAuthenticated]);
    const sumbitPayment = async (price) => {
        await Moralis.enableWeb3()
        try {
            const options = {
                amount: Moralis.Units.ETH(price / 100000),
                receiver: "0xa7792E64b6F4787ee4Db4b2Ac8d7d8EC708cd186",
                type: "native",
            }
            const transaction = await Moralis.transfer(options);
        }
        catch (err) {
            console.log(err)
            console.log(err.message.indexOf('insufficient funds'))
            setCryptoErr('موجودی ولت شما کافی نیست')
        }
    }
    return (
        <>
            <Helmet>
                <title>گواهی های شما</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab="certificates" firstChildSelected={true} />} />
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
                                <UserDashboard currentTab="certificates" firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {!address ?
                                        <div className={classes.coursesInProgressWrapper}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: '100%',
                                            }}>
                                                <div className="text-center">
                                                    <h5 className="text-dark">برای دیدن گواهی ها کیف پول خود را وصل کنید</h5>
                                                    <button style={{ margin: '15px auto' }} onClick={() => authenticate({ signingMessage: "Authorize linking of your wallet to see your certificates" })} className="btn btn-md btn-warning">وصل کردن کیف پول</button>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={classes.coursesInProgressWrapper}>
                                            {loading ? <div style={{
                                                display: 'flex',
                                                alignItems: "center",
                                                justifyContent: "center",
                                                height: '100%',
                                            }}>
                                                <CircularProgress style={{ color: "green" }} />
                                            </div> :
                                                <>
                                                    {certificates.length != 0 ?
                                                        <>
                                                            <h3 className="mobile-only text-center" style={{ color: '#64c5ba' }}>گواهی های شما</h3>
                                                            <div style={{ padding: '20px 2%' }}>
                                                                <div className="row">
                                                                    {certificates.map((certificate) => {
                                                                        let flag = false
                                                                        let expirationTime = undefined
                                                                        let day
                                                                        let month
                                                                        let year
                                                                        if (stacked)
                                                                            for (var i = 0; i < stacked.length; i++) {
                                                                                if (stacked[i].id == certificate.id) {
                                                                                    flag = true
                                                                                    let date = stacked[i].createdAt
                                                                                    var dateInTimeStamp = Date.parse(date);
                                                                                    expirationTime = dateInTimeStamp + (24 * 60 * 60 * 1000)
                                                                                    expirationTime = new Date(expirationTime);
                                                                                    day = moment(expirationTime, 'YYYY/MM/DD').locale('fa').format('dddd ')
                                                                                    month = moment(expirationTime, 'YYYY/MM/DD').locale('fa').format('MMM')
                                                                                    year = moment(expirationTime, 'YYYY/MM/DD').locale('fa').format('yyyy ')
                                                                                    break;
                                                                                }
                                                                            }
                                                                        if (flag == false)
                                                                            return <div className="col-md-4" key={certificate.id}>
                                                                                <CourseAndQuizCards
                                                                                    link={`/my-certificates/${certificate.id}`}
                                                                                    title={certificate.course_title}
                                                                                    bgImage={`https://api.aqua.ir:8283${certificate.course_image}`}
                                                                                    toNftButton={<div className="text-center">
                                                                                        <div style={{ margin: 5, fontSize: '14px' }} className="btn btn-md btn-info" onClick={() => { sumbitPayment(certificate.course_info.price) }}>تبدیل به NFT</div>
                                                                                        <div style={{ color: 'red', fontSize: '14px',opacity:0 }}>
                                                                                            {cryptoErr ? cryptoErr : undefined}
                                                                                        </div>
                                                                                    </div>}
                                                                                />
                                                                            </div>
                                                                        else {
                                                                            return <div className="col-md-4" key={certificate.id}>
                                                                                <Paper className={classes.card} elevation={2}>
                                                                                    <div style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${certificate.course_image}`)), filter: 'blur(3px)' }} className={classes.courseThumbnail} />
                                                                                    <div style={{ padding: '10px' }}>
                                                                                        {certificate.course_title.length > 100 ?
                                                                                            <div style={{ height: '50px' }} className="text-dark">{certificate.course_title.substring(0, 100) + "..."}</div> :
                                                                                            <div style={{ height: '50px' }} className="text-dark">{certificate.course_title}</div>
                                                                                        }
                                                                                        <div style={{ color: 'red', fontSize: '12px' }}>
                                                                                            <span style={{ color: 'black' }}>قفل شده تا تاریخ: </span>
                                                                                            {day}،
                                                                                            &nbsp;
                                                                                            {month}
                                                                                            &nbsp;
                                                                                            {year}
                                                                                            {/* {day}،{month}&nbsp;{year} */}
                                                                                        </div>
                                                                                        <div className="text-center">
                                                                                            <div style={{ margin: 5, fontSize: '14px' }} className="btn btn-md btn-info" onClick={() => { sumbitPayment(certificate.course_info.price) }}>تبدیل به NFT</div>
                                                                                            <div style={{ color: 'red', fontSize: '14px' }}>
                                                                                                {cryptoErr ? cryptoErr : undefined}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </Paper >
                                                                            </div>
                                                                        }
                                                                    })}
                                                                </div>
                                                                <div className="text-center">
                                                                    <button onClick={() => {
                                                                        setAddress(undefined)
                                                                        logout()
                                                                        localStorage.removeItem("wallet")
                                                                    }} className="btn btn-md btn-danger">قطع کردن کیف پول</button>
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            height: '100%',
                                                        }}>
                                                            <div className="text-center">
                                                                <h3 style={{ color: '#64c5ba' }}> شما گواهی ندارید.</h3>
                                                                <button onClick={() => logout()} className="btn btn-md btn-danger">قطع کردن کیف پول</button>
                                                            </div>
                                                        </div>
                                                    }

                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
}