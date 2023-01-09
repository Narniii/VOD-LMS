import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import API from "../../utils/api";
import '../style/NewQuiz.css';
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import NewQuizCards from "../comps/QuizCards/NewQuizCards";
import NewUserDashboard from "../dashboard/NewDashboard";

const useStyles = makeStyles((theme) => ({
    loadingSingleBox: {
        width: '100%',
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: '10px'
        },
    },
    header: {
        color: '#64c5ba',
        marginTop: '30px',
        margin: '0px 20px',
        fontWeight: 'bold',
        "@media (max-width: 576px)": {
            textAlign: 'center'
        }
    },
}));
export default function NewDoneQuizes() {
    const { globalUser } = useSelector(state => state.userReducer)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [certificates, setCertificates] = useState(undefined)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        let certifs = []
        try {
            apiCall.current = API.request('/course/user/', true, {
                user_id: globalUser.user_id
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == "Valid token")
                if (response.data.length == 0) {
                    setCertificates([]);
                    return;
                }
                else {
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].quiz_score >= 80) {
                            certifs.push(response.data[i])
                        }
                    }
                    setCertificates(certifs)
                }
            else setCertificates([])
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (certificates != undefined) {
            setLoading(false)
        }
    }, [certificates])
    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 9; i++) {
                views.push(
                    <div className="col-md-4">
                        <div className={classes.loadingSingleBox} >
                            <Skeleton variant="rectangular" width={'90%'} height={300} style={{ margin: '20px auto', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }} />
                        </div>
                    </div>
                )
            }

        else for (var i = 0; i < 3; i++) {
            views.push(
                <div className="col-md-4">
                    <div className={classes.loadingSingleBox} >
                        <Skeleton variant="rectangular" width={'90%'} height={300} style={{ margin: '20px auto', clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)', background: '#2f3835', overflow: 'hidden' }} />
                    </div>
                </div>
            )
        }
        return <div className="row" style={{ width: '80%', margin: '0 auto' }}>
            {views}
        </div>
    }
    return (
        <>
            <Helmet>
                <title>کوییز های گذرانده شده</title>
            </Helmet>
            <NewUserDashboard currentTab={"quiz"} thirdChildSelected={true}>
                {loading ? <LoadingRow />
                    :
                    certificates.length == 0 ?
                        <div style={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            height: '65vh'
                        }}>
                            <h3 style={{ color: '#64c5ba' }}>کوییزی وجود ندارد</h3>
                        </div>
                        :
                        <div style={{ width: '80%', margin: '0 auto' }}>
                            <h4 className={classes.header}>کوییز های گذرانده شده</h4>
                            <div className="row">
                                {certificates.map((certif) => {
                                    return <div className="col-md-4" key={certif.id}>
                                        <NewQuizCards
                                            link={`/my-certificates`}
                                            title={certif.course_info.title}
                                            bgImage={`https://api.aqua.ir:8283${certif.course_info.image}`}
                                            description={certif.course_info.short_description}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                }
            </NewUserDashboard >
        </>
    );
}