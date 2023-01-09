import React, { useEffect, useRef, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Divider } from "@material-ui/core";
import UserDashboard from "../../common/UserDashboard";
import "../Quizes.css";
import API from "../../../../utils/api";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { Helmet } from "react-helmet";
const useStyles = makeStyles((theme) => ({
  whiteBox: {
    backgroundColor: "white",
    borderRadius: "20px",
    height: "85vh",
  },
  khakibox: {
    backgroundColor: "#f2f2f2",
    height: "85vh",
    borderTopLeftRadius: "20px",
    borderBottomLeftRadius: "20px",
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  coursesInProgressWrapper: {
    height: "75vh",
    marginTop: "10vh",
    overflow: "scroll",
    width: "100%",
  },
  previewButtons: {
    border: "none",
    padding: "10px 20px",
    backgroundColor: "#64c5ba",
    borderRadius: "5px",
    width: "100%",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    margin: "20px 5px !important",
    [theme.breakpoints.down("xs")]: {
      width: "45%",
      margin: "0px 5px !important",
      fontSize: "14px",
    },
  },
}));
export default function QuizPreview(props) {
  const id = props.match.params.id;
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [err, setErr] = useState(false);
  const { globalUser } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [allQuizez, setAllQuizez] = useState(undefined);
  const [quiz, setQuiz] = useState({
    course_id: undefined,
    course_slug: undefined,
    user_id: globalUser.user_id,
    title: "",
    questions: [],
  });
  useEffect(() => {
    getQuiz();
    GetAllQuizez();
  }, []);
  useEffect(() => {
    if (quiz.questions.length != 0) setLoading(false);
  }, [quiz]);

  const GetAllQuizez = async () => {
    try {
      apiCall.current = API.request(
        "/quiz/all/",
        false,
        {},
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      console.log(response);
      if (response.message == "Fetched successfully") {
        setAllQuizez(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getQuiz = async () => {
    try {
      const res = await axios.post(
        `https://api.aqua.ir:8283/quiz/`,
        { quiz_id: id },
        {
          headers: {
            Authorization: `Bearer ${globalUser.accessToken}`,
          },
        }
      );
      if (res.data.message == "Valid token") {
        let tmpq = res.data.data[0];
        let tempQuiz = {
          course_id: tmpq.course_id,
          course_slug: tmpq.course_slug,
          user_id: globalUser.user_id,
          title: tmpq.title,
          questions: [],
        };
        let content = JSON.parse(tmpq.content);
        for (var z = 0; z < content.length; z++)
          tempQuiz.questions.push(content[z]);
        setQuiz(tempQuiz);
      }
      if (res.data.detail == "Not found.") {
        history.push("/404");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Helmet>
        <title>پیش نمایش کوییز</title>
      </Helmet>
      <Navbar
        children={
          <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
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
              <div className="col-md-3 no-mobile">
                <UserDashboard currentTab={"quiz"} firstChildSelected={true} />
              </div>

              <div className="col-md-9 text-dark text-center overFlowHandler new-quiz-inputs">
                <div className={classes.khakibox}>
                  <div className={classes.coursesInProgressWrapper}>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                        }}
                      >
                        <CircularProgress style={{ color: "green" }} />
                      </div>
                    ) : (
                      <>
                        {globalUser.user_group == "teacher" || globalUser.user_group == "superuser" ? (
                          <>
                            <div className="text-center"></div>
                            <div style={{ width: "100%" }}>کوییز ساخته شده</div>
                            <div
                              className="text-center"
                              onClick={() => history.push(`/edit-quiz/${id}`)}
                            >
                              <button className="btn btm-md btn-success">
                                ویرایش کوییز
                              </button>
                            </div>
                            <table
                              style={{ width: "90%", margin: "10px 20px" }}
                            >
                              {quiz.questions.map((question, index) => {
                                return (
                                  <tr>
                                    <td>
                                      متن سوال{index + 1}:
                                      {question.questionText}
                                    </td>
                                    <td>
                                      {question.answerOptions.map(
                                        (answer, index) => {
                                          return (
                                            <div
                                              style={{
                                                border: "1px solid black",
                                              }}
                                            >
                                              <div>
                                                <span>
                                                  متن گزینه{index + 1}:
                                                </span>
                                                <span>{answer.answerText}</span>
                                              </div>
                                              <div>
                                                آیا این گزینه جواب صحیح است:
                                                {answer.isCorrect ? (
                                                  <div>بله</div>
                                                ) : (
                                                  <div>خیر</div>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </td>
                                  </tr>
                                );
                              })}
                            </table>
                          </>
                        ) : undefined}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
