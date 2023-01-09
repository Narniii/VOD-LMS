/*
    we'll get the quiz score of the user from the previous time he/she had done the test
    if the user has already passed this test with good results we won't render the questions for him
    else if it's his first time quizing or has failed before ,
    we'll get the quiz , the course and their infos
    we'll shuffle the quiz questions for each user separately so every time every user comes to quiz , 
    the questions are sorted randomly
    we'll call the update quiz api on every answer option click 
    because we want to set the score , remaning tim , shuffled content and.... 
    in database in case of refreshing , reloading , coming again and .....
    and on every page loading we'll have the last content that we updated
*/


import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden, Paper } from "@material-ui/core";
import API from "../../../../utils/api";
import UserDashboard from "../../common/UserDashboard";
import '../Quizes.css'
import CelebrationIcon from '@mui/icons-material/Celebration';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Navbar from '../../Navbar/Navbar'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux'
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
        justifyContent: "center",
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        marginTop: '60px',
        overflow: 'scroll',
        width: '100%'
    },
    singleBox: {
        border: '2px solid green',
        borderRadius: '20px',
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
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Spartan !important',
        fontSize: '12px',
        color: '#1d5643',
        fontWeight: 400
    },
    questionsInputWrapper: {
        background: 'lightgrey',
        width: '80%',
        margin: '30px auto',
        padding: '40px',
        borderRadius: '5px',
        marginTop:"200px"
    },
    quizCountTitle: {
        color: 'black'
    },
    quizButtons: {
        display: 'block',
        border: 'none',
        margin: '10px 0px',
        width: '100%',
        textAlign: 'right',
        borderRadius: '5px',
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: '#75a375'
        }
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
        width: '50%',
        margin: '10vh auto',
    },
    scorePaper: {
        height: '400px',
        padding: '15% 40px',
        borderRadius: '10px',
    },
    container: {
        width: '80%',
        margin: '0 auto'
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
}));
export default function Test(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState(undefined)
    const [accuracy, setAccuracy] = useState(undefined)
    const [quizDone, setQuizDone] = useState(false)
    const [winner, setWinner] = useState(undefined)
    const [timer, setTimer] = useState(0)
    let id = props.match.params.id
    const [question, setQuestion] = useState(undefined)
    const countDown = useRef()
    const [allUserCourses, setAllUserCourses] = useState(undefined)
    const [quiz, setQuiz] = useState(undefined)
    const [userCourseId, setUserCourseId] = useState(undefined)
    const [courses, setCourses] = useState(undefined)
    const [certType, setCertType] = useState(undefined)
    const [quizes, setQuizes] = useState(undefined)
    const [userQuizId, setUserQuizId] = useState(undefined)
    const [empty, setEmpty] = useState(undefined)
    const [finishedTime, setFinishedTime] = useState(undefined)
    const [startedTime, setStartedTime] = useState(undefined)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(undefined)
    const [updatedContent, setUpdatedContent] = useState(undefined)
    const [quizScoire, setQuizScoire] = useState(undefined)
    const [remainingTime, setRemainingTime] = useState(0)


    useEffect(() => {
        // if (quizScoire != undefined && quizScoire < 80)
        getUserQuiz()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])

    useEffect(() => {
        if (question != undefined) {
            countDown.current = setInterval(() => {
                setTimer((prevProgress) => (prevProgress == 0 ? 0 : prevProgress - 1));
            }, 1000);
            return () => {
                if (countDown.current)
                    clearInterval(countDown.current);
            };
        }
    }, [question]);

    useEffect(() => {
        if (quizScoire != undefined)
            setLoading(false)
    }, [quizScoire])


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


    useEffect(() => {
        if (quiz != undefined) getAllUserCourses()
    }, [quiz])


    useEffect(() => {
        if (courses != undefined && quizes != undefined)
            quizDetector()
    }, [courses, quizes])


    //------------------------------------------

    //shuffling the given questions and making random sort of questions and their answer options
    const handleShuffling = (que) => {
        if (que != undefined) {
            let questions = que
            let shuffledArray = questions.sort((a, b) => 0.5 - Math.random());
            for (let i = 0; i < shuffledArray.length; i++) {
                shuffledArray[i].answerOptions = shuffledArray[i].answerOptions.sort((a, b) => 0.5 - Math.random())
            }
            questions = shuffledArray
            setShuffledQuestions(questions)
            return questions;
        }
    }

    //------------------------------------------

    /*
        giving the quiz id from url props , we'll call the api for getting user quiz,
        then we get this quz , all published courses , and all quizez by calling the functions below,
        we'll set the questions of this quiz from getquiz api call,
        if ress.data.data.length == 0 iit means that this user has never done this quiz before , 
        so we make new shuffled questions for him/her and create a first record in database
        and show the user his/her specific shuffled questions for this test
        else if the user has already did the test before and failed , we'll check if the one day limit 
        is passed which means that the user is not allowed to quiz again unless it's one day 
        or mmore passed from the last time that he did the test.
    
    
        after getting the user quiz and knowing that we have done the quiz before from the results we'll check the 
    
    
        1)shuffled questions length :
            because we have to create a new shuffled content form the questions every time the user wants to quiz again , 
            so we post an empty array on every time we finish the test so we get an empty array every time 
            we come to quiz againg.
        2)start time and finish time :
            each time a user finishes a quiz we send a finished time to backend so every 
            time we coe to quiz againg we'll get the last fnished time that we sent
            then we'll send an empty finish time and a new start time on quiz begin
            so if we load the page we'll either have last finished time and no 
            start time(which means i just came to tha page to quiz again and update my quiz records)
            or last started time and no finished time(which means that the new quiz is already started 
            and we're in the middle of it (in case of closing the tab or refreshing the page 
            unexpectedly in the middle of the quiz)).
        
    */
    const getUserQuiz = async () => {
        var uQiT;
        var que;
        var expiration_time_date;
        var shuffled;
        var soalHa;
        const one_day_in_seconds = 86400
        var remaining_time;
        try {
            const ress = await axios.post(`https://api.aqua.ir:8283/quiz/user/get/`, { quiz_id: id }, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
            if (ress.data.message == 'Valid token') {
                if (ress.data.data) {
                    //set quiz and questions
                    const quizz = await getQuiz()
                    let content = JSON.parse(quizz.content)
                    setQuiz(quizz)
                    // setTimer(quizz.expiration_time * 60) 
                    que = content
                    setQuestion(que)
                    //set published courses
                    getAllPublishedCourses()
                    ////------------------------------
                    //set quizez
                    getQuizes()
                    //---------------------------------

                    if (ress.data.data.length == 0) {
                        soalHa = handleShuffling(que)
                        let this_time = new Date()
                        let this_time_in_seconds = this_time.getTime() / 1000
                        expiration_time_date = new Date(this_time.getTime() + quizz.expiration_time * 60000)
                        let expiration_time_in_seconds = expiration_time_date.getTime() / 1000
                        remaining_time = Math.ceil(expiration_time_in_seconds - this_time_in_seconds)
                        setTimer(remaining_time)
                        try {
                            var user_quiz_info = {
                                quiz_id: id, id: 0, current_index_question: 0, shuffled_content: soalHa,
                                start_time: this_time, remaining_time: remaining_time, finish_time: ""
                            }
                            const resp = await axios.post(`https://api.aqua.ir:8283/quiz/user/update/`, user_quiz_info, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
                            setUpdatedContent(resp.data.data)
                            setShuffledQuestions(resp.data.data.shuffled_content)
                            setCurrentQuestion(resp.data.data.current_index_question)
                            // uQiT = resp.data.data[0].id
                        } catch (err) {
                            setError(err)
                        }
                    } else {
                        if (quizScoire != undefined) {
                            if (quizScoire < 80) {
                                uQiT = ress.data.data[0].id
                                setTimer(ress.data.data[0].remaining_time)

                                if (ress.data.data[0].start_time.length == 0 && ress.data.data[0].finish_time.length != 0) {
                                    if (ress.data.data[0].shuffled_content.length == 0) {
                                        let this_time = new Date()
                                        let this_time_in_seconds = Math.ceil(this_time.getTime() / 1000)
                                        let last_finished_time_in_seconds = Math.ceil(new Date(ress.data.data[0].finish_time).getTime() / 1000)
                                        if (this_time_in_seconds - last_finished_time_in_seconds > 60) {
                                            // console.log("oomadam dobare quiz bedam")
                                            soalHa = handleShuffling(que)
                                            shuffled = soalHa
                                            setShuffledQuestions(shuffled)
                                            expiration_time_date = new Date(this_time.getTime() + quizz.expiration_time * 60000)
                                            let expiration_time_in_seconds = expiration_time_date.getTime() / 1000
                                            remaining_time = Math.ceil(expiration_time_in_seconds - this_time_in_seconds)
                                            setTimer(remaining_time)
                                            try {
                                                var user_quiz_info = {
                                                    quiz_id: id, id: ress.data.data[0].id, current_index_question: 0, shuffled_content: shuffled,
                                                    start_time: this_time, remaining_time: remaining_time, finish_time: ''
                                                }
                                                const resp = await axios.post(`https://api.aqua.ir:8283/quiz/user/update/`, user_quiz_info, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
                                            } catch (err) {
                                                setError(err)
                                            }
                                        } else {
                                            alert("کاربر گرامی ، برای انجام دوباره ی کوییز باید حداقل 1 روز از آخرین باری که کوییز را داده اید گذشته باشد !")
                                            setShuffledQuestions(ress.data.data[0].shuffled_content)
                                            setTimeout(() => {
                                                history.push("/")
                                            }, 500);
                                        }
                                    } else {
                                        console.log("error!")
                                    }
                                } else if (ress.data.data[0].start_time.length != 0 && ress.data.data[0].finish_time.length == 0) {
                                    if (ress.data.data[0].shuffled_content.length != 0) {
                                        const folan = localStorage.getItem(`quiz${id}`)
                                        if (folan != null) {
                                            setScore(parseInt(folan))
                                        } else {
                                            setScore(0)
                                        }
                                        let this_time = new Date()
                                        let this_time_in_seconds = this_time.getTime() / 1000
                                        expiration_time_date = new Date(this_time.getTime() + quizz.expiration_time * 60000)
                                        let started_time_in_seconds = new Date(ress.data.data[0].start_time).getTime() / 1000
                                        let expiration_time_in_seconds = expiration_time_date.getTime() / 1000
                                        let passed_time = this_time_in_seconds - started_time_in_seconds
                                        remaining_time = Math.ceil(ress.data.data[0].remaining_time - passed_time)
                                        setRemainingTime(remaining_time)
                                        setTimer(remaining_time)
                                        setUpdatedContent(ress.data.data[0])
                                        setCurrentQuestion(ress.data.data[0].current_index_question)
                                        setShuffledQuestions(ress.data.data[0].shuffled_content)
                                    }
                                    else {
                                        console.log("error!")
                                    }
                                }
                            }else{
                                setShuffledQuestions([])
                            }
                        }
                    }
                }
            }
        } catch (err) {
            setError("خطایی رخ داد . مجددا امتحان کنید")
        }
    }

    //---------------------------------------

    // we call this func on every answer click
    /*
        on every answer click it is checked if the quiz is done or not yet by 
        counting on which question index from the questions length are we on ,
        now on every answer click we check if the quiz_done is false which means we're in the middle of quizing(1)
        or if the quiz_done is true which means we're done quizing(2)
        in the (1) condition we'll still update the score , remaining time , and question index 
        [shuffled content should be the same as when we started the quiz]
        in the (2) condition we'll send every data to backend to empty every record 
        and we'll send a ("this time" as "finished time") 
        so if the user came to quiz again later , we have nothing but the last finished time we gave
        and also we check if this quiz lasted more than the expiration time of it , 
        we'll alert the user and update a 0 score for him/her
    */
    const updateUserQuiz = async (quiz_done) => {
        var uQiT;
        if (updatedContent != undefined) {
            if (updatedContent.user_id == globalUser.user_id && updatedContent.quiz_id == id && updatedContent.shuffled_content.length != 0) {
                setShuffledQuestions(updatedContent.shuffled_content)
                uQiT = updatedContent.id
                if (updatedContent.start_time.length != 0 && updatedContent.finish_time.length == 0) {
                    if (quiz_done == false) {
                        // if (isCorrect) {
                        //     localStorage.setItem(`quiz${id}`, parseFloat(score) + 1)
                        //     setScore(score + 1);
                        // }
                        try {
                            let user_quiz_info = {
                                quiz_id: id, id: uQiT, shuffled_content: updatedContent.shuffled_content,
                                current_index_question: currentQuestion + 1,
                                finish_time: updatedContent.finish_time, start_time: updatedContent.start_time,
                                remaining_time: remainingTime
                            }
                            const resp = await axios.post(`https://api.aqua.ir:8283/quiz/user/update/`, user_quiz_info, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
                        } catch (err) {
                            setError("خطایی رخ داد . مجددا امتحان کنید")
                        }
                    } if (quiz_done == true) {
                        let this_time = new Date()
                        var Difference_In_Time = this_time.getTime() - new Date(updatedContent.start_time).getTime();
                        var expiration_time_ = new Date(quiz.expiration_time).getTime()
                        var expiration_time_in_seconds = expiration_time_ / 1000
                        // console.log('expiration_time_in_seconds', expiration_time_in_seconds)
                        var Difference_In_Time_inSeconds = Difference_In_Time / 1000
                        // console.log('Difference_In_Time_inSeconds', Difference_In_Time_inSeconds)
                        try {
                            let user_quiz_info = {
                                quiz_id: id, id: uQiT, shuffled_content: [],
                                current_index_question: 0,
                                finish_time: this_time, start_time: '',
                                remaining_time: ''
                            }
                            const resp = await axios.post(`https://api.aqua.ir:8283/quiz/user/update/`, user_quiz_info, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
                        } catch (err) {
                            setError("خطایی رخ داد . مجددا امتحان کنید")
                        }

                        if (Difference_In_Time_inSeconds <= expiration_time_in_seconds) {
                            // const folan = localStorage.getItem('quiz13')
                            // console.log(folan, parseFloat(folan))
                            // if (folan != null) {
                            //     setScore(parseFloat(folan))
                            // } else {
                            //     console.log("man injaaaam")
                            //     setScore(0)
                            // }
                            // scoreCalculator()
                        }
                        else {
                            alert("کاربر گرامی ، زمان کوییز شما بیشتر از زمان مشخص شده برای این کوییز شد ! لطفا پس از یک روز دوباره امتحان کنید")
                            setScore(0)
                            // setAccuracy(0)
                            setTimeout(() => {
                                history.push('/')
                            }, 500);
                        }
                    }
                }
            }
        }

    }

    //------------------------------------------

    //we update the user quiz info on every answer click
    const handleAnswerOptionClick = (isCorrect) => {
        var quiz_done;
        if (isCorrect) {
            // let quizObject = {quiz_id : id , score : score + 1}
            localStorage.setItem(`quiz${id}`, parseInt(score) + 1)
            setScore(score + 1);
        }
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < question.length) {
            setCurrentQuestion(nextQuestion);
            quiz_done = false

        } else {
            setQuizDone(true)
            quiz_done = true
            setLoading(true)
        }
        updateUserQuiz(quiz_done)
    };
    //------------------------------------------

    const scoreCalculator = () => {
        // if (quizDone != false) {
        clearInterval(countDown.current);
        let questionsCount = question.length
        let sccore = localStorage.getItem(`quiz${id}`)
        const accuracy = parseInt(sccore) / questionsCount * 100
        if (accuracy > 80) {
            setWinner(true)
        }
        localStorage.removeItem(`quiz${id}`)

        setAccuracy(accuracy)
        setShowScore(true);
        setLoading(false)
        // }
    }
    //------------------------------------------

    const getAllPublishedCourses = async () => {
        try {
            apiCall.current = API.request('/course/published/', false, {});
            const response = await apiCall.current.promise
            if (response.message == 'Fetched successfully') {
                setCourses(response.data)

            }
        }
        catch (err) {
            setError("خطایی رخ داد ، مجددا امتحان کنید")
        }
    }
    //------------------------------------------

    const quizDetector = () => {
        for (var i = 0; i < quizes.length; i++)
            for (var j = 0; j < courses.length; j++)
                if (quizes[i].course_info.slug == courses[j].slug && courses[j].video_count == 0) {
                    setCertType("Exam")
                    break
                }
                else setCertType("Course")
    }
    //------------------------------------------

    const getQuizes = async () => {
        try {
            apiCall.current = API.request('/quiz/all/', false, {}, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Fetched successfully") {
                // console.log(response)
                setQuizes(response.data)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    //------------------------------------------

    const getQuiz = async () => {
        try {
            const res = await axios.post(`https://api.aqua.ir:8283/quiz/`, { quiz_id: id }, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
            if (res.data.message == 'Valid token') {
                return res.data.data[0]
            }
        } catch (err) {
            setError(err)
        }
    };
    //------------------------------------------

    //getting the user course , we check that if this user has this quiz , then set the user course id
    const getAllUserCourses = async () => {
        try {
            apiCall.current = API.request('/course/user/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == 'Valid token') {
                for (var zz = 0; zz < response.data.length; zz++) {
                    if (response.data[zz].course_info.slug == quiz.course_slug && response.data[zz].user_id == globalUser.user_id && response.data[zz].course_id == quiz.course_id && response.data[zz].course_id != 0)
                        setUserCourseId(response.data[zz].id)
                }
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، مجددا امتحان کنید")
        }
    }

    //------------------------------------------

    //quizScoire is the state for the last score we have from the last time that we did this quiz , we need it because if last quiz score is more than 80 , it means that user has already passed this test with good results and doesn't need to quiz again and we'll need the user course id to call the api and get the last score , that we have user course id from the last api call 
    useEffect(async () => {
        if (userCourseId != undefined)
            try {
                apiCall.current = API.request(`/course/user/${userCourseId}`, false, {}, globalUser.accessToken);
                const rest = await apiCall.current.promise
                for (var g = 0; g < rest.data.length; g++) {
                    if (globalUser.user_id == rest.data[g].user_id) {
                        setQuizScoire(rest.data[g].quiz_score)
                    }
                }
            } catch (err) {
                setError(err)
            }

    }, [userCourseId])

    //------------------------------------------

    //creating certificate for this course if we pass the test
    const handleSuccessQuiz = async () => {
        try {
            const res = await axios.patch(`https://api.aqua.ir:8283/course/user/${userCourseId}`, { quiz_score: accuracy }, { headers: { 'Authorization': `Bearer ${globalUser.accessToken}` } });
            if (res.data.message == "Valid token") {
                apiCall.current = API.request('/certificate/create/', true, {
                    user_course_id: userCourseId,
                    description: `certificate for ${quiz.course_slug} for ${globalUser.first_name} ${globalUser.last_name}`,
                    cert_type: certType
                }, globalUser.accessToken);
                const response = await apiCall.current.promise
                console.log(response)
                if (response.message == "Valid token") {
                    history.push('/my-certificates')
                }
            }
        }
        catch (err) {
            setError("خطایی رخ داد ، مجددا امتحان کنید")
            console.log(err)
        }
    }
    //------------------------------------------

    function LinearProgressWithLabel({ value }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }} style={{ direction: 'ltr' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" value={value * 100 / quiz.expiration_time / 60} />
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


    //------------------------------------------------------------------------------------------------------------

    return (
        <>
            <Helmet>
                <title>کوییز</title>
            </Helmet>
            <Navbar
                children={
                    <UserDashboard currentTab={"courses"} firstChildSelected={true} />
                }
            />

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
                                <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler">
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>

                                        <>
                                            {!loading ?
                                                <div className='text-dark'>
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
                                                                    <div className={classes.quizTitles}>تعداد جواب های درست:&nbsp;</div>
                                                                    <div className={classes.quizTexts}>{score} از {shuffledQuestions.length}</div>
                                                                    <div className={classes.quizTitles}>درصد جواب های درست:&nbsp;</div>
                                                                    <div className={classes.quizTexts}>{accuracy}%</div>
                                                                    {winner ? <div className={classes.successTxt}>شما با موفقیت تست را گذراندید</div> : <div className={classes.failTxt}>شما در این تست  مردود شدید</div>}
                                                                    {winner ?
                                                                        <button className={classes.winnerBtn} onClick={handleSuccessQuiz}>گواهی دوره</button>
                                                                        :
                                                                        <button className={classes.failBtn} onClick={() => history.goBack()}>بازگشت</button>
                                                                    }
                                                                </div>
                                                            </Paper>
                                                        </div>
                                                        :

                                                        <div className={classes.questionsInputWrapper}>
                                                            {quizScoire > 80 ? <>

                                                                <div className="text-center text-dark">شما قبلا این تست را با موفقیت گذرانده اید</div>

                                                            </>

                                                                :


                                                                <>
                                                                    {shuffledQuestions.length != 0 && shuffledQuestions != undefined ? <>                                                            <Box sx={{ width: '100%' }}>
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

                                                                </>}


                                                        </div>
                                                    }
                                                </div> : <div style={{
                                                    display: 'flex',
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    height: '100%'
                                                }}>
                                                    <CircularProgress style={{ color: "green" }} />
                                                </div>
                                            }
                                        </>


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
