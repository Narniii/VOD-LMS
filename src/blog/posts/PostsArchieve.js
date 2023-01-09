import React, { useEffect, useRef, useState } from 'react'
import API from '../utils/Api'

export default function PostsArchieve() {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(undefined)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);

    useEffect(() => {
        getPosts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        setLoading(false)
    }, [posts])
    const getPosts = async () => {
        try {
            apiCall.current = API.request('/post/published/', false, {});
            const response = await apiCall.current.promise
            // console.log(response)
            if (response.message == "Valid token") {
                setPosts(response.data)
            }
        }
        catch (err) {
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    return (
        <div>
            posts
        </div>
    )
}
