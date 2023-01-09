import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import axios from "axios";
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
    }
}));
export default function ProposalPreview(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState(undefined)
    const [isPurchased, setIsPurchased] = useState(false)
    const [discountMessage, setDiscountMessage] = useState(undefined)
    const [discountCode, setDiscountCode] = useState(undefined)
    const [discountLoading, setDiscountLoading] = useState(false)

    useEffect(() => {
        let slug = props.match.params.slug
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
            apiCall.current = API.request(`/proposal/${slug}`, false, {});
            const response = await apiCall.current.promise
            console.log(response)
            if (response.message == 'Fetched successfully') {
                setCourse(response.data)
                return response.data
            } if (response.detail == "Not found.") { history.push("/404") }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    function createMarkup(html) {
        return { __html: html };
    }
    const publishProposal = async () => {
        try {
            const res = await axios.patch(`https://api.aqua.ir:8283/proposal/status/${course.slug}`,
                {
                    status: "published"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            if (res.data.message == 'Valid token') {
                setLoading(false)
                alert('Edited successfully')
                history.push('/proposals')
                setError(undefined)
            }
            else if (res.data.message == 'course with this title already exists.') {
                setError('course already exists with this name')
                setLoading(false)
            }
            else {
                setError('upload unsuccsessful')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            setError('upload unsuccsessful')
            setLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>پیش نمایش خبر</title>
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
                                <UserDashboard currentTab={"proposal"} secondChildSelected={true} />
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
                                                <div className="product-single-info-wrapper">
                                                    <div style={{ borderBottom: "5px solid #64c5ba" }}><div className="product-single-info-title">اطلاعات خبر</div></div>
                                                    <table className='text-dark' style={{ width: "90%", margin: "10px 20px" }}>
                                                        <tr>
                                                            <td>عنوان دوره</td>
                                                            <td>{course.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>درباره دوره</td>
                                                            <td><div className="blog-dxAK03dd" dangerouslySetInnerHTML={createMarkup(course.content)} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>چکیده دوره</td>
                                                            <td>{course.short_description}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>تگ:</td>
                                                            <div>{course.tags.map((tag) => {
                                                                return <div style={{
                                                                    width: 'fit-content',
                                                                    display: 'inline-block',
                                                                    alignItems: 'center',
                                                                    margin: '5px',
                                                                    padding: ' 5px 15px',
                                                                    borderRadius: '5px',
                                                                    backgroundColor: '#64c5ba',
                                                                }}>{tag}</div>
                                                            })}</div>
                                                        </tr>
                                                    </table >
                                                    <div className="text-center" style={{ width: '100%' }}>
                                                        {error ? <h5 style={{ color: 'red', margin: '10px', textAlign: 'center' }}>{error}</h5> : undefined}
                                                        <button style={{ margin: '2px 5px' }} className="btn btn-md btn-success" onClick={() => history.push(`/proposal/${course.slug}/edit`)}>ویرایش پروپرزال</button>
                                                        <button style={{ margin: '2px 5px' }} className="btn btn-md btn-warning" onClick={() => publishProposal()}>انتشار پروپرزال</button>
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
            </section >
        </>

    );
}