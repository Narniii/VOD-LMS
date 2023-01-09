import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { Button, Form } from "react-bootstrap";
import ReactFileReader from 'react-file-reader';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux'
import Navbar from "../Navbar/Navbar";
import Editor from 'ckeditor5/build/ckeditor'
import { MyCKFileAdapterPlugin } from '../post/MyCKFileAdapter';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Helmet } from "react-helmet";
const editorConfiguration = {
    // toolbar: ['bold', 'italic'],
    extraPlugins: [MyCKFileAdapterPlugin],
};
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
        padding: '0px 10%',
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
export default function EditProposal(props) {
    const { globalUser } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [course, setCourse] = useState({
        title: '',
        short_description: '',
        content: '',
        image: undefined,
    })
    const [tags, setTags] = useState([]);
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [photoChanged, setPhotoChanged] = useState(false)
    const [photoToshow, setPhotoToShow] = useState(undefined)
    const [tagInput, setTagInput] = useState(undefined)

    useEffect(() => {
        getCourse()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (course != undefined && photoToshow != undefined && tags.length != 0)
            setLoading(false)
    })
    const getCourse = async () => {
        try {
            apiCall.current = API.request(`/proposal/${props.match.params.slug}`, false);
            const response = await apiCall.current.promise
            setTags(response.data.tags)
            setCourse(response.data)
            setPhotoToShow(response.data.image)
            return
        }
        catch (err) {
            console.log(err)
        }
    }
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
        if (photoChanged)
            formData.append("image", course.image)
        formData.append("level", course.level)
        formData.append("teacher_id", globalUser.user_id)
        formData.append("slug", course.slug)
        formData.append("tags", selectedTags)
        fetch(`https://api.aqua.ir:8283/proposal/${course.slug}`, { // Your POST endpoint
            method: 'PATCH',
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
                    setSuccessMessage('Edited successfully')
                    alert('Edited successfully')
                    history.push('/proposals')
                    setPhotoToShow(success.data.image)
                    setError(undefined)
                }
                else if (success.message == 'course with this title already exists.') {
                    setSuccessMessage(undefined)
                    setError('course already exists with this name')
                    setLoading(false)
                }
                else {
                    setSuccessMessage(undefined)
                    setError('upload unsuccsessful')
                    setLoading(false)
                }
            }
        ).catch(
            error => {
                console.log(error)
                setSuccessMessage(undefined)
                setError('upload unsuccsessful')
                setLoading(false)
            }

        );
    }
    const handleFiles = async (files) => {
        const c = { ...course }
        c.image = files[0]
        setCourse(c)
        setPhotoChanged(true)
    }
    return (
        <>
            <Helmet>
                <title>ویرایش پروپوزال</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"proposal"} secondChildSelected={true} />} />
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
                                            <h3 className={classes.createHeader} >ویرایش پروپوزال</h3>
                                            <img style={{ width: '10vw' }} src={`https://api.aqua.ir:8283${photoToshow}`} />
                                            <div className={classes.inputsWrapper}>
                                                <div className="create-course-inputs">
                                                    <div className={classes.inputsHeader}>عنوان پروپوزال</div>
                                                    <textarea className="form-control " value={course.title} name="title" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} maxLength={50} />
                                                    <div className={classes.inputsHeader}>چکیده پروپوزال</div>
                                                    <textarea className="form-control " value={course.short_description} name="short_description" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                    <div className={classes.inputsHeader}> درباره پروپوزال</div>
                                                    <div className="text-dark">
                                                        <CKEditor
                                                            editor={Editor}
                                                            data={course.content}
                                                            config={editorConfiguration}
                                                            onChange={(event, editor) => {
                                                                const data = editor.getData();
                                                                var c = { ...course };
                                                                c.content = data
                                                                setCourse(c);
                                                            }}
                                                        />
                                                    </div>
                                                    <div style={{ margin: '10px 0px' }}>
                                                        <ReactFileReader multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleFiles}>
                                                            <span className={classes.inputsHeader} style={{ display: 'inline-block !important' }}>عکس دوره:</span>
                                                            <Button variant="primary">انتخاب عکس</Button>
                                                        </ReactFileReader>
                                                    </div>
                                                    <div className={classes.inputsHeader}>تگ های پروپوزال</div>
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
                                                    <div className={classes.submitButtonWrapper}>
                                                        {successMessage ? <div className={classes.inputsTooltips}>{successMessage}</div> : undefined}
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