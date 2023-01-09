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
    quizWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: "#E0D5D3",
        // boxShadow: '15px 15px 15px -1px rgba(0,0,0,0.72), -1px -1px 10px -3px rgba(0,0,0,0.76);',
        boxShadow: '3px 3px 5px -1px rgba(0,0,0,0.72), -3px -3px 5px -1px rgba(0,0,0,0.72);',
        borderRadius: '5px',
        width: '40vw',
        height: '80vh',
        alignItems: "center",
        padding: '50px',
        [theme.breakpoints.down('md')]: {
            width: '70vh',
        },
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
        justifyContent: "space-between !important",
        textAlign: "center",
    },
    shareIcons: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px"
    }
}))

const FunQuizResult = (props) => {
    const classes = useStyles()
    const [email, setEmail] = useState(undefined)
    const [lastResult, setLastResult] = useState(undefined)
    const userQuizId = props.match.params.id
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const [loading, setLoading] = useState(true)
    const [something, setSomething] = useState(undefined)
    const [score, setScore] = useState(undefined)
    const questioncount = 10
    const [winner, setWinner] = useState(undefined)
    const [stmt, setStmt] = useState(undefined)
    const [quote, setQuote] = useState(undefined)
    const [parsedStmt, setPersedStmt] = useState(undefined)

    useEffect(() => {
        getFunQuiz()
        getUserFunQuizes()
    }, [])

    const getFunQuiz = async () => {
        var parsedStmt = []
        try {
            apiCall.current = API.request('/funquiz/get/', false, {
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == 'Fetched successfully') {
                parsedStmt = JSON.parse(res.data[0].result_stmt)
                setPersedStmt(parsedStmt)
            }
        } catch (err) {
            setError("خظایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
        }
    }

    const getUserFunQuizes = async () => {
        try {
            apiCall.current = API.request('/funquiz/get/last/', true, {
                user_funquiz_id: userQuizId
            })
            const res = await apiCall.current.promise
            console.log(res)
            if (res.message == "Fetched successfully") {
                if (parsedStmt != undefined) {
                    console.log(parsedStmt)
                    if (res.data[0].result >= 80) {
                        for (var h = 0; h < parsedStmt.length; h++) {
                            if (parsedStmt[h].level == "عالی بود") {
                                setStmt(parsedStmt[h].level)
                                setQuote(parsedStmt[h].quotes[Math.floor(Math.random() * parsedStmt[h].quotes.length)])
                            }
                        }
                    } else if (res.data[0].result >= 60) {
                        for (var h = 0; h < parsedStmt.length; h++) {
                            if (parsedStmt[h].level == "خوب بود") {
                                setStmt(parsedStmt[h].level)
                                setQuote(parsedStmt[h].quotes[Math.floor(Math.random() * parsedStmt[h].quotes.length)])
                            }
                        }
                    } else if (res.data[0].result >= 40) {
                        for (var h = 0; h < parsedStmt.length; h++) {
                            if (parsedStmt[h].level == "متوسط") {
                                setStmt(parsedStmt[h].level)
                                setQuote(parsedStmt[h].quotes[Math.floor(Math.random() * parsedStmt[h].quotes.length)])
                            }
                        }
                    } else if (res.data[0].result >= 20) {
                        for (var h = 0; h < parsedStmt.length; h++) {
                            if (parsedStmt[h].level == "نیاز به مطالعه بیشتر") {
                                setStmt(parsedStmt[h].level)
                                setQuote(parsedStmt[h].quotes[Math.floor(Math.random() * parsedStmt[h].quotes.length)])
                            }
                        }
                    } else if (res.data[0].result >= 0) {
                        for (var h = 0; h < parsedStmt.length; h++) {
                            if (parsedStmt[h].level == "ضعیف") {
                                setStmt(parsedStmt[h].level)
                                setQuote(parsedStmt[h].quotes[Math.floor(Math.random() * parsedStmt[h].quotes.length)])
                            }
                        }
                    }
                }
                setLastResult(res.data[0].result)
                setScore(res.data[0].result * questioncount / 100)
                if (res.data[0].result > 70) {
                    setWinner(true)
                } else setWinner(false)
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، لطفا مجددا امتحان کنید")
            console.log(err)
            console.log(err.response)
            console.log(err.message)
        }

    }

    useEffect(() => {
        if (lastResult != undefined && score != undefined && winner != undefined)
            setLoading(false)
    }, [lastResult, score, winner, stmt, quote])


    return (
        <>
            <Helmet>
                <title> بیت کوییز</title>
            </Helmet>

            <div style={{ backgroundColor: "#8D6860", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                <div className={classes.quizWrapper}>
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
                        <div className="text-dark">
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
                                            <div className={classes.quizTexts}>{score} از {questioncount}</div>

                                        </div>
                                        <div>

                                            <div className={classes.quizTitles}>درصد جواب های درست:&nbsp;</div>
                                            <div className={classes.quizTexts}>{lastResult}%</div>
                                        </div>
                                        <div>
                                            <div className={classes.quizTitles}>{stmt}</div>
                                            <div className="text-dark">{quote}</div>
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
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default FunQuizResult;