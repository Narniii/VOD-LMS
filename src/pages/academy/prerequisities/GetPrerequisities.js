import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { set } from "lodash";
import Navbar from "../Navbar/Navbar";
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
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    overflow: "scroll !important",
    padding: "50px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "20px",
    },
  },
  videosInProgressWrapper: {
    height: "75vh",
    padding: "70px",
    marginTop: "60px",
    overflow: "scroll !important",
    width: "100%",
  },
  submitButtonWrapper: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#64c5ba !important",
    border: "1px solid #64c5ba !important",
    color: "white !important",
    padding: "10px 20px !important",
    borderRadius: "5px !important",
  },
  whiteBtn: {
    backgroundColor: "white !important",
    border: "1px solid #64c5ba !important",
    color: "#64c5ba !important",
    padding: "10px 20px !important",
    borderRadius: "5px !important",
    margin: "0px 10px",
  },
  prereqBox: {
    padding: '10px 5px',
    margin: '10px 0px',
    overflow: 'hidden',
  },

}));
export default function GetPrerequisities() {
  const { globalUser } = useSelector((state) => state.userReducer);
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [prerequisities, setPrerequisities] = useState(undefined);
  useEffect(() => {
    getTeacherCourses();
    return () => {
      if (apiCall.current !== undefined) apiCall.current.cancel();
    };
  }, []);
  useEffect(() => {
    if (prerequisities !== undefined) {
      setLoading(false);
    }
  }, [prerequisities]);
  useEffect(() => {
    if (teacherCourses !== undefined) {
      teacherPrerequisitiesDetector();
    }
  }, [teacherCourses]);

  const getTeacherCourses = async () => {
    try {
      apiCall.current = API.request(
        "/course/author/",
        true,
        {
          teacher_id: globalUser.user_id,
        },
        globalUser.accessToken
      );
      const response = await apiCall.current.promise;
      if (response.message == "Valid token") {
        setTeacherCourses(response.data);
      }
    } catch (err) {
      setError("خطایی رخ داده است. لطفا مجددا امتحان کنید");
    }
  };
  const teacherPrerequisitiesDetector = () => {
    if (teacherCourses.length != 0) {
      let i = 0;
      const teacherCourseslen = teacherCourses.length;
      let temp = [];
      for (i; i < teacherCourseslen; i++) {
        if (teacherCourses[i].prerequisite.length != 0)
          temp.push(teacherCourses[i]);
      }
      setPrerequisities(temp);
    } else return;
  };
  return (
    <>
      <Navbar children={<UserDashboard firstChildSelected={true} />} />
      <Helmet>
        <title>پیش نیاز ها</title>
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
                <UserDashboard
                  currentTab={"prerequisities"}
                  secondChildSelected={true}
                />
              </div>

              <div className="col-sm-9 overFlowHandler">
                <div className={classes.khakibox}>
                  <div className={classes.coursesInProgressWrapper}>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "85vh",
                        }}
                      >
                        <CircularProgress style={{ color: "green" }} />
                      </div>
                    ) : (
                      <>
                        <div
                          className="text-dark text-center"
                          style={{ marginTop: "10vh", marginBottom: "10px" }}
                        >
                          پیش نیاز ها
                        </div>
                        <div className="row">
                          {prerequisities.map((prereq) => {
                            return (
                              <div className="col-md-4" key={prereq.id}>
                                <Paper className={classes.prereqBox}>
                                  <div style={{ marginTop: '20px' }} className="text-center text-dark">نام دوره : {prereq.title}</div>
                                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                                    <Link
                                      style={{
                                        display: "inline-block",
                                        margin: "20px",
                                      }}
                                      to={{
                                        pathname: `/prerequisities/${prereq.slug}`,
                                      }}
                                    >
                                      <button
                                        style={{ width: "100%" }}
                                        className="btn btn-md btn-outline-success"
                                      >
                                        نمایش پیشنیاز
                                      </button>
                                    </Link>

                                  </div>

                                </Paper>
                              </div>
                            );
                          })}
                        </div>
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
