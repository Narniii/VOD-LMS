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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5/build/ckeditor'
import { MyCKFileAdapterPlugin } from "../post/MyCKFileAdapter"
import { Helmet } from "react-helmet";

const editorConfiguration = {
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
        width: '90%',
        padding: '0rem 3rem ',
        margin: '20px auto',
        overflowY: 'scroll',
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

export default function NewProposal() {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(undefined)
    const [course, setCourse] = useState({
        title: '',
        short_description: '',
        content: '',
        image: undefined,
    })
    const [tags, setTags] = useState([]);
    const [successMessage, setSuccessMessage] = useState(undefined)
    const editorRef = useRef(null);
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
    const submitCourse = (e) => {
        e.preventDefault()
        if (course.title == '' || course.title == undefined) {
            setError('?????????? ???????????????? ???????????????? ???????? ????????')
            return
        }
        if (course.short_description == '' || course.short_description == undefined) {
            setError('?????????? ???????????????? ???????????????? ???????? ????????')
            return
        }
        if (course.content == '' || course.content == undefined) {
            setError('???????????? ???????????????? ???????????????? ???????? ????????')
            return
        }
        if (course.image == undefined) {
            setError('?????? ???????????????? ???????????????? ???????? ????????')
            return
        }
        if (tags.length == 0) {
            setError('???? ?????? ???????????????? ???????????????? ???????? ????????')
            return
        }
        setLoading(true)
        let selectedTags = JSON.stringify(tags);
        const formData = new FormData();
        formData.append('title', course.title)
        formData.append("short_description", course.short_description)
        formData.append("content", course.content)
        formData.append("image", course.image)
        formData.append("user_id", globalUser.user_id)
        formData.append("tags", selectedTags)
        fetch('https://api.aqua.ir:8283/proposal/create/', { // Your POST endpoint
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
                    setSuccessMessage('???????????????? ?????????? ????')
                    setError(undefined)
                }
                else if (success.message == 'post with this title already exists.' || success.title == 'post with this title already exists.') {
                    console.log(success)
                    setSuccessMessage(undefined)
                    setError('post already exists with this name')
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
    }
    const handleKeyDown = (e) => {
        if (e.keyCode == 13 && tagInput.length != 0) {
            if (tags.includes(tagInput)) {
                setError("?????? ???? ???????? ????????")
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
    return (
        <>
            <Helmet>
                <title>???????? ????????????????</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"proposal"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"proposal"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9" >
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
                                            {globalUser.user_group == "admin" ?
                                                <>
                                                    <h3 className={classes.createHeader} >???????? ????????????????</h3>
                                                    <div className={classes.inputsWrapper}>
                                                        <div className="create-course-inputs">
                                                            <div className={classes.inputsHeader}>?????????? ????????????????</div>
                                                            <textarea className="form-control " value={course.title} name="title" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} maxLength={50} />
                                                            {/* <div className={classes.inputsTooltips}>?????? ???????????? ???????? ?????????? ???? ???? ?????? ????????</div> */}
                                                            <div className={classes.inputsHeader}>?????????? ????????????????</div>
                                                            <textarea className="form-control " value={course.short_description} name="short_description" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            {/* <div className={classes.inputsTooltips}>(09xxxxxxxxx)</div> */}
                                                            <div className={classes.inputsHeader}> ?????? ????????????????</div>
                                                            <div className="text-dark">
                                                                <CKEditor
                                                                    editor={Editor}
                                                                    data=""
                                                                    config={editorConfiguration}
                                                                    onChange={(event, editor) => {
                                                                        const data = editor.getData();
                                                                        var c = { ...course };
                                                                        c.content = data
                                                                        setCourse(c);
                                                                    }}
                                                                />
                                                                {/* <textarea className="form-control " value={course.content} name="content" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} /> */}
                                                            </div>
                                                            <div style={{ margin: '10px 0px' }}>
                                                                <ReactFileReader multipleFiles={false} style={{ display: 'inline-block !important' }} handleFiles={handleFiles}>
                                                                    <span className={classes.inputsHeader} style={{ display: 'inline-block !important' }}>?????? ????????????????:</span>
                                                                    <Button variant="primary">???????????? ??????</Button>
                                                                    {/* {imagePreview ?
                                                            <img />
                                                            : undefined
                                                        } */}
                                                                </ReactFileReader>
                                                            </div>
                                                            <div className={classes.inputsHeader}>???? ?????? ????????????????</div>
                                                            <div>
                                                                <input className="form-control" onKeyDown={e => handleKeyDown(e)} value={tagInput} onChange={e => setTagInput(e.target.value)} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                                {/* <Form.Select onChange={tagChange}>
                                                            <option value={-1}>select tag</option>
                                                            {availableTags.map((tag) => {
                                                                return <option name={tag.tag} value={tag.id}>{tag.tag}</option>
                                                            })}
                                                        </Form.Select> */}
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
                                                                {successMessage ? <h4 style={{ textAlign: 'center', color: '#64c5ba' }}>{successMessage}</h4> : undefined}
                                                                {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                                <button type="submit" className={classes.submitButton} onClick={submitCourse}>??????</button>
                                                                <button className={classes.whiteBtn} onClick={() => { history.push('/welcome') }}>????????????</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </> :
                                                <h1 style={{ color: '#64c5ba' }}>?????? ???????????? ???? ?????? ???????? ????????????</h1>}
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