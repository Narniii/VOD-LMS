import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, Redirect, useHistory } from "react-router-dom";
import { CircularProgress, Divider, Hidden } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import Navbar from "../../Navbar/Navbar";
import AppsIcon from '@mui/icons-material/Apps';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Helmet } from "react-helmet";


const useStyles = makeStyles((theme) => ({
    select: {
        borderRadius: "5px",
        border: "1px solid #f2f2f2"
    },
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
        width: '100%',
        padding: "20px"
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
    quoteDeleteIcon: {
        color: 'darkorange !important',
        cursor: "pointer"
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
        // width: '50%',
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
    },
    editModal: {
        position: 'absolute',
        width: '70vw',
        height: '70vh',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none !important',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        outline: 'none',
        overflow: "scroll",
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        },
    },
}));

const CreateFunQuiz = () => {
    const apiCall = useRef(undefined);
    const [modal, setModal] = useState(false)
    const [quotesModal, setQuotesModal] = useState(false)
    const [questionsModal, setQuestionsModal] = useState(false)
    const classes = useStyles();
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    // const [timeToDone, setTimeToDone] = useState(undefined)
    const { globalUser } = useSelector(state => state.userReducer)
    const [quiz, setQuiz] = useState({
        qna: [],
        time: undefined,
        result_stmt: [
            // {
            //     level: 'عالی بود',
            //     quotes: []
            // },
            // {
            //     level: 'خوب بود',
            //     quotes: []
            // },
            // {
            //     level: 'متوسط',
            //     quotes: []
            // },
            // {
            //     level: 'نیاز به مطالعه بیشتر',
            //     quotes: []
            // },
            // {
            //     level: 'ضعیف',
            //     quotes: []
            // },
        ]
    })



    useEffect(() => {
        getFunQuiz()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }

    }, [])

    const onTitleChange = (e) => {
        let qq = { ...quiz }
        qq.title = e.target.value
        setQuiz(qq)
    }



    const getFunQuiz = async () => {
        try {
            apiCall.current = API.request('/funquiz/get/', false, {
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == "Fetched successfully") {
                console.log("hi")
                // setPrevQuizState(res.data[0])
                // setTimeToDone(res.data[0].time)
                let tmpq = res.data[0]
                let tempQuiz = {
                    time: tmpq.time,
                    qna: [],
                    result_stmt: []
                }
                let content = JSON.parse(tmpq.qna)
                let resultquotes = JSON.parse(tmpq.result_stmt)
                // let content = tmpq.qna
                // let resultquotes = tmpq.result_stmt
                // let salam = JSON.parse(tmpq)
                // console.log(salam)
                console.log(content)
                console.log(resultquotes)
                for (var f = 0; f < resultquotes.length; f++) {
                    tempQuiz.result_stmt.push(resultquotes[f])
                }
                console.log(content)
                for (var z = 0; z < content.length; z++) {
                    tempQuiz.qna.push(content[z])
                }
                setQuiz(tempQuiz)
            }

        }
        catch (err) {
            setErr("خطایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
            console.log(err.status)
        }
    }

    const quizSubmit = async () => {
        const len = quiz.qna.length
        for (var i = 0; i < len; i++) {
            let count = 0
            let emptyQuestion = false
            if (quiz.qna[i].questionText.length == 0) {
                setErr("صورت سوال نمیتواند خالی باشد")
                return
            }
            if (quiz.qna[i].level == '--') {
                setErr("درجه سختی سوال را انتخاب کنید")
                return
            }
            if (quiz.qna[i].category == '--') {
                setErr("دسته بندی سوال را انتخاب کنید")
                return
            }
            for (var j = 0; j < 4; j++) {
                if (quiz.qna[i].answerOptions[j].isCorrect == true) {
                    count++
                }
                if (quiz.qna[i].answerOptions[j].answerText.length == 0)
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
        let content = JSON.stringify(quiz.qna);
        let resultquotes = JSON.stringify(quiz.result_stmt)
        // let content = quiz.qna;
        // let resultquotes = quiz.result_stmt
        console.log(content)
        console.log(resultquotes)
        try {
            apiCall.current = API.request('/funquiz/update/', true, {
                qna: content,
                time: quiz.time,
                result_stmt: resultquotes
            }, globalUser.accessToken)
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == "updated succesfully") {
                setModal(true)
                setTimeout(() => {
                    history.push("/welcome")
                }, 2000);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const editQuotes = () => {
        setQuotesModal(true)
    }
    const editQuestions = () => {
        setQuestionsModal(true)
    }


    const quoteSubmit = async () => {
        setQuotesModal(false)
        console.log(quiz)

    }
    const queSubmit = async () => {
        console.log(quiz)
        setQuestionsModal(false)

    }
    return (
        <>
            <Helmet>
                <title>ویرایش بیتداد کوییز</title>
            </Helmet>
            <Navbar children={<UserDashboard currentTab={"bit-quiz"} firstChildSelected={true} />} />
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
                                <UserDashboard currentTab={"bit-quiz"} firstChildSelected={true} />
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
                                                <h1 className={classes.createQuizTitle}>ویرایش بیتداد کوییز</h1>
                                                <div className={classes.quizContainer}>

                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className={classes.subHeaders}>زمان مورد نیاز برای انجام آزمون بر حسب دقیقه</div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input className="form-control" placeholder={quiz.time} value={quiz.time} type={"number"} onChange={e => {
                                                                setQuiz({
                                                                    ...quiz,
                                                                    time: e.target.value,
                                                                });
                                                            }} />
                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className={classes.subHeaders}>ویرایش سوالات</div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <button className="btn btn-small btn-outline-success" onClick={editQuestions}>ویرایش</button>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className={classes.subHeaders}>ویرایش متون نتیجه</div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <button className="btn btn-small btn-outline-success" onClick={editQuotes}>ویرایش</button>
                                                        </div>

                                                        <div className="btn btn-md btn-success" onClick={quizSubmit}> ثبت </div>
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
                        <span className="text-dark" style={{ marginRight: '10px' }}>ثبت تغییرات موفقیت آمیز بود</span>
                    </div>
                </div>
            </Modal>
            <Modal
                open={quotesModal}
                onClose={() => setModal(false)}
            >
                <div className={classes.editModal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%', flexDirection: "column", }}>
                        <div className={classes.buttonsWrapper}>
                            {/* <div className="btn btn-md btn-success" style={{ margin: "2px" }} onClick={() => {
                                let s = { ...quiz };
                                let q = {
                                    level: '',
                                    quotes: []
                                };
                                if (s.result_stmt != null) {
                                    s.result_stmt.push(q);
                                }

                                setQuiz(s);

                            }}>افزودن سطح جدید</div> */}
                            <div className="btn btn-md btn-success" style={{ margin: "2px" }} onClick={quoteSubmit}>تایید متن ها </div>
                        </div>

                        {err ? <div style={{ color: 'red' }}>{err}</div> : undefined}
                        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                            {quiz.result_stmt.map((stmt, index) => {
                                const setQuote = (q) => {
                                    let s = { ...quiz };
                                    s.result_stmt[index] = { ...q };
                                    setQuiz(s);
                                };
                                const removeQuote = (q) => {
                                    let s = { ...quiz };
                                    let indx = s.result_stmt.indexOf(s.result_stmt[index])
                                    s.result_stmt.splice(indx, 1)
                                    setQuiz(s)
                                }
                                return <QuoteAddView stmt={stmt} setQuote={setQuote} removeQuote={removeQuote} />
                            })}
                        </div>

                    </div>
                </div>
            </Modal>

            <Modal
                open={questionsModal}
                onClose={() => setModal(false)}
            >
                <div className={classes.editModal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%', flexDirection: "column", }}>
                        <div className="text-center" style={{ margin: '20px 0px' }}>
                            <div className={classes.buttonsWrapper}>
                                <div className="btn btn-md btn-success" style={{ margin: "2px" }} onClick={() => {
                                    let s = { ...quiz };
                                    let q = {
                                        questionText: '',
                                        answerOptions: [],
                                        level: '',
                                        category: ''
                                    };
                                    for (var i = 0; i < 4; i++)
                                        q.answerOptions.push({ answerText: '', isCorrect: false });
                                    s.qna.push(q);
                                    setQuiz(s);
                                }}>افزودن سوال جدید</div>
                                <div className="btn btn-md btn-success" style={{ margin: "2px" }} onClick={queSubmit}> تایید سوالات </div>

                            </div>

                            {err ? <div style={{ color: 'red' }}>{err}</div> : undefined}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                            {quiz.qna.map((question, index) => {
                                const setQuestion = (q) => {
                                    let s = { ...quiz };
                                    s.qna[index] = { ...q };
                                    setQuiz(s);
                                };
                                const removeQuestion = (q) => {
                                    let s = { ...quiz };
                                    let indx = s.qna.indexOf(s.qna[index])
                                    s.qna.splice(indx, 1)
                                    setQuiz(s)
                                }
                                return <QuestionView question={question} setQuestion={setQuestion} removeQuestion={removeQuestion} />
                            })}
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}

export default CreateFunQuiz;



function QuestionView({ question, setQuestion, removeQuestion }) {
    const classes = useStyles();
    return (
        <div className={classes.quizCard}>
            <div className={classes.questionTitleWrapper}>

                <div className="row" style={{ padding: '3px' }}>
                    <div className="col-3">
                        <AppsIcon style={{ color: 'black' }} />
                        <span className={classes.questionTitle}>سوال</span>
                    </div>
                    <div className="col-3">
                        <select className={classes.select} value={question.level} id="level"
                            onChange={e => {
                                let q = { ...question };
                                q.level = e.target.value;
                                setQuestion(q);
                            }}
                        >
                            <option value='--'>level</option>
                            <option value='hard'>hard</option>
                            <option value='easy'>easy</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <select className={classes.select} value={question.category} id="categories" onChange={e => {
                            let q = { ...question };
                            q.category = e.target.value;
                            setQuestion(q);
                        }}>
                            <option value='--'>category</option>
                            <option value='first category'>first category</option>
                            <option value='second category'>second category</option>
                            <option value='third category'>third category</option>
                            <option value='fourth category'>fourth category</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <div style={{ textAlign: 'left' }} onClick={e => removeQuestion({ ...question })}>
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


function QuoteAddView({ stmt, setQuote, removeQuote }) {
    const classes = useStyles();
    return (
        <div className={classes.quizCard}>
            <div className={classes.questionTitleWrapper}>

                <div className="row" style={{ padding: '3px' }}>
                    <div className="col-1">
                        <AppsIcon style={{ color: 'black' }} />
                    </div>
                    <div className="col-5">
                        {/* <input className="form-control" placeholder={stmt.level} value={stmt.level} type={"number"} onChange={e => {
                            setQuote({
                                ...stmt,
                                level: e.target.value,
                            });
                        }} /> */}

                        <div className="form-control" placeholder={stmt.level}>
                            {stmt.level}
                        </div>
                    </div>
                    <div className="col-5">
                        <button className="btn btn-small btn-outline-success" onClick={() => {
                            let s = { ...stmt };
                            let q = '';
                            // for (var i = 0; i < s.quotes.length; i++)
                            s.quotes.push(q);
                            setQuote(s);
                        }}> افزودن متن</button>
                    </div>


                    {/* <div className="col-1">
                        <div style={{ textAlign: 'left' }} onClick={e => removeQuote({ ...stmt })}>
                            <CloseIcon className={classes.questionDeleteIcon} style={{ color: 'black' }} />
                        </div>
                    </div> */}


                </div>
                <div className={classes.inputsWrapper}>
                    {stmt.quotes.map((w, index) => {
                        return (
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                <textarea placeholder={w} className="form-control" value={w} onChange={e => {
                                    let q = { ...stmt };
                                    q.quotes[index] = e.target.value;
                                    setQuote(q)
                                }} />
                                <div style={{ textAlign: 'left' }} onClick={() => {
                                    let s = { ...stmt };
                                    let indx = s.quotes.indexOf(s.quotes[index])
                                    s.quotes.splice(indx, 1)
                                    setQuote(s)

                                }}>
                                    <CloseIcon className={classes.quoteDeleteIcon} style={{ color: 'black' }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}