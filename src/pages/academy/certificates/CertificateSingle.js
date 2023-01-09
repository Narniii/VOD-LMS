import moment from 'jalali-moment'
import { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { Helmet } from 'react-helmet';
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';
import { Box, Modal } from '@mui/material';
import GenerateRandomCode from 'react-random-code-generator';
import axios from 'axios'

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
        justifyContent: "center",
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        marginTop: '60px',
        overflow: 'scroll',
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

    },
    videoThumbnail: {
        width: '100%'
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
    }
}));
export default function PassedCourse(props) {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const componentRef = useRef();
    const classes = useStyles();
    const id = props.match.params.id
    const [loading, setLoading] = useState(true)
    const [certif, setCertif] = useState(undefined)
    const [course, setCourse] = useState(undefined)
    const [day, setDay] = useState(undefined)
    const [month, setMonth] = useState(undefined)
    const [year, setYear] = useState(undefined)
    const [date, setDate] = useState(undefined)
    const [wallet, setWallet] = useState(undefined)
    const [modal, setModal] = useState(false)
    const [staked, setStaked] = useState(undefined)
    const [isNftLocked, setIsNftLocked] = useState(false)
    const [nowLocked, setNowLocked] = useState(false)
    const [discountLoading, setDiscountLoading] = useState(undefined)
    const [generatedCode, setGeneratedCode] = useState(undefined)
    useEffect(async () => {
        var localItem = localStorage.getItem('stakedCertficates')
        var stakedCertficates = await JSON.parse(localItem)
        lockDetector(stakedCertficates)
        setStaked(stakedCertficates)
        getCertificate()
        const address = localStorage.getItem("wallet")
        if (address)
            setWallet(address)
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (certif != undefined)
            getCourse()
    }, [certif])
    useEffect(() => {
        if (course != undefined)
            setLoading(false)
    }, [course])
    const getCertificate = async () => {
        try {
            apiCall.current = API.request(`/certificate/${id}`, false, {}, globalUser.accessToken);
            const res = await apiCall.current.promise
            if (res.message == "Valid token") {
                const postDate = moment(res.data.issued_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                setDate(postDate)
                setCertif(res.data)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است، لطفا مجددا امتحان کنید.')
        }
    }
    const getCourse = async () => {
        if (certif != undefined) {
            setCourse(certif.course_info)
        }
    }
    const uniqueDiscount = async (e) => {
        let code = GenerateRandomCode.TextNumCode(3, 4)
        code = code.toUpperCase()
        setDiscountLoading(true)
        try {
            const res = await axios.post(`https://api.aqua.ir:8283/product/discount/create/by-user`,
                {
                    offpercentage: 10,
                    short_description: `stake certificate->user:${globalUser.accessToken}, certificateId:${id}`,
                    code: `${code}`,
                    status: "unique",
                    user_discount_api_key: "nvy(6+82)%60ypdm-u"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            // console.log(res)
            if (res.data.message == "Valid token") {
                // console.log(res.data.data.code)
                setGeneratedCode(res.data.data.code)
                setDiscountLoading(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const lockcertif = async () => {
        var stakedCertficates = staked
        if (stakedCertficates != undefined && stakedCertficates != null) {
            // console.log(stakedCertficates)
            var newLockItem = {
                id: id,
                createdAt: new Date
            }
            stakedCertficates.push(newLockItem)
            localStorage.setItem("stakedCertficates", JSON.stringify(stakedCertficates))
            setNowLocked(true)
            uniqueDiscount()
        }
        else {
            let nfts = []
            var newLockItem = {
                id: id,
                createdAt: new Date
            }
            nfts.push(newLockItem)
            localStorage.setItem("stakedCertficates", JSON.stringify(nfts))
            setNowLocked(true)
            uniqueDiscount()
        }
    }
    const lockDetector = async (lockedNfts) => {
        // console.log(lockedNfts)
        var flag = false
        if (lockedNfts != null && lockedNfts != undefined) {
            for (var i = 0; i < lockedNfts.length; i++) {
                if (lockedNfts[i].id == id) {
                    flag = true;
                    break;
                }
            }
            if (flag) setIsNftLocked(true)
            else return
        }
        else {
            return
        }
    }

    return (
        <>
            <Navbar children={<UserDashboard currentTab={"certificates"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"certificates"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9  overFlowHandler">
                                <div className={classes.khakibox}>
                                    {loading ? <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div>
                                        :
                                        <>
                                            <Helmet>
                                                <title>گواهی {`${course.title}`}</title>
                                            </Helmet>
                                            <div className={classes.coursesInProgressWrapper}>
                                                {globalUser.last_name.length == 0 ?
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        height: '100%',
                                                    }}>
                                                        <span style={{ color: 'black' }}>
                                                            لطفا از بخش
                                                        </span>
                                                        <Link style={{ textDecoration: 'none', color: '#64c5ba' }} to="/edit-profile">&nbsp; ویرایش اطلاعات کاربری &nbsp;</Link>
                                                        <span style={{ color: 'black' }}>
                                                            پروفایل خود را تکمیل کنید.
                                                        </span>
                                                    </div>
                                                    :
                                                    <>
                                                        <div>
                                                            <div className='text-center'>
                                                                {certif.content != null ?
                                                                    <>
                                                                        <ReactToPrint
                                                                            trigger={() => <button className='btn btn-md btn-success'>دانلود به زبان فارسی</button>}
                                                                            content={() => componentRef.current}
                                                                        />
                                                                        <a href={`https://api.aqua.ir:8283${certif.content}`} target="_blank">
                                                                            <button className='btn btn-md btn-warning' style={{ marginRight: '10px' }}>دانلود به زبان دیگر</button>
                                                                        </a>
                                                                        {isNftLocked || nowLocked ?
                                                                            <div className='btn btn-md btn-secondary disabled' style={{ marginRight: '10px' }} > این گواهی قبلا قفل شده است</div>
                                                                            :
                                                                            <div className='btn btn-md btn-primary' style={{ marginRight: '10px' }} onClick={() => setModal(true)}>قفل کردن گواهی</div>
                                                                        }
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <ReactToPrint
                                                                            trigger={() => <button className='btn btn-md btn-success'>دانلود به زبان فارسی</button>}
                                                                            content={() => componentRef.current}
                                                                        />
                                                                        {isNftLocked || nowLocked ?
                                                                            <div className='btn btn-md btn-secondary disabled' style={{ marginRight: '10px' }} >این گواهی قبلا قفل شده است</div>
                                                                            :
                                                                            <div className='btn btn-md btn-primary' style={{ marginRight: '10px' }} onClick={() => setModal(true)}>قفل کردن گواهی</div>
                                                                        }
                                                                        <div className='text-center' style={{ color: '#64c5ba', margin: '10px' }}>برای دریافت گواهینامه به زبان دیگر لطفا از طریق چت با ادمین بیتداد تماس بگیرید.</div>
                                                                    </>
                                                                }
                                                            </div>
                                                            <ComponentToPrint
                                                                ref={componentRef}
                                                                firstName={globalUser.first_name}
                                                                lastname={globalUser.last_name}
                                                                ssid={globalUser.user_ssid}
                                                                courseTitle={course.title}
                                                                date={date}
                                                                id={certif.c_number}
                                                            />
                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </>

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                >
                    <Box sx={{
                        position: 'absolute',
                        width: { xs: '90vw', md: '50%' },
                        height: '300px',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        border: 'none !important',
                        padding: '20px',
                        margin: '10px',
                        borderRadius: '20px',
                        outline: 'none'
                    }} >
                        <div style={{ width: '100%', height: '100%' }}>
                            <h3 className="text-dark " style={{ textAlign: 'center' }}>قفل کردن گواهی</h3>
                            {isNftLocked ?
                                <div className='text-dark'>این گواهی قبلا قفل شده است</div>
                                :
                                nowLocked ?
                                    <>
                                        <div style={{ color: '#64c5ba', textAlign: 'center' }}>گواهی شما با موفقیت قفل شد</div>
                                        <div className='text-english' style={{ color: 'black', textAlign: 'center' }}>
                                            <span>
                                                کد تخفیف شما:&nbsp;
                                            </span>
                                            {discountLoading ?
                                                <span><CircularProgress /></span>
                                                :
                                                <span style={{ color: 'green' }}>
                                                    {generatedCode}
                                                </span>
                                            }
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div className='text-dark'>شما میتوانید با قفل{`(stake)`} کردن گواهی خود به مدت یک هفته از کد تخفیف بهره مند شوید</div>
                                        <div className='btn btn-md btn-warning' onClick={() => { lockcertif() }}>قفل کردن گواهی</div>
                                    </>
                            }
                        </div>
                    </Box>
                </Modal>
            </section >
        </>
    );
}
