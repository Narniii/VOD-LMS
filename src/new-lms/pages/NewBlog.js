import React, { useEffect, useRef, useState } from 'react'
import API from '../../utils/api'
import { makeStyles } from '@material-ui/core/styles';
import FavoritePost from '../comps/cards/FavoritePost';
import PostCard from '../comps/cards/PostCard';
import { Button, CircularProgress } from '@mui/material';
import Navbar from '../navbar/Navbar';
import Footer from '../comps/Footer';
const useStyles = makeStyles((theme) => ({
    section: {
        padding: '10vh 0px',
        minHeight: '75vh',
        background: "#0f2d3e",
        background: "linear-gradient(180deg,rgba(13, 45, 62, 1) 0%,rgba(20, 63, 70, 1) 51%,rgba(15, 45, 62, 1) 80%)"
    },
    postsWrapper: {
        padding: '20px',
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
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
            marginTop: '60px',
            marginBottom: '0px',
        },
    },
    loadingScreen: {
        display: 'flex',
        flex: 1,
        height: '80vh',
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        width: "150px",
        textAlign: "center",
        color: "#64C5BA",
        borderTop: "1px solid #64C5BA",
        borderBottom: "1px solid #64C5BA",
        padding: "10px 0px",
    }
}));
export default function Blog() {
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
                <div className={classes.loadingScreen}><CircularProgress color='info' style={{ color: "#64c5ba" }} /></div>
                :
                <section className={classes.section}>
                    <div className='container'>
                        <FavoritePost post={favoritePost} />
                        <div className={classes.titleWrapper}>
                            <h5 className={classes.title}>
                                مطالب وبلاگ
                            </h5>
                        </div>
                        <div className={classes.postsWrapper}>
                            {/* <div className='row'> */}
                            {posts.map((post) => {
                                // return 
                                // <div className='col-sm-4' key={post.id}>
                                return <PostCard key={post.id} post={post} />
                                {/* </div> */ }
                            })
                            }
                            {/* </div> */}
                        </div>
                        {endOfPost ? undefined :
                            <div className='text-center' style={{ margin: '10px 0px' }}>
                                {
                                    loadMoreLoading ?
                                        <Button className='btn btn-lg btn-outline-success' color='info' style={{ width: "140px", height: "45px", borderRadius: "0", minWidth: 70, border: "#64c5ba solid 1px", color: "#64c5ba" }}><CircularProgress sx={{ color: '#64c5ba' }} size={20} /></Button>
                                        :
                                        <Button className='btn btn-lg btn-outline-success' color='info' style={{ width: "140px", height: "45px", borderRadius: "0", minWidth: 70, border: "#64c5ba solid 1px", color: "#64c5ba" }} onClick={() => { loadMore() }}>بیشتر</Button>
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