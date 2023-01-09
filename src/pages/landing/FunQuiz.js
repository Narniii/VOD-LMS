import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../utils/api";
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Helmet } from "react-helmet";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon
} from "react-share";




const useStyles = makeStyles((theme) => ({
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0,
            bottom: 0
        },
        "100%": {
            opacity: 1,
            top: 0
        }
    },
    quizWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: "#E0D5D3",
        // backgroundColor: "#E09600",
        // backgroundColor: "#253341",
        // boxShadow: '15px 15px 15px -1px rgba(0,0,0,0.72), -1px -1px 10px -3px rgba(0,0,0,0.76);',
        boxShadow: '3px 3px 5px -1px rgba(0,0,0,0.72), -3px -3px 5px -1px rgba(0,0,0,0.72);',
        borderRadius: '5px',
        width: '70vw',
        height: '80vh',
        alignItems: "center",
        padding: '50px',
        animation: "$fadeIn .6s ease-in-out"

    },
    progressWrapper: {
        position: 'absolute',
        bottom: '-30px',
        left: '-35px'
    },
    progressPercentage: {
        position: 'absolute',
        top: ' 50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Spartan !important',
        fontSize: '12px',
        color: '#1d5643',
        fontWeight: 400
    },
    questionsInputWrapper: {
        // background: 'lightgrey', 
        width: '50vw',
        height: '50vh',
        margin: '30px auto',
        padding: '10px',
        borderRadius: '5px',
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "center",
        alignItems: "center"

    },
    quizCountTitle: {
        color: 'black'
    },
    quizButtons: {
        display: 'block',
        border: '1px solid #81A292',
        margin: '10px 0px',
        width: '100%',
        textAlign: 'right',
        borderRadius: '5px',
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#8D6860',
            border: '1px solid white',
        },
        // '&:hover': {
        //     backgroundColor: '#253341',
        //     // border: '1px solid white',
        //     color:"white"
        // },

        // '&:focus': {
        //     backgroundColor: '#81A292',
        //     border: '1px solid #8D6860',

        // }
    },
    winnerBtn: {
        display: 'block',
        border: 'none',
        margin: '10px 0px',
        width: '100%',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '10px 20px',
        color: 'white',
        background: 'green'
    },
    failBtn: {
        display: 'block',
        border: 'none',
        margin: '10px 0px',
        width: '100%',
        textAlign: 'center',
        borderRadius: '5px',
        padding: '10px 20px',
        color: 'white',
        background: 'red'
    },
    questionText: {
        color: 'black',
        fontWeight: "bold",
        fontSize: '18px',
        margin: '5px 0px'
    },
    scoreSection: {
        margin: '10vh auto',
    },
    scorePaper: {
        // height: '400px',
        padding: '15% 40px',
        borderRadius: '10px',
    },
    container: {
        width: '80%',
        margin: '0 auto',
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        textAlign: "center",
        flexWrap: "wrap"
    },
    resultText: {
        color: 'black',
        marginTop: '30px'
    },
    logo: {
        textAlign: 'center',
        color: 'green',
        display: 'block',
        fontSize: '50px !important',
        textAlign: 'center'
    },
    failLogo: {
        textAlign: 'center',
        color: 'red',
        display: 'block',
        fontSize: '50px !important',
        textAlign: 'center'
    },
    quizTitles: {
        color: '#64c5ba',
        fontWeight: '600',
        display: 'inline-block',
        margin: '5px 0px'
    },
    quizTexts: {
        color: 'black',
        display: 'inline-block'
    },
    successTxt: {
        marginTop: '20px',
        textAlign: 'center',
        color: 'green'
    },
    failTxt: {
        marginTop: '20px',
        textAlign: 'center',
        color: 'red'
    },
    emailWrapper: {
        display: "flex !important",
        flexDirection: "column !important",
        width: '20vw',
        justifyContent: "space-between !important",
        textAlign: "center !important",
    },
    shareIcons: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px"
    },
    line: {
        color: "purple"
    }
}))


const FunQuiz = () => {
    const classes = useStyles()
    const [started, setStarted] = useState(false)
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const [loading, setLoading] = useState(true)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState(undefined)
    const [accuracy, setAccuracy] = useState(undefined)
    const [quizDone, setQuizDone] = useState(false)
    const [winner, setWinner] = useState(undefined)
    const [timer, setTimer] = useState(undefined)
    const countDown = useRef()
    const [quiz, setQuiz] = useState({
        time: '',
        qna: [],
        result_stmt: []
    })
    const [email, setEmail] = useState(undefined)
    const [questions, setQuestions] = useState(undefined)
    const [lastQuizId, setLastQuizId] = useState(undefined)
    const [userQuizId, setUserQuizId] = useState(undefined)
    const [newQuiz, setNewQuiz] = useState(false)
    const [showLastResults, setShowLastResults] = useState(false)
    const [lastResult, setLastResult] = useState(undefined)
    const [stmt, setStmt] = useState(undefined)
    const [shonte, setShonte] = useState(undefined)
    const [quote, setQuote] = useState(undefined)


    useEffect(() => {
        if (shuffledQuestions != undefined) {
            setLoading(false)
        }

    }, [shuffledQuestions])
    useEffect(() => {
        if (lastResult != undefined) {
            setLoading(false)
        }

    }, [lastResult])

    useEffect(() => {
        if (newQuiz == true) {
            getFunQuiz()
        }
    }, [newQuiz])

    const emailSubmit = async () => {
        console.log(email)
        try {
            apiCall.current = API.request('/funquiz/add/user/email/', true, {
                user_email: email
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == 'Created successfully') {
                setNewQuiz(true)
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
        }
    }

    const getUserFunQuizes = async () => {
        console.log(email)
        try {
            apiCall.current = API.request('/funquiz/get/last/', true, {
                user_email: email
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == "no quiz found" || res.message == "Fetched successfully") {
                setStarted(true)

                if (res.message == "no quiz found") {
                    emailSubmit()
                }
                else if (res.message == "Fetched successfully") {
                    if (res.data[0].result != -1) {
                        setLastResult(res.data[0].result)
                        setUserQuizId(res.data[0].id)
                        setNewQuiz(false)
                    }
                }
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
            console.log(err.response)
            console.log(err.message)
        }

    }


    const getFunQuiz = async () => {
        try {
            apiCall.current = API.request('/funquiz/get/', false, {
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == 'Fetched successfully') {

                let conste = JSON.parse(res.data[0].qna)
                let shonte = JSON.parse(res.data[0].result_stmt)
                // let conste = res.data[0].qna
                // let shonte = res.data[0].result_stmt

                console.log(conste)
                console.log(shonte)
                setShonte(shonte)

                setQuestions(conste)
                setQuiz({
                    ...quiz,
                    time: res.data[0].time,
                    qna: conste,
                    result_stmt: shonte
                })
                setTimer(res.data[0].time * 60)
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
        }
    }


    const handleAnswerOptionClick = (isCorrect) => {
        var quiz_done;
        if (isCorrect) {
            localStorage.setItem(`quiz${userQuizId}`, parseFloat(score) + 1)
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < shuffledQuestions.length) {
            setCurrentQuestion(nextQuestion);
            quiz_done = false
            console.log(currentQuestion)

        } else {
            setQuizDone(true)
            quiz_done = true
            setLoading(true)
            console.log('quiz done')
        }
    };

    useEffect(() => {
        if (questions != undefined && quiz != undefined) {
            handleShuffling()
        }
    }, [quiz, questions])

    const handleShuffling = () => {
        if (quiz.qna.length != 0) {
            let shuffledArray = questions.sort((a, b) => 0.5 - Math.random());
            for (let i = 0; i < shuffledArray.length; i++) {
                shuffledArray[i].answerOptions = shuffledArray[i].answerOptions.sort((a, b) => 0.5 - Math.random())
            }
            let FunQuestions = shuffledArray.slice(0, 10)

            setShuffledQuestions(FunQuestions)
        } else setLoading(true)
    }


    useEffect(() => {
        if (shuffledQuestions != undefined) {
            countDown.current = setInterval(() => {
                setTimer((prevProgress) => (prevProgress == 0 ? 0 : prevProgress - 1));
            }, 1000);
            return () => {
                if (countDown.current)
                    clearInterval(countDown.current);
            };
        }
    }, [shuffledQuestions]);


    function LinearProgressWithLabel({ value }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ direction: 'ltr' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress className={classes.line} variant="determinate" value={value * 100 / quiz.expiration_time / 60} />
                    {/* <LinearProgress variant="determinate" value={(parseInt(value * 100) / quiz.expiration_time)} /> */}
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant="body2" color="text.secondary" >
                        {new Date(value * 1000).toISOString().substr(11, 8)}
                    </Typography>
                </Box>
            </Box>
        );
    }

    const scoreCalculator = () => {
        if (shonte != undefined) {
            var accuracy;
            // var stmt;
            clearInterval(countDown.current);
            let questionsCount = 10
            let sccore = localStorage.getItem(`quiz${userQuizId}`)
            if (sccore != null) {
                accuracy = parseFloat(sccore) / questionsCount * 100
            } else {
                accuracy = 0
            }
            if (accuracy > 60) {
                setWinner(true)
            }
            if (accuracy >= 80) {
                for (var h = 0; h < shonte.length; h++) {
                    if (shonte[h].level == "عالی بود") {
                        setStmt(shonte[h].level)
                        setQuote(shonte[h].quotes[Math.floor(Math.random() * shonte[h].quotes.length)])
                    }
                }
            } else if (accuracy >= 60) {
                for (var h = 0; h < shonte.length; h++) {
                    if (shonte[h].level == "خوب بود") {
                        setStmt(shonte[h].level)
                        setQuote(shonte[h].quotes[Math.floor(Math.random() * shonte[h].quotes.length)])
                    }
                }
            } else if (accuracy >= 40) {
                for (var h = 0; h < shonte.length; h++) {
                    if (shonte[h].level == "متوسط") {
                        setStmt(shonte[h].level)
                        setQuote(shonte[h].quotes[Math.floor(Math.random() * shonte[h].quotes.length)])
                    }
                }
            } else if (accuracy >= 20) {
                for (var h = 0; h < shonte.length; h++) {
                    if (shonte[h].level == "نیاز به مطالعه بیشتر") {
                        setStmt(shonte[h].level)
                        setQuote(shonte[h].quotes[Math.floor(Math.random() * shonte[h].quotes.length)])
                    }
                }
            } else if (accuracy >= 0) {
                for (var h = 0; h < shonte.length; h++) {
                    if (shonte[h].level == "ضعیف") {
                        setStmt(shonte[h].level)
                        setQuote(shonte[h].quotes[Math.floor(Math.random() * shonte[h].quotes.length)])
                    }
                }
            }
            localStorage.removeItem(`quiz${userQuizId}`)

            setAccuracy(accuracy)
            setShowScore(true);
            setLoading(false)
        }
    }


    useEffect(() => {
        if (quiz != undefined)
            if (timer === 0) {
                setQuizDone(true)

            }
    }, [timer])


    useEffect(() => {
        if (quizDone != false)
            scoreCalculator()
    }, [quizDone])

    useEffect(async () => {
        if (email != undefined && accuracy != undefined) {
            console.log(email)
            console.log(accuracy)
            try {
                apiCall.current = API.request('/funquiz/add/result/', true, {
                    user_email: email,
                    result: accuracy
                })
                const res = await apiCall.current.promise
                console.log(res)
                if (res.message == "Created successfully") {
                    console.log("new result added !")

                    setUserQuizId(res.data)
                }
            } catch (err) {
                console.log(err.response)
                console.log(err)
            }
        }

    }, [email, accuracy])


    const hh = () => {
        setLoading(true)
        emailSubmit()
    }

    return (
        <>
            <Helmet>
                <title> بیت کوییز</title>
            </Helmet>

            <div style={{
                backgroundColor: "#8D6860",
                // backgroundColor: "#253341",
                // backgroundColor: "#E09600",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
            }}>
                <div className={classes.quizWrapper}>
                    {started ?
                        <>
                            {newQuiz == false ?

                                <>
                                    {showLastResults == false ?
                                        <>
                                            <div className={classes.emailWrapper}>
                                                <h6 style={{ color: "gray", margin: "2px" }}>آیا میخواهید کوییز جدید بدهید یا نتیجه ی آخرین کوییز خود را مشاهده کنید ؟</h6>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                                    <button className="btn btn-outline-warning" onClick={hh}>کوییز جدید</button>
                                                    <Link to={{
                                                        pathname: `/bit-quiz/result/${userQuizId}`,
                                                    }}
                                                    >

                                                        <button className="btn btn-outline-secondary" onClick={() => {
                                                            setShowLastResults(true)
                                                        }}>مشاهده آخرین نتایج</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            {loading ?
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    height: '100%'
                                                }}>
                                                    <CircularProgress style={{ color: "#81A292" }} />
                                                </div>

                                                :
                                                <div className="text-dark">{lastResult}</div>
                                            }
                                        </>
                                    }
                                </>
                                :
                                <>
                                    {!loading ?
                                        <>
                                            {showScore ?
                                                <div className={classes.scoreSection}>
                                                    <Paper elevation={3} className={classes.scorePaper}>
                                                        <div className={classes.container}>
                                                            <div className="text-center">
                                                                {winner ?
                                                                    <CelebrationIcon className={classes.logo} />
                                                                    :
                                                                    <SentimentVeryDissatisfiedIcon className={classes.failLogo} />
                                                                }
                                                            </div>
                                                            <div>
                                                                <div className={classes.quizTitles}>تعداد جواب های درست:&nbsp;</div>
                                                                <div className={classes.quizTexts}>{score} از {shuffledQuestions.length}</div>

                                                            </div>
                                                            <div>

                                                                <div className={classes.quizTitles}>درصد جواب های درست:&nbsp;</div>
                                                                <div className={classes.quizTexts}>{accuracy}%</div>
                                                            </div>
                                                            <div>
                                                                <div className={classes.quizTitles}>{stmt}</div>
                                                                <div className="text-dark">{quote}</div>
                                                            </div>
                                                            {/* {winner ? <div className={classes.successTxt}>شما با موفقیت تست را گذراندید</div> : <div className={classes.failTxt}>شما در این تست  مردود شدید</div>} */}
                                                            <div className={classes.shareIcons}>
                                                                <TwitterShareButton
                                                                    url={`aqua.ir/bit-quiz/result/${userQuizId}`}
                                                                    children="content dariim che cntenti"
                                                                    title={'title'}
                                                                    className="Demo__some-network__share-button">
                                                                    <TwitterIcon
                                                                        size={32}
                                                                        round />
                                                                </TwitterShareButton>
                                                                <WhatsappShareButton
                                                                    url={`aqua.ir/bit-quiz/result/${userQuizId}`}
                                                                    children="content dariim che cntenti"
                                                                    title="check out my aqua quiz results"

                                                                    className="Demo__some-network__share-button">
                                                                    <WhatsappIcon
                                                                        size={32}
                                                                        round />
                                                                </WhatsappShareButton>
                                                                <FacebookShareButton
                                                                    url={`aqua.ir/bit-quiz/result/${userQuizId}`}
                                                                    children="content dariim che cntenti"
                                                                    title={'title'}

                                                                    className="Demo__some-network__share-button">
                                                                    <FacebookIcon
                                                                        size={32}
                                                                        round />
                                                                </FacebookShareButton>
                                                                <EmailShareButton
                                                                    url={`aqua.ir/bit-quiz/result/${userQuizId}`}
                                                                    children="content dariim che cntenti"
                                                                    subject={'title'}

                                                                    className="Demo__some-network__share-button">
                                                                    <EmailIcon
                                                                        size={32}
                                                                        round />
                                                                </EmailShareButton>

                                                            </div>
                                                        </div>
                                                    </Paper>
                                                </div>
                                                :

                                                <div className={classes.questionsInputWrapper}>
                                                    <div className='text-dark' style={{ width: "100%" }}>
                                                        {shuffledQuestions.length != 0 && shuffledQuestions != undefined ? <>
                                                            <Box sx={{ width: '100%' }}>
                                                                <LinearProgressWithLabel value={timer} />
                                                            </Box>
                                                            <div className='question-section'>
                                                                <div className={classes.quizCountTitle}>
                                                                    <span>سوال {currentQuestion + 1}</span>
                                                                    /{shuffledQuestions.length}
                                                                </div>
                                                                <div className={classes.questionText}>سوال:
                                                                    {shuffledQuestions[currentQuestion].questionText}</div>
                                                            </div>
                                                            <div className='answer-section'>
                                                                {shuffledQuestions[currentQuestion].answerOptions.map((answerOption, index) => (
                                                                    <>
                                                                        <div>گزینه{index + 1}:</div>
                                                                        <button className={classes.quizButtons} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                                                    </>
                                                                ))}
                                                            </div>
                                                        </>
                                                            : undefined}

                                                    </div>

                                                </div>
                                            }

                                        </>
                                        :
                                        <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '100%'
                                        }}>
                                            <CircularProgress style={{ color: "#81A292" }} />
                                        </div>
                                    }
                                </>

                            }
                        </>
                        :
                        <div className={classes.emailWrapper}>
                            <h6 style={{ color: "gray", margin: "2px" }}>ایمیل خود را وارد کنید</h6>
                            <input type="email" onChange={e => setEmail(e.target.value)} style={{ borderRadius: "5px", margin: "2px", border: "1px solid gray" }} />
                            <button type="submit" className="btn btn-small btn-outline-secondary" onClick={getUserFunQuizes}>ثبت</button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default FunQuiz;