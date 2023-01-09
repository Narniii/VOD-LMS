import { CircularProgress, Paper } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import API from '../utils/Api'
import { makeStyles } from '@material-ui/core/styles';
import PostCard from '../common/PostCard';
import Navbar from '../../new-lms/navbar/Navbar';
import Footer from '../../new-lms/comps/Footer';
const useStyles = makeStyles((theme) => ({
    section: {
        paddingTop: '10vh',
        minHeight: '75vh'
    },
    titleWrapper: {
        width: 'fit-content',
        margin: '20px auto',
        color: 'white',
        alignSelf: "center",
        justifySelf: "center",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down('xs')]: {
            width: '50%',
        },
    },
    title: {
        textAlign: "center",
        color: "#64C5BA",
        borderTop: "1px solid #64C5BA",
        borderBottom: "1px solid #64C5BA",
        padding: "10px",
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
export default function PostByTags(props) {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(undefined)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const classes = useStyles();
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(2)
    const [endOfPost, setEndOfPost] = useState(false)
    const [loadMoreLoading, setLoadMoreLoading] = useState(false)
    const tagFilteredBy = props.match.params.tag
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
            apiCall.current = API.request('/post/search/tag/', true, {
                from: from,
                to: to,
                tag: tagFilteredBy
            });
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == 'Fetched successfully') {
                let tempFrom = from + 3
                let tempTo = to + 3
                setFrom(tempFrom)
                setTo(tempTo)
                let temp = response.data[0]
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
            apiCall.current = API.request('/post/search/tag/', true, {
                from: from,
                to: to,
                tag: tagFilteredBy
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
                        <div className={classes.titleWrapper}>
                            <h5 className={classes.title}>مطاب تگ {tagFilteredBy}</h5>
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
                                        <button className='btn btn-md btn-success' style={{ minWidth: 70 }}><CircularProgress size={20} /></button>
                                        :
                                        <button className='btn btn-md btn-success' style={{ minWidth: 70 }} onClick={() => { loadMore() }}>بیشتر</button>
                                }
                            </div>
                        }
                    </div>
                </section>
            }
            <Footer />
        </div >
    )
}