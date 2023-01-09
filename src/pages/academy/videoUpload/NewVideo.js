import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./CreateCourse.css";
import ReactFileReader from 'react-file-reader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Helmet } from "react-helmet";
import { ARVANCONFIG } from "../../../arvanConfig/arvanConfig";
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
export default function NewVideo(props) {
    const { globalUser } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState(undefined)
    const [progress, setProgress] = useState()
    const [uploading, setUploading] = useState()
    const [vodPath, setVodPath] = useState(undefined)
    const [videoId, setVideoId] = useState(undefined)
    const [fullVideoStats, setFullVideoStats] = useState(undefined)
    const [vodDone, setVodDone] = useState(undefined)
    const [video, setVideo] = useState({
        video_name: '',
        clip: undefined,
        part: '',
        short_description: '',
        video: undefined
    })
    const [successMessage, setSuccessMessage] = useState(undefined)
    const onChange = e => {
        var v = { ...video };
        v[e.target.name] = e.target.value;
        setVideo(v);
    }
    useEffect(() => {
        getCourse().then(() => {
            setLoading(false)
        })
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    const getCourse = async () => {
        try {
            apiCall.current = API.request(`/course/${props.match.params.id}`, false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == 'Fetched successfully') {
                setCourse(response.data)
                return
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const submitVideo = async (e) => {
        e.preventDefault()
        setProgress(0)
        if (video.video_name == '' || video.video_name == undefined) {
            setError('عنوان ویدیو نمیتواند خالی باشد.')
            return
        }
        if (video.clip == undefined) {
            setError('ویدیو دوره را انتخاب کنید.')
            return
        }
        if (video.part == '' || video.part == undefined) {
            setError('لطفا مشخص کنید که ویدیو مورد نظر ،چندمین ویدیوی دوره می باشد.')
            return
        }
        setUploading(true)
        setError(undefined)
        const pathname = await allocateSpaceInArvanVod(video.clip)
        setVodPath(pathname)
        setProgress(10)
    }
    const handleThumbnail = async (files) => {
        const v = { ...video }
        v.thumbnail = files[0]
        setVideo(v)
    }
    const handleFiles = async (files) => {
        if (files[0].type.indexOf('video') === -1) {
            setError('فایل انتخاب شده باید ویدیو باشد')
            return
        }
        else {
            console.log(files[0])
            setError(undefined)
            const v = { ...video }
            v.clip = files[0]
            setVideo(v)
        }
    }
    useEffect(async () => {
        if (vodPath != undefined) {
            await uploadVideoInVod(vodPath, video.clip)
            const vodVideoId = await vodConvert(vodPath, video.clip)
            setProgress(20)
            setVideoId(vodVideoId)
        }
    }, [vodPath])
    useEffect(async () => {
        if (videoId != undefined) {
            var videoDetails = await getFullVideoVodDetails(videoId)
            setFullVideoStats(videoDetails)
            setProgress(30)
        }
    }, [videoId])
    useEffect(async () => {
        if (fullVideoStats != undefined) {
            if (fullVideoStats.available == 0) {
                let tmpProgress = progress + 2
                setProgress(tmpProgress)
                const myTimeout = setTimeout(async () => {
                    var videoDetails = await getFullVideoVodDetails(videoId)
                    setFullVideoStats(videoDetails)
                }, 5000);
            }
            else {
                aquaApiSubmit()
                setProgress(90)
            }
        }
    }, [fullVideoStats])
    const allocateSpaceInArvanVod = async (file) => {
        var encodedFileName = Buffer.from(file.name).toString('base64')
        var encodedType = Buffer.from(file.type).toString('base64')
        try {
            const response = await axios({
                method: "post",
                url: `${ARVANCONFIG.baseUrl}/channels/${ARVANCONFIG.Channel}/files`,
                headers: {
                    'Authorization': `${ARVANCONFIG.APIKey}`,
                    'tus-resumable': "1.0.0",
                    'upload-metadata': `filename ${encodedFileName},filetype ${encodedType}`,
                    'upload-length': file.size
                },
            });
            console.log(response)
            if (response.status == 201) {
                var responseLocation = response.headers.location
                var indexOfFiles = responseLocation.indexOf('files')
                var pathname = responseLocation.substring(indexOfFiles + 6)
                return pathname
            }
        } catch (err) {
            console.log(err)
        }
    }
    const uploadVideoInVod = async (pathname, file) => {
        try {
            const res = await axios({
                method: "patch",
                url: `${ARVANCONFIG.baseUrl}/channels/${ARVANCONFIG.Channel}/files/${pathname}`,
                data: file,
                headers: {
                    'Content-Type': `application/json`,
                    'tus-resumable': "1.0.0",
                    'upload-offset': `0`,
                    'Authorization': `${ARVANCONFIG.APIKey}`,
                },
            });
            console.log(res)
            if (res.status == 204) {
                return "success"
            }
            else return "fail"
        }
        catch (err) {
            console.log(err)
            return "fail"
        }
    }
    const vodConvert = async (pathname, file) => {
        try {
            const resp = await axios({
                method: "post",
                url: `${ARVANCONFIG.baseUrl}/channels/${ARVANCONFIG.Channel}/videos`,
                data: JSON.stringify({
                    title: file.name,
                    convert_mode: "auto",
                    file_id: pathname
                }),
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `${ARVANCONFIG.APIKey}`,
                },
            });
            if (resp.status == 201) {
                return resp.data.data.id
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const getFullVideoVodDetails = async (videoId) => {
        try {
            const finalReq = await axios({
                method: "get",
                url: `${ARVANCONFIG.baseUrl}/videos/${videoId}`,
                headers: {
                    'Authorization': `${ARVANCONFIG.APIKey}`,
                },
            });
            console.log(finalReq)
            if (finalReq.status == 200) {
                return finalReq.data.data
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const aquaApiSubmit = async () => {
        const formData = new FormData();
        formData.append('video_name', video.video_name);
        formData.append("course_id", course.id)
        formData.append("image", video.thumbnail)
        formData.append("part", video.part)
        formData.append("short_description", video.short_description)
        formData.append("video_playlist_url", fullVideoStats.hls_playlist)
        formData.append("video_duration", fullVideoStats.file_info.general.duration)
        try {
            const resp = await axios({
                method: "post",
                url: "https://api.aqua.ir:8283/course/videos/upload/",
                data: formData,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${globalUser.accessToken}`
                },
            });
            console.log(resp)
            if (resp.data.message == 'Valid token') {
                setProgress(100)
                setSuccessMessage('آپلود موفقیت آمیز بود')
                setLoading(false)
                setError(undefined)
                return
            }
            if (resp.data.message.server == "this part already exists") {
                setError('this part already exists')
                setSuccessMessage(undefined)
                setLoading(false)
            }
            else {
                setError('آپلود موفقیت آمیز نبود')
                setSuccessMessage(undefined)
                setLoading(false)
            } // Handle the success response object
        } catch (err) {
            if (err.response.data.message.error == "this part already exists")
                setError("قبلا برای بخش انتخاب شده ویدیو آپلود شده است")
            else setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setUploading(false)
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
                <title>آپلود ویدئو</title>
            </Helmet>
            <div className="container">
                <div className={classes.whiteBox}>
                    <div className="row">
                        <div className="col-sm-3 no-mobile">
                            <UserDashboard currentTab={"videoUpload"} thirdChildSelected={true} />
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
                                        <div className="text-dark text-center">آپلود ویدئو</div>
                                        <div className={classes.inputsWrapper}>
                                            <div className="editprofile-inputs">
                                                <div className={classes.inputsHeader}>عنوان ویدیو</div>
                                                <input className="form-control " value={video.video_name} name="video_name" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                <div className={classes.inputsHeader}>چکیده ای از ویدیو</div>
                                                <input className="form-control " value={video.short_description} name="short_description" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                <div className={classes.inputsHeader}>بخش</div>
                                                <input className="form-control " value={video.part} name="part" onChange={onChange} type="number" style={{ backgroundColor: '#f2f2f2' }} />
                                                <div className={classes.inputsTooltips}>لطفا مشخص کنید که ویدیو مورد نظر ، چندمین ویدیو دوره می باشد</div>
                                                <div style={{ margin: '10px 0px' }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <ReactFileReader fileTypes={[".MOV", ".MP4", ".AVI", ".MKV", ".FLV"]} multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleFiles}>
                                                                <span className={classes.inputsHeader} style={{ display: 'inline-block !important' }}>ویدیو:</span>
                                                                <Button variant="success">انتخاب ویدیو</Button>
                                                                {/* {imagePreview ?
                                                            <img />
                                                            : undefined
                                                        } */}
                                                            </ReactFileReader>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <ReactFileReader multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleThumbnail}>
                                                                <span className={classes.inputsHeader} style={{ display: 'inline-block !important' }}>thumbnail:</span>
                                                                <Button variant="success">انتخاب عکس</Button>
                                                            </ReactFileReader>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={classes.submitButtonWrapper}>
                                                    <button type="submit" className={classes.submitButton} onClick={submitVideo}>ثبت</button>
                                                    <button type="submit" className={classes.whiteBtn} onClick={() => { history.push('/uploaded-courses') }}>انصراف</button>
                                                    {successMessage ? <h5 style={{ color: '#64c5ba', margin: '10px 0px' }}>{successMessage}</h5> : undefined}
                                                    {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                    {uploading ?
                                                        <div className="text-english" style={{ margin: '20px 0px' }}>
                                                            <CircularProgressWithLabel value={progress} style={{}} />
                                                            {/* {progress && <ProgressBar now={progress} label={`${progress}%`} />} */}
                                                        </div>
                                                        : undefined
                                                    }
                                                </div>
                                            </div>
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
