import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
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
    },
    loginDoneModal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '10%',
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
export default function CommentSingle(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [comments, setComments] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const id = props.match.params.id
    const [modal, setModal] = useState(false)
    useEffect(() => {
        getComments()
    }, [])
    useEffect(() => {
        if (comments != undefined)
            setLoading(false)
    }, [comments])
    const getComments = async () => {
        try {
            apiCall.current = API.request(`/comment/${id}`, false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == 'Valid token') {
                setComments(response.data)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const acceptComment = async () => {
        try {
            const res = await axios.patch(`https://api.aqua.ir:8283/comment/status/${id}`,
                {
                    status: "true"
                },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            // console.log(res)
            if (res.data.message == "Valid token") {
                setModal(true)
                setTimeout(() => {
                    history.push('/all-comments')
                }, 2000);
            }
            setLoading(false)
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    return (
        <>
            <Navbar children={<UserDashboard currentTab={"comment"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"comment"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9  overFlowHandler">
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
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
                                                <h3 className="mobile-only text-center" style={{ color: '#64c5ba' }}>کامنت ها</h3>
                                                <div className="text-dark">
                                                    {comments.map((comment) => {
                                                        return <div key={comment.id}>
                                                            <div style={{ marginTop: '10vh', padding: '10px 20px' }}>
                                                                <div className={classes.videoWrapper}>
                                                                    <div className="text-center">
                                                                        <div>عکس پروفایل:</div>
                                                                        <img style={{ width: '10%' }} src={
                                                                            comment.owner_image.indexOf("google") != -1 ?
                                                                                `${comment.owner_image}`
                                                                                :
                                                                                `https://api.aqua.ir${comment.owner_image}`
                                                                        } />
                                                                    </div>
                                                                    <div>نام کامنت گذار</div>
                                                                    <div>{comment.owner_name}</div>
                                                                    <div>متن کامنت:</div>
                                                                    <div>{comment.content}</div>
                                                                    <div className="text-center">
                                                                        <button className="btn btn-md btn-success" onClick={acceptComment}>تایید</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })}

                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                >
                    <div className={classes.loginDoneModal}>
                        <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                            <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                            <span className="text-dark" style={{ marginRight: '10px' }}>کامنت تایید شد</span>
                        </div>
                    </div>
                </Modal>
            </section >
        </>
    );
}