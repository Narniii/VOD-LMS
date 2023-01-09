import React, { useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react'
import API from '../utils/Api'
import { makeStyles } from '@material-ui/core/styles';
import LoadingScreen from '../common/LoadingScreen';
import { CONFIG } from '../utils/Config';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import moment from 'jalali-moment'
import './PostSingle.css'
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BG_URL, PUBLIC_URL } from '../utils/utils';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Divider, Modal, Paper } from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import { Helmet } from "react-helmet";
import { Box, Skeleton } from '@mui/material';
import PostCard from '../common/PostCard';
import Navbar from '../../new-lms/navbar/Navbar';
import Footer from '../../new-lms/comps/Footer';

const useStyles = makeStyles((theme) => ({
    section: {
        marginBottom: '150px'
    },
    image: {
        width: '100%',
        height: '30vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '50vh',
        },
    },
    detailWrapper: {
        textAlign: 'center',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'center',
    },
    logo: {
        fontSize: '40px',
        color: '#64c5ba',
        "&:hover": {
            color: '#80b98b',
        }
    },
    postDate: {
        padding: '0px 10px',
        color: 'lightgrey',
        textAlign: 'center'
    },
    postTitle: {
        textAlign: 'center',
        color: 'black'
    },
    commentTitle: {
        borderBottom: '3px solid #144047',
    },
    commentHeader: {
        backgroundColor: "#144047",
        width: '10%',
        textAlign: 'center',
        padding: '5px 10px',
        borderTopRightRadius: '0',
        borderTopLeftRadius: '0',
        [theme.breakpoints.down('xs')]: {
            width: '30%',
        },
    },
    newCommentSection: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            verticalAlign: 'top'
        },
    },
    profileImage: {
        flex: 1,
        width: '70px',
        height: '70px',
        borderRadius: '0',
        alignSelf: 'end',
        [theme.breakpoints.down('xs')]: {
            display: 'inline-block',
            verticalAlign: 'top'
        },
    },
    inputWrapper: {
        flex: 8,
        paddingTop: '20px',
        marginRight: '10px',
        [theme.breakpoints.down('xs')]: {
            display: 'inline-block',
            width: '50%'
        },
    },
    buttonWrapper: {
        flex: 1,
        paddingTop: '30px',
        marginRight: '20px',
        alignSelf: "end",
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center',
            paddingTop: '10px',

        },
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
        borderRadius: '0',
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
    },
    userCommentWrapper: {
        border: '1px solid lightgrey',
        color: 'black',
        borderRadius: '0',
        padding: '10px 20px',
        minHeight: '70px',
    },
    postShortDescription: {
        width: '70%',
        color: 'darkgrey',
        textAlign: 'center',
        margin: '20px auto',
        marginBottom: '0px'
    },
    tags: {
        display: 'inline-block',
        color: 'white',
        backgroundColor: '#144047',
        borderRadius: '0',
        margin: '10px 2px',
        padding: '3px 6px',
        fontSize: '14px',
        textDecoration: 'none'
    },
    usersComment: {
        margin: '10px 0px'
    },
    paper: {
        width: '75vw',
        overflowX: "hidden",
        minHeight: '65vh',
        padding: '20px',
        margin: '-15vh auto',
        paddingTop: '50px',
        [theme.breakpoints.down('xs')]: {
            width: '85vw',
        },
    },
    postOwnerDetails: {
        textAlign: 'center',
        color: 'black',
        marginTop: '20px',
        padding: '20px 0px',
    },
    postOwnerImage: {
        display: 'inline-block',
        width: 50,
        height: 50,
        borderRadius: 0,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        verticalAlign: 'middle',
        margin: '0px 10px',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            textAlign: 'center',
            margin: '0 auto',
            width: 50,
            height: 50,
            borderRadius: 0,
        },
    }
}));
export default function PostSingle(props) {
    const { globalUser } = useSelector((state) => state.userReducer)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(undefined)
    const [day, setDay] = useState(undefined)
    const [month, setMonth] = useState(undefined)
    const [year, setYear] = useState(undefined)
    const [post, setPost] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const history = useHistory();
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [errModal, setErrModal] = useState(false)
    const [posts, setPosts] = useState(undefined)
    const [relatedLoading, setRelatedLoading] = useState(true)
    const [relatedPosts, setRelatedPosts] = useState(undefined)
    const [dayByNumber, setDayByNumber] = useState(undefined)
    var slug = props.match.params.slug
    useEffect(() => {
        window.scrollTo(0, 0)
        setLoading(true)
        setRelatedLoading(true)
        getPost()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [slug])
    useEffect(() => {
        if (post != undefined) {
            setLoading(false)
            getPosts(post.categ)
        }
    }, [post])
    const elRef = useRef();
    const getPost = async () => {
        try {
            apiCall.current = API.request(`/post/${props.match.params.slug}`, false, {});
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == "Fetched successfully") {
                const fullDate = moment(response.data.last_publish_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
                setDayByNumber(fullDate.substring(8))
                setDay(moment(response.data.last_publish_time, 'YYYY/MM/DD').locale('fa').format('dddd '))
                setMonth(moment(response.data.last_publish_time, 'YYYY/MM/DD').locale('fa').format('MMM'))
                setYear(moment(response.data.last_publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy '))
                setPost(response.data)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const getPosts = async (categ) => {
        try {
            apiCall.current = API.request('/post/cat/', true, {
                categ: categ[0]
            });
            const response = await apiCall.current.promise
            if (response.message == 'Fetched successfully') {
                const data = response.data.filter(post => post.slug != slug)
                if (data.length > 6) {
                    let tmp = []
                    for (var k = 0; k < 6; k++) {
                        tmp.push(data[k])
                    }
                    setRelatedPosts(tmp)
                }
                else if (data.length > 3) {
                    let tmp = []
                    for (var k = 0; k < 3; k++) {
                        tmp.push(data[k])
                    }
                    setRelatedPosts(tmp)
                }
                else {
                    setRelatedPosts(data)

                }
                setRelatedLoading(false)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    useEffect(() => {
        if (relatedPosts != undefined) {
            setRelatedLoading(false)
        }
    }, [relatedPosts])
    const submitComment = async () => {
        try {
            apiCall.current = API.request(`/comment/create/?type=post&slug=${post.slug}&user_id=${globalUser.user_id}&parent_id=`, true, {
                content: value
            }, globalUser.accessToken);
            const response = await apiCall.current.promise
            if (response.message == "Sent successfully") {
                setModal(true)
            }
            else setErrModal(true)
        }
        catch (err) {
            setErrModal(true)
        }
    }
    const LoadingRow = () => {
        var views = []
        if (window.innerWidth > 576)
            for (var i = 0; i < 3; i++) {
                views.push(
                    <div className="col-md-6 col-lg-4" >
                        <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '0' }} />
                        <Skeleton variant="text" height={40} style={{ borderRadius: '0' }} />
                    </div>)
            }
        else for (var i = 0; i < 1; i++) {
            views.push(
                <div className={classes.loadingSingleBox} >
                    <Skeleton variant="rectangular" width={'100%'} height={150} style={{ borderRadius: '0' }} />
                    <Skeleton variant="text" height={40} style={{ borderRadius: '0' }} />
                </div>)
        }
        return views
    }
    return (
        <div>
            <Navbar />
            {loading ?
                <LoadingScreen />
                :
                <>
                    <Helmet>
                        <title>بیتداد | {`${post.title}`}</title>
                        <meta name="decription" content={post.tags} />
                    </Helmet>
                    <section className={classes.section}>
                        <div className={classes.image} style={{
                            backgroundImage: BG_URL(PUBLIC_URL(`${CONFIG.API_URL}${post.image}`)),
                            boxShadow: '0px 5px 5px -5px #000000'
                        }}
                        />
                        <Paper className={classes.paper} elevation={10}>
                            <div className='container'>
                                <h3 className={classes.postTitle}>{post.title}</h3>
                                <p className={classes.postShortDescription}>{post.short_description}</p>
                                {/* {post.owner_image.indexOf("google") != -1 ?
                                    <div className={classes.postOwnerDetails}>
                                        <div className={classes.postOwnerImage} style={{ backgroundImage: BG_URL(PUBLIC_URL(post.owner_image)) }}></div>
                                        <div className='text-dark'>
                                            نوشته شده توسط:
                                        </div>
                                        <div className='text-dark' style={{ fontSize: 12 }}>
                                            {post.owner_name}
                                        </div>
                                        <div className='text-dark'>
                                            در تاریخ
                                            &nbsp;
                                            {day}،
                                            {dayByNumber}
                                            &nbsp;
                                            {month}
                                            &nbsp;
                                            {year}
                                        </div>

                                    </div>
                                    :
                                    <div className={classes.postOwnerDetails}>
                                        <div style={{
                                            display: 'inline-block',
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            verticalAlign: 'middle',
                                            margin: '0px 10px',
                                            backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir${post.owner_image}`))
                                        }}></div>
                                        نوشته شده توسط {post.owner_name} در تاریخ&nbsp;{day}،{month}&nbsp;{year}
                                    </div>
                                } */}
                                <div className="ck-content text-dark" ref={elRef}
                                    dangerouslySetInnerHTML={{ __html: post.content }} />
                                <div className='text-center'>
                                    {post.tags.length != 0 ?
                                        post.tags.map((tag, index) => {
                                            return <Link to={`/blog/tag/${tag}`} className={classes.tags} key={index}>{tag}</Link>
                                        })
                                        : undefined}
                                </div>
                            </div>
                            <div className='container'>
                                <div className={classes.commentSection}>
                                    <div className={classes.commentTitle}>
                                        <div className={classes.commentHeader}>نظرات</div>
                                    </div>
                                    {globalUser.username.length != 0 ?
                                        <div className={classes.newCommentSection}>
                                            {globalUser.image_url.length !== 0 ?
                                                <div className={classes.profileImage}
                                                    style={{
                                                        backgroundImage: globalUser.image_url.indexOf("google") != -1 ?
                                                            BG_URL(PUBLIC_URL(`${globalUser.image_url}`))
                                                            :
                                                            BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283/${globalUser.image_url}`))
                                                        ,
                                                        backgroundSize: "auto 100%",
                                                        backgroundPosition: "center",
                                                        backgroundRepeat: 'no-repeat',
                                                    }} />
                                                :
                                                <div className={classes.profileImage}
                                                    style={{
                                                        backgroundImage: BG_URL(PUBLIC_URL("/images/academy/profile.svg")),
                                                        backgroundSize: "auto 100%",
                                                        backgroundPosition: "center",
                                                        backgroundRepeat: 'no-repeat',
                                                    }} />
                                            }
                                            <div className={classes.inputWrapper}>
                                                <textarea value={value} onChange={(e) => setValue(e.target.value)} className='form-control' placeholder='نظر شما' />
                                            </div>
                                            <div className={classes.buttonWrapper}>
                                                <button className='btn btn-md btn-success' onClick={submitComment}>ثبت نظر</button>
                                            </div>
                                        </div>
                                        :
                                        <div className='text-center' style={{ margin: '20px 0px' }}>
                                            <button className='btn btn-md' style={{ backgroundColor: "#64c5ba" }} onClick={() => { history.push("/login") }}>برای ثبت نظر وارد حساب کاربری خود شوید</button>
                                        </div>
                                    }
                                    <Divider />
                                    {post.comments.length != 0 ?
                                        <div className={classes.usersComment} >
                                            {post.comments.map((comment) => {
                                                let imag = undefined
                                                if (comment.owner_image.indexOf("google") != -1) {
                                                    imag = comment.owner_image
                                                } else {
                                                    imag = `https://api.aqua.ir:8283/${comment.owner_image}`
                                                }
                                                return <div className={classes.newCommentSection} key={comment.id}>
                                                    <div className={classes.profileImage}
                                                        style={{
                                                            backgroundImage: BG_URL(PUBLIC_URL(imag)),
                                                            backgroundSize: "auto 100%",
                                                            backgroundPosition: "center",
                                                            backgroundRepeat: 'no-repeat',
                                                        }} />
                                                    <div className={classes.inputWrapper}>
                                                        <div className={classes.userCommentWrapper}>
                                                            <div style={{ fontSize: '14px', color: '#494949', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                                                <span>
                                                                    {comment.owner_name}
                                                                </span>
                                                                <span>
                                                                    {moment(comment.created_at, 'YYYY/MM/DD').locale('fa').format('dddd ')}
                                                                    ,
                                                                    {moment(comment.created_at, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD').substring(8)}
                                                                    &nbsp;
                                                                    {moment(comment.created_at, 'YYYY/MM/DD').locale('fa').format('MMM')}
                                                                    &nbsp;

                                                                    {moment(comment.created_at, 'YYYY/MM/DD').locale('fa').format('yyyy ')}
                                                                </span>
                                                            </div>
                                                            <br />
                                                            <span>{comment.content}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            })}
                                        </div>
                                        : <div style={{ color: 'black', padding: '10px 20px' }}> برای این پست نظری ثبت نشده است</div>
                                    }
                                </div>
                            </div>
                        </Paper>
                        <div className={classes.relatedWrapper} style={{ marginTop: '20vh' }}>
                            <div className='container'>
                                {relatedLoading ? <div className='row'>
                                    <LoadingRow />
                                </div>
                                    :
                                    <>
                                        {relatedPosts != undefined && relatedPosts.length != 0 ?
                                            <>
                                                <div className={classes.relatedTitle} style={{ color: 'white', textAlign: 'center' }}>خبر های مرتبط</div>
                                                <div className='row'>
                                                    {relatedPosts.map((post) => {
                                                        return <div className='col-md-5 col-lg-4' key={post.id}>
                                                            <div style={{ padding: "0 30px" }}>
                                                                <PostCard post={post} />
                                                            </div>
                                                        </div>
                                                    })
                                                    }
                                                </div>
                                            </>
                                            :
                                            undefined
                                        }

                                    </>
                                }
                            </div>
                        </div>
                    </section>
                </>

            }
            <Modal
                open={modal}
                onClose={() => setModal(false)}
            >
                <div className={classes.modal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%', flexDirection: 'column' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: "50px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ثبت نظر موفقیت آمیز بود و بعد از تایید نمایش خواهد داده شد</span>
                    </div>
                </div>
            </Modal>
            <Modal
                open={errModal}
                onClose={() => setErrModal(false)}
            >
                <div className={classes.modal}>
                    <div style={{ display: 'flex', alignItems: ' center', width: '100%', height: '100%', flexDirection: 'column' }}>
                        <CancelIcon style={{ color: 'red', fontSize: "50px" }} />
                        <span className="text-dark" style={{ marginRight: '10px' }}>ثبت نظر موفقیت آمیز نبود</span>
                    </div>
                </div>
            </Modal>
            <Footer />
        </div >
    )
}