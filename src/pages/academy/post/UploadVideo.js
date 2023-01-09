import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import ReactFileReader from 'react-file-reader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Helmet } from "react-helmet";
import './Posts.css'
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
    childsBoxImageWrapper: {
        height: '20vh',
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
    },
    childsBoxImage: {
        width: '150px'
    },
    inputsWrapper: {
        width: '50%',
        margin: '20px auto'
    },
    inputsHeader: {
        fontWeight: '600 !important',
        color: '#3f3c3c',
        margin: '5px 0px'
    },
    inputsTooltips: {
        fontSize: '14px',
        color: '#64c5ba !important',
        margin: '10px 0px'
    },
    submitButton: {
        backgroundColor: '#64c5ba !important',
        border: '1px solid #64c5ba !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important'
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    editProfileImageLogo: {
        width: '120px'
    },
    userPanelLinks: {
        textDecoration: 'none'
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
export default function UploadVideo(props) {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState()
    const [uploading, setUploading] = useState()
    const [video, setVideo] = useState({
        clip: undefined,
    })
    const [selectedVideoName, setSelectedVideoName] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [videoLink, setVideoLink] = useState(undefined)
    useEffect(() => {
        setLoading(false)
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    const submitVideo = async (e) => {
        e.preventDefault()
        if (video.clip == undefined) {
            setError('ویدیو دوره را انتخاب کنید.')
            return
        }
        setUploading(true)
        setError(undefined)
        const formData = new FormData();
        formData.append("video", video.clip)
        try {
            const res = await axios.post("https://api.aqua.ir:8283/post/ck-vid/", formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${globalUser.accessToken}`
                    },
                    onUploadProgress: data => {
                        //Set the progress value to show the progress bar
                        setProgress(Math.round((100 * data.loaded) / data.total))
                    },
                })
            console.log(res.data)
            if (res.data.message == "Uploaded successfully") {
                setSuccessMessage('آپلود موفقیت آمیز بود')
                const fullUrl = `https://api.aqua.ir${res.data.data.video_url}`
                setVideoLink(fullUrl)
                setLoading(false)
                setError(undefined)
                return
            } else {
                setError('آپلود موفقیت آمیز نبود')
                setSuccessMessage(undefined)
                setLoading(false)
            }
        } catch (err) {
            console.log(err)
            setError('آپلود موفقیت آمیز نبود')
            setSuccessMessage(undefined)
            setLoading(false)
        }
    }
    const handleFiles = async (files) => {
        setSelectedVideoName(files[0].name)
        if (files[0].type.indexOf('video') === -1) {
            setError('فایل انتخاب شده باید ویدیو باشد')
            return
        }
        else {
            setError(undefined)
            const v = { ...video }
            v.clip = files[0]
            setVideo(v)
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
                <title>آپلود ویدئو برای خبر</title>
            </Helmet>
            <div className="container">
                <div className={classes.whiteBox}>
                    <div className="row">
                        <div className="col-sm-3 no-mobile">
                            <UserDashboard currentTab={"post"} thirdChildSelected={true} />
                        </div>

                        <div className="col-sm-9 overFlowHandler" >
                            <div className={classes.khakibox}>
                                {loading ?
                                    <div style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: '100%'
                                    }}>
                                        <CircularProgress style={{ color: "green" }} />
                                    </div>
                                    :
                                    <>
                                        <div className="text-dark text-center">آپلود ویدئو برای خبر</div>
                                        <div style={{ margin: '10px 0px' }}>
                                            <ReactFileReader fileTypes={[".MOV", ".MP4", ".AVI", ".MKV", ".FLV"]} multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleFiles}>
                                                <Button variant="success">انتخاب ویدیو</Button>
                                            </ReactFileReader>
                                            {selectedVideoName ? <div className="text-dark" style={{ marginTop: '20px' }}>{selectedVideoName}</div> : undefined}
                                        </div>
                                        <div className={classes.submitButtonWrapper}>
                                            <button type="submit" className={classes.submitButton} onClick={submitVideo}>ثبت</button>
                                            <button type="submit" className={classes.whiteBtn} onClick={() => { history.push('/uploaded-courses') }}>انصراف</button>
                                            {successMessage ? <h5 style={{ color: '#64c5ba', margin: '10px 0px' }}>{successMessage}</h5> : undefined}
                                            {videoLink ? <div style={{ color: '#64c5ba', margin: '10px 0px' }}> آدرس ویدیو:
                                                <div className="post-text-english" style={{ fontSize: '12px' }}>{videoLink}</div>
                                            </div> : undefined}

                                            {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                            {uploading ?
                                                <div className="text-english" style={{ margin: '20px 0px' }}>
                                                    <CircularProgressWithLabel value={progress} />
                                                </div>
                                                : undefined
                                            }
                                        </div>
                                    </>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    );
}



function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress size={70} variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div style={{ fontWeight: 'bold', color: 'black' }}>
                    {`${Math.round(props.value)}%`}
                </div>
            </Box>
        </Box>
    );
}
