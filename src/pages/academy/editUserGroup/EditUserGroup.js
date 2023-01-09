import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Hidden } from "@material-ui/core";
import API from "../../../utils/api";
import UserDashboard from "../common/UserDashboard";
import Navbar from '../Navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from "react-bootstrap";
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
    justifyContent: "center",
    display: "flex",
    [theme.breakpoints.down('xs')]: {
      borderRadius: '20px',
    },
  },
  coursesInProgressWrapper: {
    height: '75vh',
    paddingTop: '20vh',
    overflow: 'scroll',
    width: '100%',
    padding: '0 10%'
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
export default function AvailableQuizes() {
  const [error, setError] = useState(undefined)
  const history = useHistory();
  const apiCall = useRef(undefined);
  const classes = useStyles();
  const { globalUser } = useSelector((state) => state.userReducer)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState(undefined)
  const [selectedUser, setSelectedUser] = useState(undefined)
  const [selectedUserGroup, setSelectedUserGroup] = useState(undefined)
  const [modal, setModal] = useState(false)
  useEffect(() => {
    getUsers()
    return () => {
      if (apiCall.current !== undefined)
        apiCall.current.cancel();
    }
  }, [])
  useEffect(() => {
    if (users != undefined) {
      setLoading(false)
    }
  }, [users])
  const getUsers = async () => {
    try {
      apiCall.current = API.request('/user/get/all/', false, {}, globalUser.accessToken);
      const response = await apiCall.current.promise
      console.log(response)
      if (response.message == "Valid token") {
        setUsers(response.data)
      }
    }
    catch (err) {
      setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
    }
  }
  const userChange = async (e) => {
    console.log(e.target.value)
    for (var i = 0; i < users.length; i++)
      if (e.target.value == users[i].id) {
        setSelectedUser(users[i])
      }
  }
  const groupChange = async (e) => {
    setSelectedUserGroup(e.target.value)
  }
  const submit = async () => {
    try {
      apiCall.current = API.request('/user/profile/edit/group/', true, {
        user_id: selectedUser.id,
        user_group: selectedUserGroup
      }, globalUser.accessToken);
      const response = await apiCall.current.promise
      console.log(response)
      if (response.message == "Updated successfully") {
        setError(undefined)
        setModal(true)
        setTimeout(() => {
          setModal(false)
        }, 1000);
      }
    }
    catch (err) {
      setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
    }
  }
  return (
    <>
      <Helmet>
        <title>تغییر سطح دسترسی</title>
      </Helmet>
      <Navbar children={<UserDashboard currentTab={"edituser"} firstChildSelected={true} />} />

      <section
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
                <UserDashboard currentTab={"edituser"} firstChildSelected={true} />
              </div>

              <div className="col-sm-9 overFlowHandler">
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
                      <h4 className="text-center" style={{ margin: '20px 0px', color: '#64c5ba', fontWeight: 'bold !important' }}>تغییر سطح دسترسی</h4>
                      <div className="text-dark" style={{ padding: '10px 20px' }}>
                        <div className="text-dark">
                          <Form.Select
                            onChange={userChange}
                          >
                            <option value={-1}>select user</option>
                            {users.map((user) => {
                              return <option value={user.id}>{user.username}</option>
                            })}
                          </Form.Select>
                          <div style={{ marginTop: '20px' }}></div>
                          <Form.Select
                            onChange={groupChange}
                          >
                            <option value={-1}>select user group</option>
                            <option value="student">student</option>
                            <option value="teacher">teacher</option>
                            <option value="admin">admin</option>
                            <option value="superuser">superuser</option>
                          </Form.Select>
                          <div className="text-center" style={{ marginTop: '20px' }}>
                            <button className="btn btn-md btn-success" onClick={submit}>ثبت</button>

                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                      </div>
                    </div>
                  }
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
            <span className="text-dark" style={{ marginRight: '10px' }}>ویرایش کاربر موفقیت آمیز بود</span>
          </div>
        </div>
      </Modal>
    </>
  );
}