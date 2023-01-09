import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector, useDispatch } from "react-redux";
import CampaignIcon from '@mui/icons-material/Campaign';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
        borderRadius: '20px',
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
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Spartan !important',
        fontSize: '12px',
        color: '#1d5643',
        fontWeight: 400
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
    redBtn: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: 'red',
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
    offbtn: {
        border: 'none',
        padding: '10px 10px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '50%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '10px 5px',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    modal: {
        position: 'absolute',
        width: '400px',
        height: '200px',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none !important',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        outline: 'none'
    }
}));
export default function EditPostStatus(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState(undefined)
    const [modalOpen, setModalOpen] = useState(false)
    const [apiLoading, setApiLoading] = useState(false)
    const [switchView, setSwitchView] = useState(false)
    const [success, setSuccess] = useState(undefined)

    let slug = props.match.params.slug
    useEffect(() => {
        getCourse(slug)
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (course != undefined)
            setLoading(false)
    }, [course])
    const getCourse = async (slug) => {
        try {
            apiCall.current = API.request(`/post/${slug}`, false, {});
            const response = await apiCall.current.promise
            if (response.message == 'Fetched successfully') {
                setCourse(response.data)
                return response.data
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const changeStatus = async () => {
        setApiLoading(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${globalUser.accessToken}`);

        var formdata = new FormData();
        formdata.append("status", "published");

        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`https://api.aqua.ir:8283/post/status/${slug}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message == 'Valid token') {
                    setSuccess(true)
                    setSwitchView(true)
                }
            })
            .catch(error => {
                setSuccess(false)
                setSwitchView(true)
            });
    }
    return (
        <>
            <Helmet>
                <title>تغییر وضعیت خبر</title>
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
                                <UserDashboard currentTab={"post"} secondChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    {loading ? <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div> :
                                        <div className={classes.coursesInProgressWrapper}>
                                            <div className="text-center">
                                                <img style={{ width: '10vw' }} src={`https://api.aqua.ir:8283${course.image}`} />
                                                <div className="product-single-info-wrapper text-dark">
                                                    <div>عنوان دوره:
                                                        <span>{course.title}</span>
                                                    </div>
                                                    <div>درباره دوره:
                                                        <span>{course.content}</span>
                                                    </div>
                                                    <div>چکیده دوره:
                                                        <span>{course.short_description}</span>
                                                    </div>
                                                    <div>تگ:
                                                        <span>{course.tags.map((tag) => {
                                                            return <div style={{
                                                                width: 'fit-content',
                                                                display: 'inline-block',
                                                                alignItems: 'center',
                                                                margin: '5px',
                                                                padding: ' 5px 15px',
                                                                borderRadius: '5px',
                                                                backgroundColor: '#64c5ba',
                                                            }}>{tag.tag}</div>
                                                        })}</span>
                                                    </div>
                                                    <div style={{ width: '100%' }}>
                                                        <div style={{ display: 'inline-block', margin: '20px' }}>
                                                            <button style={{ width: '100%' }} className={classes.greenBtn} onClick={() => setModalOpen(true)}>انتشار خبر</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Modal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <div className={classes.modal}>
                        <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%', flexDirection: 'column' }}>
                            {!switchView ?
                                <>
                                    <CampaignIcon style={{ color: 'orange', fontSize: "40px" }} />
                                    <span className="text-dark" style={{ marginRight: '10px' }}>آیا مطمئن هستید؟</span>
                                    {apiLoading ? <button style={{ width: '100%' }} className={classes.greenBtn}><CircularProgress style={{ width: 18, height: 18 }} /></button> : <button style={{ width: '100%' }} className={classes.greenBtn} onClick={changeStatus}>بله</button>}
                                    <button style={{ width: '100%' }} className={classes.redBtn} onClick={() => setModalOpen(false)}>خیر</button>
                                </>
                                :
                                <>
                                    {success ?
                                        <>
                                            <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                                            <span className="text-dark" style={{ marginRight: '10px' }}>عملیات موفقیت آمیز بود</span>
                                            <button style={{ width: '100%', marginTop: '20px' }} className={classes.greenBtn} onClick={() => setModalOpen(false)}>بستن پنجره</button>
                                        </>
                                        : <>
                                            <CancelIcon style={{ color: 'red', fontSize: "40px" }} />
                                            <span className="text-dark" style={{ marginRight: '10px' }}>عملیات موفقیت آمیز نبود</span>
                                            <button style={{ width: '100%' }} className={classes.greenBtn} onClick={() => setModalOpen(false)}>بستن پنجره</button>
                                        </>}
                                </>
                            }
                        </div>
                    </div>
                </Modal>
            </section >
        </>

    );
}