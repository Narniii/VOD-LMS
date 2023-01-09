import React, { useEffect, useRef, useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";
import { Link, useHistory } from "react-router-dom";
import { CircularProgress, Paper } from "@material-ui/core";
import UserDashboard from "../common/UserDashboard";
import { useSelector } from "react-redux";
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
            borderRadius: '20px',
        },
    },
    coursesInProgressWrapper: {
        height: '75vh',
        marginTop: '60px',
        overflow: 'scroll !important',
        width: '100%',
        padding: '10px 20px'
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
        borderRadius: '5px !important'
    },
    whiteBtn: {
        backgroundColor: 'white !important',
        border: '1px solid #64c5ba !important',
        color: '#64c5ba !important',
        padding: '10px 20px !important',
        borderRadius: '5px !important',
        margin: '0px 10px'
    },
}));
export default function Categories(props) {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const history = useHistory();
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [cats, setCats] = useState(undefined)
    useEffect(() => {
        getCats()
    }, [])
    useEffect(() => {
        if (cats != undefined)
            setLoading(false)
    }, [cats])
    const getCats = async () => {
        try {
            const res = await axios.get(`https://api.aqua.ir:8283/cat/all/`,
                {
                    headers: {
                        'Authorization': `Bearer ${globalUser.accessToken}`
                    }
                });
            // console.log(res.data)
            if (res.data != undefined && res.status == 200) {
                setCats(res.data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Helmet>
                <title>تگ ها</title>
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
                                <UserDashboard currentTab={"cats"} firstChildSelected={true} />
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
                                            <div >
                                                <div className="row">
                                                    {cats.map((cat) => {
                                                        return <div className="col-md-4" key={cat.id}>
                                                            <Paper style={{
                                                                display: 'flex',
                                                                justifyContent: "center",
                                                                height: '25vh',
                                                                flexDirection: 'column',
                                                                marginBottom: '10px',
                                                                padding: '10px 20px'
                                                            }}>
                                                                <div style={{ width: '100%', textAlign: 'center', paddingBottom: '30px' }}>
                                                                    <img style={{ width: '40%' }} className={classes.courseThumbnail} src={PUBLIC_URL("images/academy/tags.png")} />
                                                                </div>
                                                                <div className="text-dark">
                                                                    <span style={{ color: '#64c5ba' }}>نام تگ:</span>
                                                                    &nbsp;
                                                                    <span >{cat.cat}</span>
                                                                </div>
                                                            </Paper>
                                                        </div>

                                                    })}
                                                </div>
                                                <div className="text-center">
                                                    <Link style={{ display: 'inline-block', margin: '20px' }} to={{ pathname: `/create-categories` }}>
                                                        <button style={{ width: '100%' }} className={classes.submitButton}>اضافه کردن تگ</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
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