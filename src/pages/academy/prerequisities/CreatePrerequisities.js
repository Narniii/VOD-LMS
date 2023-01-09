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
    modal: {
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
export default function CreatePrerequisities() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [teacherCourses, setTeacherCourses] = useState([])
    const [selectedCourses, setSelectedCourses] = useState([])
    const [selectedteacherCourse, setSelectedTeacherCourse] = useState(undefined)
    const [successMessage, setSuccessMessage] = useState(undefined)
    const [modalOpener, setModalOpener] = useState(false)

    useEffect(() => {
        getCourses().then(() => {
            getTeacherCourses().then(() => {
                setLoading(false)
            })
        })
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
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
    const getTeacherCourses = async () => {
        try {
            apiCall.current = API.request('/course/author/', true, {
                teacher_id: globalUser.user_id
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            setTeacherCourses(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const dropDownHandler = (e) => {
        let teacherCourse = undefined
        let i = 0
        for (i; i < teacherCourses.length; i++) {
            if (e.target.value == teacherCourses[i].id)
                teacherCourse = teacherCourses[i]
        }
        setSelectedTeacherCourse(teacherCourse)
    }
    const childsDropDownHandler = (e) => {
        if (e.target.value != -1) {
            e.preventDefault();
            let selectedCourse = undefined
            let i = 0
            for (i; i < courses.length; i++) {
                if (e.target.value == courses[i].id)
                    selectedCourse = courses[i]
            }
            if (!selectedCourses.includes(selectedCourse))
                setSelectedCourses(prevState => [...prevState, selectedCourse])
        }
    }
    const deleteCourse = (courseID) => {
        setSelectedCourses(prevState => prevState.filter((course) => course.id !== courseID))
    }
    const submitPrerequisities = async () => {
        if (selectedteacherCourse == undefined) {
            setError('Please select your target course')
            return
        }
        if (selectedCourses.length == 0) {
            setError('Please select a course or many courses for prerequisities')
            return
        }
        let i = 0
        let courseIDs = []
        for (i; i < selectedCourses.length; i++) {
            courseIDs.push(selectedCourses[i].id.toString())
        }
        try {
            apiCall.current = API.request('/course/prerequisites/create/', true, {
                main_course: selectedteacherCourse.id,
                prerequisite_courses: courseIDs,
            }, globalUser.accessToken);
            const res = await apiCall.current.promise
            if (res.message == 'Valid token') {
                setModalOpener(true)
                setTimeout(() => {
                    history.push('/prerequisities')
                }, 2000);
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoading(false)
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
                <title>ساخت پیشنیاز</title>
            </Helmet>
            <div className="container">
                <div className={classes.whiteBox}>
                    <div className="row">
                        <div className="col-sm-3 no-mobile">
                            <UserDashboard currentTab={"prerequisities"} firstChildSelected={true} />
                        </div>

                        <div className="col-sm-9 overFlowHandler" >
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
                                        <div className="text-dark">Your course</div>
                                        <Form.Select onChange={dropDownHandler}>
                                            <option value={-1}>دوره</option>
                                            {teacherCourses.map((course) => {
                                                return <option key={course.id} value={course.id}>{course.title}</option>
                                            })}
                                        </Form.Select>
                                        <div className="text-dark" style={{ margin: '20px 0px' }}>دوره های موجود</div>
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
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Modal
                open={modalOpener}
                onClose={() => setModalOpener(false)}
            >
                <div className={classes.modal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ساخت پیشنیاز موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
        </section >
    );
}