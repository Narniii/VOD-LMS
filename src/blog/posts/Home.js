import { CircularProgress, Paper } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import API from '../utils/Api'
import { makeStyles } from '@material-ui/core/styles';
import Title from '../common/Title';
import LoadingScreen from '../common/LoadingScreen';
import { fabClasses } from '@mui/material';
import PostCard from '../common/PostCard';
import FavoritePost from '../common/FavoritePost';
import Navbar from '../ExtraPages/Navbar'
import Footer from '../ExtraPages/Footer';
import axios from 'axios';
const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: '10vh',
        minHeight: '75vh',
    },
    titleWrapper: {
        width: '10%',
        margin: '0 auto',
        color: 'black',
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
    },
    postsWrapper: {
        padding: '20px'
    },
    loadingScreen: {
        display: 'flex',
        flex: 1,
        height: '80vh',
        alignItems: "center",
        justifyContent: "center",
    },
}));
export default function Home() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(undefined)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [favoritePost, setFavoritePost] = useState(undefined)
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(2)
    const [endOfPost, setEndOfPost] = useState(false)
    const [loadMoreLoading, setLoadMoreLoading] = useState(false)
    useEffect(() => {
        getPosts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (posts != undefined) {
            setLoading(false)
        }
    }, [posts])
    const getPosts = async () => {
        try {
            apiCall.current = API.request('/post/load-more/', true, {
                from: from,
                to: to
            });
            const response = await apiCall.current.promise
            // console.log(response)
            // const res = await axios.post(`https://api.aqua.ir:8283/post/load-more/`,
            //     {
            //         from: from,
            //         to: to
            //     });
            // console.log(res)
            if (response.message == 'Fetched successfully') {
                let tempFrom = from + 3
                let tempTo = to + 3
                setFrom(tempFrom)
                setTo(tempTo)
                let temp = response.data[0]
                setFavoritePost(temp)
                setPosts(response.data)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    const loadMore = async () => {
        setLoadMoreLoading(true)
        try {
            apiCall.current = API.request('/post/load-more/', true, {
                from: from,
                to: to
            });
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == 'Fetched successfully') {
                let tempFrom = from + 3
                let tempTo = to + 3
                setFrom(tempFrom)
                setTo(tempTo)
                var q = 0
                for (q; q < response.data.length; q++) {
                    setPosts(prevState => [...prevState, response.data[q]])
                }
                setLoadMoreLoading(false)
            }
            else if (response.message == "Out of index") {
                setEndOfPost(true)
                setLoadMoreLoading(false)
            }

        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoadMoreLoading(false)
        }
    }
    return (
        <div>
            <Navbar />
            {loading ?
                <div className={classes.loadingScreen}><CircularProgress /></div>
                :
                <section className={classes.section}>
                    <div className='container'>
                        <FavoritePost post={favoritePost} />
                        <div className={classes.titleWrapper}>
                            <Title text="مطالب وبلاگ" />
                        </div>
                        <div className={classes.postsWrapper}>
                            <div className='row'>
                                {posts.map((post) => {
                                    return <div className='col-sm-4' key={post.id}>
                                        <PostCard post={post} />
                                    </div>
                                })
                                }
                            </div>
                        </div>
                        {endOfPost ? undefined :
                            <div className='text-center' style={{ margin: '10px 0px' }}>
                                {
                                    loadMoreLoading ?
                                        <button className='btn btn-md btn-warning' style={{ minWidth: 70 }}><CircularProgress size={20} /></button>
                                        :
                                        <button className='btn btn-md btn-warning' style={{ minWidth: 70 }} onClick={() => { loadMore() }}>بیشتر</button>
                                }
                            </div>
                        }
                    </div>
                </section>
            }
            <Footer />
        </div>
    )
}