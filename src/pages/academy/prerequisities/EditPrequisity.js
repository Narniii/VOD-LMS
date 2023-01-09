import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios'
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
        coursesInProgressWrapper: {
            height: '75vh',
            marginTop: '60px',
            overflow: 'scroll !important',
            width: '100%'
        },
    },
    submitButtonWrapper: {
        width: '100%',
        textAlign: 'center',
        marginTop: '20px'
    },
    submitButton: {
        backgroundColor: '#64c5ba !important',
        border: '1px solid #64c5ba !important',
        color: 'white !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important'
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
export default function EditPrequisity(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const slug = props.match.params.slug
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [selectedteacherCourse, setSelectedTeacherCourse] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [recievedCourse, setRecievedCourse] = useState(undefined)
    useEffect(() => {
        getCourse()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (selectedCourses.length != 0)
            setLoading(false)
    }, [courses, selectedCourses])
    useEffect(() => {
        if (recievedCourse != undefined)
            getCourses().then(() => {
                getPrerequisity()
            })
    }, [recievedCourse])
    const getCourse = async () => {
        try {
            apiCall.current = API.request(`/course/${props.match.params.slug}`, false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Fetched successfully") {
                setRecievedCourse(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const getCourses = async () => {
        try {
            apiCall.current = API.request('/course/published/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Fetched successfully") {
                setCourses(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const getPrerequisity = async () => {
        try {
            apiCall.current = API.request(`/course/prerequisites/${slug}`, false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Fetched successfully") {
                let temparr = []
                let reslen = response.data.length
                for (var i = 0; i < reslen; i++) {
                    let inerlen = response.data[i].prerequisite_courses.length
                    for (var j = 0; j < inerlen; j++) {
                        let temporaryFlag = false
                        try {
                            const res = await axios.get(`https://api.aqua.ir:8283/course/${response.data[i].prerequisite_courses[j].slug}`, {
                                headers: {
                                    'Authorization': `Bearer ${globalUser.accessToken}`
                                }
                            });
                            if (res.status == 200) {
                                for (var v = 0; v < temparr.length; v++) {
                                    if (res.data.data.id == temparr[v].id)
                                        temporaryFlag = true
                                }
                                if (temporaryFlag == false)
                                    temparr.push(res.data.data)
                            }
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                    setSelectedCourses(temparr)
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    const childsDropDownHandler = (e) => {
        if (e.target.value != -1) {
            e.preventDefault();
            let selectedCourse = undefined
            let i = 0
            let tempFlag = false
            for (i; i < courses.length; i++) {
                if (e.target.value == courses[i].id)
                    selectedCourse = courses[i]
            }
            for (var z = 0; z < selectedCourses.length; z++) {
                if (selectedCourses[z].id == selectedCourse.id)
                    tempFlag = true
            }
            if (tempFlag == true) {
                return
            }
            else {
                setSelectedCourses(prevState => [...prevState, selectedCourse])
            }
        }
    }
    const deleteCourse = (courseID) => {
        setSelectedCourses(prevState => prevState.filter((course) => course.id !== courseID))
    }
    const submitPrerequisities = async () => {
        let i = 0
        let courseIDs = []
        for (i; i < selectedCourses.length; i++) {
            courseIDs.push(selectedCourses[i].id.toString())
        }
        try {
            const res = await axios.patch(`https://api.aqua.ir:8283/course/prerequisites/${slug}`,
                {
                    main_course: recievedCourse.id,
                    prerequisite_courses: courseIDs,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            console.log(res)
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
        }
    }
    return (
        <>
            <Helmet>
                <title>ویرایش پیشنیاز {`${slug.replaceAll("-", " ")}`}</title>
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
                                <UserDashboard currentTab={"prerequisities"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler" >
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        {loading ? <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '85vh',
                                        }}>
                                            <CircularProgress style={{ color: "green" }} />
                                        </div> :
                                            <>
                                                <div className="text-dark">Your course</div>
                                                <Form.Select disabled >
                                                    <option value={-1}>{recievedCourse.title}</option>
                                                </Form.Select>
                                                <div className="text-dark" style={{ margin: '20px 0px' }}>دوره های موچود</div>
                                                <Form.Select onChange={childsDropDownHandler}>
                                                    <option value={-1}>دوره</option>
                                                    {courses.map((course) => {
                                                        return <option key={course.id} value={course.id}>{course.title}</option>
                                                    })}
                                                </Form.Select>
                                                {selectedCourses != [] ?
                                                    <>
                                                        {selectedCourses.map((course) => (
                                                            <div className="tag" >
                                                                {course.title}
                                                                <button onClick={() => deleteCourse(course.id)}><DeleteForeverIcon /></button>
                                                            </div>
                                                        ))}
                                                    </>
                                                    : undefined
                                                }
                                                <div className={classes.submitButtonWrapper}>
                                                    <button type="submit" className={classes.submitButton} onClick={submitPrerequisities}>ثبت</button>
                                                    <button type="submit" className={classes.whiteBtn} onClick={() => { history.push('/welcome') }}>انصراف</button>
                                                    {successMessage ? <div className={classes.inputsTooltips}>{successMessage}</div> : undefined}
                                                    {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </section >
        </>

    );
}