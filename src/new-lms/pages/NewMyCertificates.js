import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../utils/api";
import '../style/UserPanel.css';
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import CourseAndQuizCards from '../../common/cards/CourseAndQuizCards'
import { useMoralis, useNFTBalances } from "react-moralis";
import moment from 'jalali-moment'
import NewUserDashboard from "../dashboard/NewDashboard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: '80%',
        margin: '0 auto',
        [theme.breakpoints.down('xs')]: {
            width: '95%',
        },
        [theme.breakpoints.between('xs', 'md')]: {
            width: '80%',
        },
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
    certificatesWrapper: {
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        background: '#2f3835',
        margin: '20px 0px',
        paddingBottom: '30px'
    }
}));
export default function NewMyCertificates() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [err, setErr] = useState(undefined)
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
            <NewUserDashboard currentTab="certificates" firstChildSelected={true}>
                {!address ?
                    <div style={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        height: '100%',
                    }}>
                        <div className="text-center">
                            <h5>برای دیدن گواهی ها کیف پول خود را وصل کنید</h5>
                            <button style={{
                                margin: '15px auto',
                                height: "50px",
                                clipPath: 'polygon(10px 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 100%, 0 10px)'
                            }}
                                onClick={() => authenticate({ signingMessage: "Authorize linking of your wallet to see your certificates" })}
                                className="btn btn-md btn-success">وصل کردن کیف پول</button>
                        </div>
                    </div>
                    :
                    loading ? <div style={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        height: '100%',
                    }}>
                        <CircularProgress style={{ color: "#64c5ba" }} />
                    </div> :
                        <div className={classes.wrapper}>
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
                                                        <Link to={`/my-certificates/${certificate.id}`} style={{ textDecoration: 'none' }}>
                                                            <div className={classes.certificatesWrapper}>
                                                                <div style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${certificate.course_image}`)) }} className={classes.courseThumbnail} />
                                                                <div style={{ padding: '10px' }}>
                                                                    {certificate.course_title.length > 100 ?
                                                                        <div style={{ height: '50px' }}>{certificate.course_title.substring(0, 100) + "..."}</div> :
                                                                        <div style={{ height: '50px' }}>{certificate.course_title}</div>
                                                                    }
                                                                </div>
                                                                <div style={{ opacity: 0, fontSize: '12px' }}><span style={{ color: 'white' }}>قفل شده تا تاریخ: </span></div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                else {
                                                    return <div className="col-md-4" key={certificate.id}>
                                                        <div className={classes.certificatesWrapper}>
                                                            <div style={{ backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283${certificate.course_image}`)), filter: 'grayscale(2)' }} className={classes.courseThumbnail} />
                                                            <div style={{ padding: '10px' }}>
                                                                {certificate.course_title.length > 100 ?
                                                                    <div style={{ height: '50px' }}>{certificate.course_title.substring(0, 100) + "..."}</div> :
                                                                    <div style={{ height: '50px' }}>{certificate.course_title}</div>
                                                                }
                                                                <div style={{ color: 'red', fontSize: '12px' }}><span style={{ color: 'white' }}>قفل شده تا تاریخ: </span>&nbsp;{day}،&nbsp;{month}&nbsp;{year}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                            })}
                                        </div>
                                        <div className="text-center">
                                            <button onClick={() => {
                                                setAddress(undefined)
                                                logout()
                                                localStorage.removeItem("wallet")
                                            }} className="btn btn-md btn-danger" style={{
                                                clipPath: 'polygon(10px 0, 100% 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 100%, 0 10px)',
                                                height: "50px",
                                            }}>قطع کردن کیف پول</button>
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
                        </div>
                }
            </NewUserDashboard>

        </>
    );
}