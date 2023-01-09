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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios'
import './Tags.css'
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
    },
    coursesInProgressWrapper: {
        overflow: 'scroll !important',
        width: '100%',
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
        borderRadius: '5px !important',
        margin: '20px 0px'
    },
    whiteBtn: {
        backgroundColor: 'white !important',
        border: '1px solid #64c5ba !important',
        color: '#64c5ba !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '0px 10px'
    },
    inputsHeader: {
        color: '#64c5ba',
        fontSize: '20px',
        margin: '10px 0px'
    },
    modal: {
        position: 'absolute',
        width: '300px',
        height: '150px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: 'none',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '20px',
        [theme.breakpoints.down('xs')]: {
            padding: '30px',
            width: '300px',
        },
        [theme.breakpoints.between("sm", "md")]: {
            padding: '0px 40px',
            margin: '10px',
            width: '400px',
            height: '400px',
        },
        "@media (min-width: 1200px)": {
            // paddingTop: '10px',
        },
    },
}));
export default function CreateCategories(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(false)
    const [cat, setCat] = useState(undefined)
    const [doneModal, setDoneModal] = useState(false)
    const onChange = (e) => {
        setCat(e.target.value)
    }
    const submitTag = async (e) => {
        e.preventDefault()
        if (cat == undefined || cat == '') {
            setError('لطفا نام دسته بندی را وارد کنید')
            return
        }
        else {
            setLoading(true)
            setError(undefined)
            try {
                const res = await axios.post(`https://api.aqua.ir:8283/cat/create/`,
                    { cat: cat },
                    {
                        headers: {
                            'Authorization': `Bearer ${globalUser.accessToken}`
                        }
                    });
                if (res.data.message == "Valid token") {
                    setDoneModal(true)
                    setTimeout(() => {
                        history.push('/categories')
                    }, 2000);
                }

                setLoading(false)
            } catch (err) {
                if (err.message == 'Request failed with status code 302') {
                    setError('دسته بندی با این نام وجود دارد')
                }
                setLoading(false)
            }
        }
    }
    return (
        <>
            <Helmet>
                <title>ساخت دسته بندی</title>
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
                                <UserDashboard currentTab={"cats"} secondChildSelected={true} />
                            </div>

                            <div className="col-sm-9 overFlowHandler" >
                                <div className={classes.khakibox}>
                                    <div className={classes.coursesInProgressWrapper}>
                                        {loading ? <div style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: '85vh',
                                        }}>
                                            <CircularProgress style={{ color: "green" }} />
                                        </div> :
                                            <div>
                                                <div className="text-center">
                                                    <form>
                                                        <div className="new-tag">
                                                            <div className={classes.inputsHeader}>نام دسته بندی</div>
                                                            <input className="form-control" value={cat} name="cat" onChange={onChange} type="text" style={{ backgroundColor: '#f2f2f2' }} />
                                                            <button type="submit" className={classes.submitButton} onClick={submitTag}>ثبت دسته بندی</button>
                                                            {error ? <div style={{ color: 'red', margin: '10px 0px' }}>{error}</div> : undefined}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <Modal
                    open={doneModal}
                    onClose={() => setDoneModal(false)}
                    disableBackdropClick
                >
                    <div className={classes.modal}>
                        <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%' }}>
                            <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "40px" }} />
                            <span className="text-dark" style={{ marginRight: '10px' }}>ثبت دسته بندی موفقیت آمیز بود</span>
                        </div>
                    </div>
                </Modal>
            </section >
        </>

    );
}