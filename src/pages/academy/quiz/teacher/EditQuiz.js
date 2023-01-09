import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CircularProgress, Divider, Hidden } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import './CreateQuiz.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from "axios"
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
        marginTop: '10vh',
        overflow: 'scroll',
        width: '100%'
    },
    quizContainer: {
        width: '80%',
        margin: '0 auto'
    },
    createQuizTitle: {
        color: '#64c5ba',
        fontSize: '30px'
    },
    subHeaders: {
        color: '#64c5ba',
        margin: '10px 0px'
    },
    quizCard: {
        backgroundColor: '#d8d8d8',
        padding: '10px 20px',
        borderRadius: '5px',
        margin: '10px 0px'
    },
    questionTitleWrapper: {
        display: 'block',
        width: '100%'
    },
    questionTitle: {
        fontWeight: 'bold',
        color: 'black'
    },
    questionDeleteIcon: {
        color: 'black',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    inputsWrapper: {
        margin: '10px 0px'
    },
    isCorrectIconCorrect: {
        width: '50px !important',
        height: '40px !important',
        color: 'green',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    isCorrectIconNotCorrect: {
        width: '50px !important',
        height: '40px !important',
        "&:hover": {
            cursor: 'pointer'
        }
    },
    buttonsWrapper: {
        margin: '0 auto',
        width: '50%',
        display: 'flex',
        justifyContent: 'space-around'
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
export default function EditQuiz(props) {
    const apiCall = useRef(undefined);
    const id = props.match.params.id
    const [modal, setModal] = useState(false)
    const classes = useStyles();
    const [err, setErr] = useState(false)
    const [courses, setCourses] = useState(undefined)
    const { globalUser } = useSelector((state) => state.userReducer)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const [timeToDone, setTimeToDone] = useState(undefined)
    const [quiz, setQuiz] = useState({
        course_id: undefined,
        course_slug: undefined,
        user_id: globalUser.user_id,
        title: '',
        questions: []
    })
    useEffect(() => {
        getCourses()
    }, [])
    useEffect(() => {
        if (courses != undefined)
            getQuiz().then((aaaa) => {
                setLoading(false)
            })
    }, [courses])
    const getCourses = async () => {
        try {
            apiCall.current = API.request('/course/author/', true, {
                teacher_id: globalUser.user_id
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            setCourses(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    const getQuiz = async () => {
        try {
            const res = await axios.post(`https://api.aqua.ir:8283/quiz/`,
                { quiz_id: id },
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            if (res.data.message == "Valid token") {
                setTimeToDone(res.data.data[0].expiration_time)
                let tmpq = res.data.data[0]
                let tempQuiz = {
                    course_id: tmpq.course_id,
                    course_slug: tmpq.course_slug,
                    user_id: globalUser.user_id,
                    title: tmpq.title,
                    questions: []
                }
                let content = JSON.parse(tmpq.content)
                for (var z = 0; z < content.length; z++)
                    tempQuiz.questions.push(content[z])
                // for (var w = 0; w < courses.length; w++) {
                //     if (response.data.course_slug == courses[w])

                // }
                setQuiz(tempQuiz)
                return tempQuiz
            }
        } catch (err) {
            console.log(err)
        }
    }
    const dropDownHandler = (e) => {
        let slug = undefined
        let i = 0
        for (i; i < courses.length; i++) {
            if (e.nativeEvent.target.value == courses[i].id)
                slug = courses[i].slug
        }
        let q = { ...quiz }
        q.course_id = e.nativeEvent.target.value
        q.course_slug = slug
        setQuiz(q)
    }
    const onTitleChange = (e) => {
        let qq = { ...quiz }
        qq.title = e.target.value
        setQuiz(qq)
    }
    const quizSubmit = async () => {
        if (quiz.course_id == undefined) {
            setErr("لطفا دوره مد نظر را انتخاب کنید")
            return
        }
        if (quiz.title.length == 0) {
            setErr("عنوان کوییز را وارد کنید")
            return
        }
        const len = quiz.questions.length
        for (var i = 0; i < len; i++) {
            let count = 0
            let emptyQuestion = false
            if (quiz.questions[i].questionText.length == 0) {
                setErr("صورت سوال نمیتواند خالی باشد")
                return
            }
            for (var j = 0; j < 4; j++) {
                if (quiz.questions[i].answerOptions[j].isCorrect == true) {
                    count++
                }
                if (quiz.questions[i].answerOptions[j].answerText.length == 0)
                    emptyQuestion = true
            }
            if (count > 1) {
                setErr("یک سوال فقط میتواند جواب درست داشته باشد")
                return
            }
            else if (count == 0) {
                setErr(" یک سوال نمیتواند جواب درست نداشته باشد")
                return
            }
            else if (emptyQuestion) {
                setErr("متن جواب نمیتواند خالی باشد")
                return
            }

        }
        let content = JSON.stringify(quiz.questions);
        try {
            apiCall.current = API.request('/quiz/update/', true, {
                id: id,
                title: quiz.title,
                content: content,
                expiration_time: timeToDone.toString()
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            if (res.message == "Valid token") {
                setModal(true)
                setTimeout(() => {
                    history.push("/created-quizes")
                }, 2000);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Helmet>
                <title>ویرایش کوییز</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"quiz"} secondChildSelected={true} />} />
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
                            <div className="col-md-3 no-mobile">
                                <UserDashboard currentTab={"quiz"} secondChildSelected={true} />
                            </div>

                            <div className="col-md-9 overFlowHandler ">
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
                                                <h1 className={classes.createQuizTitle}>ساخت کوییز جدید</h1>
                                                <div className={classes.quizContainer}>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className={classes.subHeaders}>عنوان کوییز</div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input className="form-control" type='text' name="title" onChange={onTitleChange} value={quiz.title} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className={classes.subHeaders}>زمان مورد نیاز برای انجام آزمون بر حسب دقیقه</div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input className="form-control" value={timeToDone} type={"number"} onChange={(e) => setTimeToDone(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    {quiz.questions.map((question, index) => {
                                                        const setQuestion = (q) => {
                                                            let s = { ...quiz };
                                                            s.questions[index] = { ...q };
                                                            setQuiz(s);
                                                        };
                                                        const removeQuestion = (q) => {
                                                            let s = { ...quiz };
                                                            let indx = s.questions.indexOf(s.questions[index])
                                                            s.questions.splice(indx , 1)
                                                            setQuiz(s)
                                                        }

                                                        return <QuestionView question={question} setQuestion={setQuestion} removeQuestion={removeQuestion} />
                                                    })}
                                                    <div className="text-center" style={{ margin: '20px 0px' }}>
                                                        <div className={classes.buttonsWrapper}>
                                                            <div className="btn btn-md btn-success" onClick={() => {
                                                                let s = { ...quiz };
                                                                let q = {
                                                                    answerOptions: [],
                                                                    questionText: '',
                                                                };
                                                                for (var i = 0; i < 4; i++)
                                                                    q.answerOptions.push({ answerText: '', isCorrect: false });
                                                                s.questions.push(q);
                                                                setQuiz(s);
                                                            }}>افزودن سوال جدید</div>
                                                            <div className="btn btn-md btn-success" onClick={quizSubmit}> ثبت کوییز</div>
                                                        </div>

                                                        {err ? <div style={{ color: 'red' }}>{err}</div> : undefined}
                                                    </div>

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
            <Modal
                open={modal}
                onClose={() => setModal(false)}
            >
                <div className={classes.loginDoneModal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ویرایش کوییز موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
        </>
    );
}
function QuestionView({ question, setQuestion , removeQuestion}) {
    const classes = useStyles();
    return (
        <div className={classes.quizCard}>
            <div className={classes.questionTitleWrapper}>

                <div className="row">
                        <AppsIcon style={{ color: 'black' }} />
                    <div className="col-4">
                        <span className={classes.questionTitle}>سوال</span>
                    </div>
                    <div className="col-8">
                        <div style={{ textAlign: 'left' }} onClick={() => removeQuestion({...question})}>
                            <CloseIcon className={classes.questionDeleteIcon} style={{ color: 'black' }} />
                        </div>
                    </div>
                </div>
                <textarea className="form-control" placeholder="صورت سوال" value={question.questionText} onChange={e => {
                    setQuestion({
                        ...question,
                        questionText: e.target.value,
                    });
                }} />
            </div>
            <div className={classes.inputsWrapper}>
                <div className="row">
                    <div className="col-2" style={{ padding: 0 }}>
                        <div style={{ color: 'black', paddingRight: '20px' }} > <AppsIcon style={{ color: 'black' }} /> A)</div>
                    </div>
                    <div className="col-9" style={{ padding: 0 }}>
                        <textarea placeholder="متن گزینه اول" className="form-control" value={question.answerOptions[0].answerText} onChange={e => {
                            let q = { ...question };
                            q.answerOptions[0].answerText = e.target.value;
                            setQuestion(q);
                        }} />
                    </div>
                    <div className="col-1" style={{ padding: 0 }}>
                        {question.answerOptions[0].isCorrect ?
                            <CheckBoxIcon className={classes.isCorrectIconCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[0].isCorrect = !q.answerOptions[0].isCorrect;
                                setQuestion(q);
                            }} /> :
                            <CheckBoxIcon className={classes.isCorrectIconNotCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[0].isCorrect = !q.answerOptions[0].isCorrect;
                                setQuestion(q);
                            }} />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ padding: 0 }}>
                        <div style={{ color: 'black', paddingRight: '20px' }} > <AppsIcon style={{ color: 'black' }} /> B)</div>
                    </div>
                    <div className="col-9" style={{ padding: 0 }}>
                        <textarea placeholder="متن گزینه دوم" className="form-control" value={question.answerOptions[1].answerText} onChange={e => {
                            let q = { ...question };
                            q.answerOptions[1].answerText = e.target.value;
                            setQuestion(q);
                        }} />
                    </div>
                    <div className="col-1" style={{ padding: 0 }}>
                        {question.answerOptions[1].isCorrect ?
                            <CheckBoxIcon className={classes.isCorrectIconCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[1].isCorrect = !q.answerOptions[1].isCorrect;
                                setQuestion(q);
                            }} /> :
                            <CheckBoxIcon className={classes.isCorrectIconNotCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[1].isCorrect = !q.answerOptions[1].isCorrect;
                                setQuestion(q);
                            }} />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ padding: 0 }}>
                        <div style={{ color: 'black', paddingRight: '20px' }} > <AppsIcon style={{ color: 'black' }} /> C)</div>
                    </div>
                    <div className="col-9" style={{ padding: 0 }}>
                        <textarea placeholder="متن گزینه سوم" className="form-control" value={question.answerOptions[2].answerText} onChange={e => {
                            let q = { ...question };
                            q.answerOptions[2].answerText = e.target.value;
                            setQuestion(q);
                        }} />
                    </div>
                    <div className="col-1" style={{ padding: 0 }}>
                        {question.answerOptions[2].isCorrect ?
                            <CheckBoxIcon className={classes.isCorrectIconCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[2].isCorrect = !q.answerOptions[2].isCorrect;
                                setQuestion(q);
                            }} /> :
                            <CheckBoxIcon className={classes.isCorrectIconNotCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[2].isCorrect = !q.answerOptions[2].isCorrect;
                                setQuestion(q);
                            }} />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-2" style={{ padding: 0 }}>
                        <div style={{ color: 'black', paddingRight: '20px' }} > <AppsIcon style={{ color: 'black' }} /> D)</div>
                    </div>
                    <div className="col-9" style={{ padding: 0 }}>
                        <textarea placeholder="متن گزینه چهارم" className="form-control" value={question.answerOptions[3].answerText} onChange={e => {
                            let q = { ...question };
                            q.answerOptions[3].answerText = e.target.value;
                            setQuestion(q);
                        }} />
                    </div>
                    <div className="col-1" style={{ padding: 0 }}>
                        {question.answerOptions[3].isCorrect ?
                            <CheckBoxIcon className={classes.isCorrectIconCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[3].isCorrect = !q.answerOptions[3].isCorrect;
                                setQuestion(q);
                            }} /> :
                            <CheckBoxIcon className={classes.isCorrectIconNotCorrect} onClick={() => {
                                let q = { ...question };
                                q.answerOptions[3].isCorrect = !q.answerOptions[3].isCorrect;
                                setQuestion(q);
                            }} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}