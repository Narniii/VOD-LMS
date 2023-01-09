import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import "./CreateCourse.css";
import { Button, Form } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "../Navbar/Navbar";
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
        margin: '20px auto',
        overflow: 'scroll',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        },
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
    whiteBtn: {
        backgroundColor: 'white !important',
        border: '1px solid #64c5ba !important',
        color: '#64c5ba !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '0px 10px'
    },
    userPanelLinks: {
        textDecoration: 'none'
    },
    createHeader: {
        color: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            paddingTop: '8vh',
        },
    }
}));
export default function CreateCourse() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [selectedTags, setSelectedTags] = useState([])
    const [course, setCourse] = useState({
        title: '',
        short_description: '',
        content: '',
        image: undefined,
        level: "Conceptual",
    })
    const [availableTags, setAvailableTags] = useState(undefined)
    const [tags, setTags] = useState([]);
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [tagInput, setTagInput] = useState(undefined)

    useEffect(() => {
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])

    const onChange = e => {
        var c = { ...course };
        c[e.target.name] = e.target.value;
        setCourse(c);
    }
    const deleteTag = (tag) => {
        let tmpTags = tags
        let filteredTags = tmpTags.filter(t => t != tag)
        setTags(filteredTags)
    }
    const handleKeyDown = (e) => {
        if (e.keyCode == 13 && tagInput.length != 0) {
            if (tags.includes(tagInput)) {
                setError("این تگ وجود دارد")
            }
            else {
                setError(undefined)
                let tempTags = []
                if (tags.length == 0) {
                    tempTags.push(tagInput)
                    setTags(tempTags)
                    setTagInput("")
                }
                else {
                    tempTags = tags
                    tempTags.push(tagInput)
                    setTags(tempTags)
                    setTagInput("")
                }
            }
        }
    }
    const submitCourse = (e) => {
        e.preventDefault()
        if (course.title == '' || course.title == undefined) {
            setError('عنوان دوره نمیتواند خالی باشد')
            return
        }
        if (course.short_description == '' || course.short_description == undefined) {
            setError('چکیده دوره نمیتواند خالی باشد')
            return
        }
        if (course.content == '' || course.content == undefined) {
            setError('درباره دوره نمیتواند خالی باشد')
            return
        }
        if (course.image == undefined) {
            setError('عکس دوره نمیتواند خالی باشد')
            return
        }
        if (tags.length == 0) {
            setError('تگ های دوره نمیتواند خالی باشد')
            return
        }
        setLoading(true)
        const formData = new FormData();
        let selectedTags = JSON.stringify(tags);
        formData.append('title', course.title)
        formData.append("short_description", course.short_description)
        formData.append("content", course.content)
        formData.append("image", course.image)
        formData.append("level", course.level)
        formData.append("teacher_id", globalUser.user_id)
        formData.append("tags", selectedTags)
        fetch('https://api.aqua.ir:8283/course/create/', { // Your POST endpoint
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${globalUser.accessToken}`
            },
            body: formData,
        }).then(
            response => response.json() // if the response is a JSON object
        ).then(
            success => {
                console.log(success)
                if (success.message == 'Valid token') {
                    setLoading(false)
                    setSuccessMessage('دوره ثبت شد.')
                    setError(undefined)
                }
                else if (success.message == 'course with this title already exists.' || success.title == 'course with this title already exists.') {
                    setSuccessMessage(undefined)
                    setError('دوره ای با این نام وجود دارد.')
                    setLoading(false)
                }
                else {
                    setSuccessMessage(undefined)
                    setError('آپلود دوره موفقیت آمیز نبود')
                    setLoading(false)
                }
            }
        ).catch(
            error => {
                console.log(error)
                setSuccessMessage(undefined)
                setError('آپلود دوره موفقیت آمیز نبود')
                setLoading(false)
            }

        );
    }
    const handleFiles = async (files) => {
        const c = { ...course }
        c.image = files[0]
        setCourse(c)
    }

    return (
        <>
            <Helmet>
                <title>ساخت دوره</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"videoUpload"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"videoUpload"} firstChildSelected={true} />
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
                                            <h3 className={classes.createHeader} >ساخت دوره</h3>
                                            <div className={classes.inputsWrapper}>
                                                <div className="create-course-inputs">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className={classes.inputsHeader}>عنوان دوره</div>
                                                                <textarea className="form-control " value={course.title} name="title" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} maxLength={50} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className={classes.inputsHeader}>چکیده دوره</div>
                                                                <textarea className="form-control " value={course.short_description} name="short_description" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className={classes.inputsHeader}> درباره دوره</div>
                                                                <textarea className="form-control " value={course.content} name="content" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className={classes.inputsHeader}>سطح دوره</div>
                                                                <Form.Select value={course.level} name="level" onChange={onChange}>
                                                                    <option value="Conceptual">conceptual</option>
                                                                    <option value="Practical">practical</option>
                                                                    <option value="Deep">deep</option>
                                                                </Form.Select>
                                                            </div>
                                                        </div>
                                                        <div className={classes.inputsHeader}>تگ های دوره</div>
                                                        <div>
                                                            <input className="form-control" onKeyDown={e => handleKeyDown(e)} value={tagInput} onChange={e => setTagInput(e.target.value)} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            {tags.length != 0 ?
                                                                tags.map((tag) => (
                                                                    <div className="tag">
                                                                        {tag}
                                                                        <button onClick={() => deleteTag(tag)}><DeleteForeverIcon /></button>
                                                                    </div>
                                                                ))
                                                                : undefined}
                                                        </div>
                                                        <div style={{ margin: '10px 0px' }}>
                                                            <ReactFileReader multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleFiles}>
                                                                <span className={classes.inputsHeader} style={{ display: 'inline-block !important', marginLeft: '10px' }}>عکس دوره:</span>
                                                                <button className="btn btn-md btn-success" variant="primary">انتخاب عکس</button>
                                                                {/* {imagePreview ?
                                                            <img />
                                                            : undefined
                                                        } */}
                                                            </ReactFileReader>
                                                        </div>
                                                        {/* <input
                                                        className="form-control "
                                                        value={input}
                                                        placeholder="Enter a tag"
                                                        onKeyDown={onKeyDown}
                                                        onKeyUp={onKeyUp}
                                                        onChange={tagsOnChange}
                                                    />
                                                    */}
                                                    </div>
                                                    <div className={classes.submitButtonWrapper}>
                                                        {successMessage ? <h4 style={{ fontWeight: 'bold', color: 'green', margin: '10px', }}>{successMessage}</h4> : undefined}
                                                        {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                        <button type="submit" className={classes.submitButton} onClick={submitCourse}>ثبت</button>
                                                        <button type="submit" className={classes.whiteBtn} onClick={() => { history.push('/welcome') }}>انصراف</button>
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
        </>
    );
}