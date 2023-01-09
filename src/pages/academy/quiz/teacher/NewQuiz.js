import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CircularProgress, Divider, Hidden } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import '../Quizes.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { set } from "lodash";
import Navbar from "../../Navbar/Navbar";
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
        transform: 'translate(-50%, -50%)'
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
        margin: '20px auto !important',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
    },
    questionButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '20%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '20px 5px !important',
    },
    doneButton: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '20%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '20px 5px !important',
    },
    previewButtons: {
        border: 'none',
        padding: '10px 20px',
        backgroundColor: '#64c5ba',
        borderRadius: '5px',
        width: '30%',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '20px 5px !important',
        [theme.breakpoints.down('xs')]: {
            width: '45%',
            margin: '0px 5px !important',
            fontSize: '14px'
        },
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
export default function NewQuiz() {
    const apiCall = useRef(undefined);
    const [modal, setModal] = useState(false)
    const classes = useStyles();
    const [err, setErr] = useState(false)
    const [count, setCount] = useState(1)
    const [courses, setCourses] = useState(undefined)
    const { globalUser } = useSelector((state) => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [switchView, setSwitchView] = useState(false)
    const [quizPreview, setQuizPreview] = useState(true)
    const [done, setDone] = useState(false)
    const history = useHistory()
    const [quiz, setQuiz] = useState({
        course_id: undefined,
        course_slug: undefined,
        user_id: globalUser.user_id,
        title: '',
        questions: []
    })
    const [question, setQuestion] = useState({
        questionText: '',
        answerOptions: []
    })
    const [answers, setAnswers] = useState(
        [
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            }
        ]
    )
    const addQuizTitleHandler = () => {
        if (quiz.title == '') {
            setErr('عنوان کوییز را انتخاب کنید')
            return
        }
        if (quiz.course_id == undefined) {
            setErr('لطفا کوییز مد نظر را انتخاب کنید')
            return
        }
        setErr(undefined)
        setSwitchView(true)
    }
    const onChangeHandler = (e) => {
        let qc = { ...question }
        let ac = [...answers]
        if (e.target.name == "questionText") {
            qc.questionText = e.target.value
            setQuestion(qc)
        }
        else if (e.target.name.indexOf("answerText") != -1) {
            let answerIndex = e.target.name[8]
            ac[answerIndex].answerText = e.target.value
            setAnswers(ac)
        }
        else {
            let answerIndex = e.target.name[8]
            ac[answerIndex].isCorrect = e.target.checked
            setAnswers(ac)
        }
    }

    const handleNextQuestion = () => {
        let tempQuiz = { ...quiz }
        let tempQuizQuestion = { ...question }
        let tempAnswers = [...answers]
        let i = 0
        let k = 0
        for (i; i < 4; i++) {
            if (tempAnswers[i].answerText == '') {
                setErr('متن سوال هارا پر کنید')
                return
            }
            if (tempAnswers[i].isCorrect == true)
                k++
        }
        if (k > 1) {
            setErr('یک سوال نمیتواند بیشتر از یک جواب صحیح داشته باشد')
            return
        }
        else if (k == 0) {
            setErr('یک سوال نمیتواند جواب صحیح نداشته باشد')
            return
        }
        tempQuizQuestion.answerOptions = tempAnswers
        tempQuiz.questions.push(tempQuizQuestion)
        setErr(undefined)
        stateCleaner()
        setDone(true)
        setLoading(true)
        setQuiz(tempQuiz)
    }
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
    const handleQuizFinish = () => {
        let finalquiz = { ...quiz }
        let finalQuizQuestions = { ...question }
        let finalanswers = [...answers]
        finalQuizQuestions.answerOptions = finalanswers
        finalquiz.questions.push(finalQuizQuestions)
        setLoading(true)
        setQuiz(finalquiz)
        setDone(true)
        stateCleaner()
    }
    const stateCleaner = () => {
        setQuestion({
            questionText: '',
            answerOptions: []
        })
        setAnswers([
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            },
            {
                answerText: '',
                isCorrect: false
            }
        ])
    }
    const onTitleChange = (e) => {
        let qq = { ...quiz }
        qq.title = e.target.value
        setQuiz(qq)
    }
    const quizSubmit = async () => {
        let content = JSON.stringify(quiz.questions);
        try {
            apiCall.current = API.request('/quiz/create/', true, {
                teacher_id: globalUser.user_id,
                course_id: quiz.course_id,
                title: quiz.title,
                content: content,
                course_slug: quiz.course_slug
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            if (res.message == "Created successfully") {
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
    useEffect(() => {
        getCourses().then(() => {
            setLoading(false)
        })
    }, [])
    useEffect(() => {
        if (done == true) {
            setQuizPreview(true)
            setLoading(false)
        }
    }, [quiz])
    let views = []
    let i = 0
    for (i; i < 4; i++) {
        views.push(<>
            <div className="col-md-4">
                <div>جواب {i + 1}</div>
                <div>متن گزینه {i + 1}</div>
            </div>
            <div className="col-md-8">
                <textarea className="form-control" value={answers[i].answerText} type='text' name={`answers[${i}].answerText`} style={{ display: 'inline-block' }} onChange={onChangeHandler} />
                <div>
                    <span>آیا این گزینه جواب صحیح است؟</span><input type="checkbox" checked={answers[i].isCorrect} onChange={onChangeHandler} name={`answers[${i}].isCorrect`} style={{ marginLeft: '5px' }} />
                </div>
            </div>
        </>)
    }
    return (
        <>
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

                            <div className="col-md-9 text-dark text-center overFlowHandler new-quiz-inputs">
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
                                                {!switchView ?
                                                    <>
                                                        <h2>ساخت کوییز جدید</h2>
                                                        <div className="row">
                                                            <div className="col-md-3">
                                                                <div>انتخاب دوره</div>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <Form.Select onChange={dropDownHandler}>
                                                                    <option value={-1}>دوره</option>
                                                                    {courses.length != 0 ?
                                                                        <>
                                                                            {courses.map((course) => {
                                                                                return <option key={course.id} value={course.id}>{course.title}</option>
                                                                            })}
                                                                        </>
                                                                        : undefined}
                                                                </Form.Select>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <div>عنوان کوییز</div>
                                                            </div>
                                                            <div className="col-md-9">
                                                                <input style={{ margin: '20px auto' }} className="form-control" type='text' name="title" onChange={onTitleChange} value={quiz.title} />
                                                            </div>
                                                        </div>
                                                        {err ? <h5 style={{ color: 'red', margin: '10px 0px' }}>{err}</h5> : undefined}
                                                        <div className="text-center"><button className={classes.greenBtn} onClick={addQuizTitleHandler}>ادامه</button></div>
                                                    </>
                                                    :
                                                    <>
                                                        {quizPreview ?
                                                            <>
                                                                <div className="text-center">
                                                                    <button className={classes.previewButtons} onClick={() => setQuizPreview(false)}>افزودن سوال جدید</button>
                                                                    <button className={classes.previewButtons} onClick={quizSubmit}>ثبت کوییز</button>
                                                                </div>
                                                                <div style={{ width: '100%' }}>
                                                                    کوییز ساخته شده
                                                                </div>
                                                                <table style={{ width: "90%", margin: "10px 20px" }}>
                                                                    {quiz.questions.map((question) => {
                                                                        return <tr >
                                                                            <td>متن سوال:{question.questionText}</td>
                                                                            <td> {question.answerOptions.map((answer) => {
                                                                                return <div>
                                                                                    <div><span>متن گزینه:</span><span>{answer.answerText}</span></div>
                                                                                    <div>آیا این گزینه جواب صحیح است:{answer.isCorrect.toString()}</div>
                                                                                    <Divider style={{ height: '3px', margin: '5px 0px', background: 'darkgrey' }} />
                                                                                </div>
                                                                            })}</td>
                                                                        </tr>
                                                                    })}
                                                                </table>
                                                            </>
                                                            :
                                                            <div className="row">
                                                                <h4> سوال جدید </h4>
                                                                <div className="col-md-4">
                                                                    <div>صورت سوال </div>
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <textarea className="form-control" value={question.questionText} type='text' name="questionText" style={{ display: 'inline-block' }} onChange={onChangeHandler} />
                                                                </div>
                                                                {views}
                                                                {err ? <h5 style={{ color: 'red', margin: '10px 0px' }}>{err}</h5> : undefined}
                                                                <div className="text-center">
                                                                    <button className={classes.questionButton} onClick={handleNextQuestion}>ثبت</button>
                                                                    {/* <button className={classes.doneButton} onClick={handleQuizFinish}>پیش نمایش کوییز</button> */}
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                                }

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
                        <span className="text-dark" style={{ marginRight: '10px' }}>ساخت کوییز موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
        </>
    );
} // const [checkboxValue, setCheckBoxValue] = useState(false);
// const [count, setCount] = useState(1)
// const [quizPreview, setQuizPreview] = useState(false)
// const handleCheckBox = () => {
//     if (checkboxValue === true)
//         setCheckBoxValue(false)
//     else setCheckBoxValue(true)
// }
// const [switchView, setSwitchView] = useState(false)
// const [quiz, setQuiz] = useState({
//     user_id: undefined,
//     course_id: undefined,
//     questions: []
// })
// const onChange = e => {
//     var q = { ...questions };
//     q[e.target.name] = e.target.value;
//     setQuestions(q)
// }
// const answerChange = e => {
//     var a = { ...answer };
//     a[e.target.name] = e.target.value;
//     setAnswer(a)
// }
// const nextQuestionSubmit = () => {
//     let qqq = { ...questions }
//     let abc = { ...answer }
//     abc.answerText = answer.answerText
//     abc.isCorrect = checkboxValue
//     qqq.answerOptions.push(abc)
//     setQuestions(qqq)
//     let bb = { ...answer }
//     bb.answerText = ''
//     bb.isCorrect = false
//     setAnswer(bb)
//     if (qqq.answerOptions.length == 4) {
//         setCount(count + 1)
//         setSwitchView(false)
//         let quizzz = quiz
//         quizzz.questions.push(qqq)
//         setQuiz(quizzz)
//         setQuestions({
//             questionText: '',
//             answerOptions: []
//         })
//     }
// }
{/* <>
     {!quizPreview ?
         <>
             <div className='text-dark'>
                 {!switchView ?
                     <>
                         <div>سوال {count}</div>
                         <div>صورت سوال</div>
                         <textarea className="form-control" type='text' name="questionText" onChange={onChange} value={questions.questionText} />
                         <button onClick={() => setSwitchView(true)}>ثبت</button>
                         <button onClick={() => setQuizPreview(true)}>done</button>
                     </>
                     :
                     <>
                         <div>answer text</div>
                         <input type='text' name="answerText" onChange={answerChange} value={answer.answerText} />
                         <div>
                             <span>is answer?</span>
                             <input type="checkbox" style={{ marginLeft: '5px' }} onClick={handleCheckBox} />
                         </div>
                         <button onClick={nextQuestionSubmit}>next</button>
                     </>
                 }
             </div>
         </> :
         <div className='text-dark text-center' style={{ direction: 'ltr !important' }}>
             <table style={{ width: "90%", margin: "10px 20px" }}>
                 <tr>کوییز ساخته شده</tr>
                 {quiz.questions.map((question) => {
                     return <tr >
                         <td>سوال:{question.questionText}</td>
                         <td> {question.answerOptions.map((answer) => {
                             return <div>
                                 <div><span style={{ color: 'blue !important' }}>جواب:</span><span style={{ color: 'green !important' }}>{answer.answerText}</span></div>
                                 <div style={{ color: 'cyan !important' }}>آیا این گزینه جواب صحیح است:{answer.isCorrect.toString()}</div>
                             </div>
                         })}</td>
                     </tr>
                     // <div>
                     //     <div style={{ color: 'black !important' }}></div>
                     //    
                     //    
                     //    
                     //    
                     //    
                     //    
                     // </div>
                 })}
             </table>
             <div></div>
         </div>
     }
 </> */}