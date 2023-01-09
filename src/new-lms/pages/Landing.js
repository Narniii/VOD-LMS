import '../style/home.css'
import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import AboutCard from '../comps/cards/AboutCards'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/system'
import GraphItem from '../comps/GraphItem'
import API from '../../utils/api'
import ContactUs from '../comps/ContactUs'
import { Helmet } from 'react-helmet'
import Navbar from '../navbar/Navbar'
import { PUBLIC_URL } from '../../utils/utils'
import Footer from '../comps/Footer.js'
import AboutUs from '../comps/AboutUs'


export default function Landing() {
    // console.log(products)
    const [active, setActive] = useState(false)
    const [activity, setActivity] = useState(false)
    const [load, setLoad] = useState(false)
    const router = useLocation()
    // const [result, setResult] = useState(products.slice(0, 4))
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState(undefined)
    const [error, setError] = useState(undefined)
    const apiCall = useRef(undefined);
    const [from, setFrom] = useState(0)
    const [to, setTo] = useState(3)
    const [endOfPost, setEndOfPost] = useState(false)
    const [loadMoreLoading, setLoadMoreLoading] = useState(false)
    const [seacrhedResults, setSearchedResults] = useState([])

    useEffect(() => {
        getProducts()
        return () => {
            if (apiCall.current !== undefined)
                apiCall.current.cancel();
        }
    }, [])
    useEffect(() => {
        if (products != undefined) {
            setLoading(false)
        }
    }, [products])
    const getProducts = async () => {
        try {
            apiCall.current = API.request('/product/load-more/', true, {
                from: from,
                to: to
            });
            const response = await apiCall.current.promise
            if (response.message == 'Fetched successfully') {
                let tempFrom = from + 4
                let tempTo = to + 4
                setFrom(tempFrom)
                setTo(tempTo)
                setProducts(response.data)
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
        }
    }
    function reveal() {
        var elem = document.getElementById('graph');
        if (!elem) return
        var elementTop = elem.getBoundingClientRect().top;
        var elementVisible = 100;
        var windowHeight = window.innerHeight
        if (elementTop < windowHeight - elementVisible) {
            setActive(true)
        } else {
            setActive(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", reveal);
        // window.addEventListener("scroll", revealAbout);
        document.getElementById('intro').addEventListener("scrolll", scroill)
    }, [])
    const loadMore = async () => {
        console.log("load more courses")
        // setLoad(!load)
        document.getElementById('graph').style.height = '200vh'
        document.getElementById('coursesSection').style.height = 'auto'
        setLoadMoreLoading(true)
        try {
            apiCall.current = API.request('/product/load-more/', true, {
                from: from,
                to: to
            });
            const response = await apiCall.current.promise
            // console.log(response)
            var tempProducts = []
            if (response.message == 'Fetched successfully') {
                let tempFrom = from + 4
                let tempTo = to + 4
                setFrom(tempFrom)
                setTo(tempTo)
                var q = 0
                var graph = document.createElement('div');
                graph.className = 'graph'
                graph.style.display = active ? 'flex' : 'none';
                var line = document.createElement('div')
                line.className = 'line'
                graph.appendChild(line)
                for (q; q < response.data.length; q++) {
                    setProducts(prevState => [...prevState, response.data[q]])
                    tempProducts.push(response.data[q])
                }
                if (tempProducts.length % 4 != 0) {
                    console.log(tempProducts.length)
                    switch (tempProducts.length) {
                        case 1:
                            graph.style.height = '50vh';
                            console.log(graph.style.height)
                            break;
                        case 2:
                            graph.style.height = '100vh';
                            console.log(graph.style.height)
                            break;
                        case 3:
                            graph.style.height = '150vh';
                            console.log(graph.style.height)
                            break;
                        default:
                            graph.style.height = '150vh';
                            console.log(graph.style.height)
                    }
                } else {
                    console.log('0', tempProducts.length)
                    graph.style.height = '150vh';
                    console.log(graph.style.height)
                }
                setLoadMoreLoading(false)
                // document.getElementById('graph').style.height = 'auto'
                // document.getElementById('graph').appendChild(graph);
                document.getElementById('coursesSection').appendChild(graph);
            }
            else if (response.message == "Out of index") {
                console.log(response.message)
                setEndOfPost(true)
                setLoadMoreLoading(false)
                // document.getElementById('line').style.height = 'auto'
                // document.getElementById('graph').style.height = '200vh'
                // document.getElementById('coursesSection').style.height = 'auto'
                document.getElementById('flickSquare').style.animation = 'none'
            }
        }
        catch (err) {
            console.log(err)
            setError('خطایی رخ داده است. لطفا مجددا امتحان کنید')
            setLoadMoreLoading(false)
        }
    }
    useEffect(() => {
        if (products != undefined) {
            if (products.length % 4 !== 0) {
                // console.log(products.length % 4)
            }
        }
    }, [products])
    const scrollTo = () => {
        window.scrollTo({
            top: 750,
            behavior: 'smooth',
        });
    };
    const setResults = (r) => {
        if (r.length != 0) {
            setSearchedResults(r)
        } else {
            setSearchedResults([])
        }
    }
    const scroill = () => {
        document.getElementById('coursesSection').scrollIntoView();
    }

    return (
        <section>
            <Navbar />
            <div className={'containeer'}>
                <Helmet>
                    <title>بیتداد</title>
                    <meta charSet="utf-8" />
                    <meta name="description" content="Generated by aqua" />
                    <link rel="canonical" to="http://aqua.ir/" />
                    <link rel="icon" to="/favicon.ico" />
                </Helmet>
                <div className={'main'}>
                    {/* <ReactPageScroller blockScrollDown={true}> */}
                    <div id='intro' className={'introduction'}>
                        <div className={'background'}>
                        </div>
                        {/* <div className='col-md-6'></div> */}
                        <div className="container">
                            <div className='row'>
                                <div className='col-md-7'></div>
                                <Box className="col-md-5" sx={{ padding: { xs: "3px 20px", md: "10px" }, display: "flex", flexDirection: "column" }} >
                                    <div className='intro-header' style={{ width: "100%", alignSelf: "left", textAlign: "justify" }}>
                                        <h1 className='text-light' style={{ overflowWrap: "anywhere" }}>aqua</h1>
                                        <h4 className='text-light' style={{ textAlign: "left", width: "100%" }}>Immersed in DeFi</h4>
                                    </div>
                                    <h1 style={{ color: "#64C5BA", textShadow: "0 0 0.00em #64c5ba, 0 0 0.1em #64c5ba" }}>بیتداد</h1>
                                    <div className={'description'}>
                                        <div className={'Border'} />
                                        <p>
                                            گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span>، همواره با شناخت و تحلیل فرصت ها و تهدیدات
                                            به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span> از هر طریق میپردازد.
                                        </p>
                                    </div>
                                    <div className={'neonButtons'}>
                                        <div className={'greenButton'}>
                                            <Link style={{ textDecoration: 'none' }} to='/blog'>
                                                <p>وبلاگ</p>
                                            </Link>
                                        </div>
                                        <div className={'blueButton'}>
                                            <a style={{ textDecoration: 'none' }} href='https://nft.bitzio.ir' target='blank'>
                                                <p>فروشگاه NFT</p>
                                            </a>
                                        </div>
                                    </div>
                                </Box>
                            </div>
                        </div>
                    </div>
                    {/* </ReactPageScroller> */}
                    <Box sx={{ height: { xs: "200vh", md: "100vh" } }} className={'coursesSection'} id='coursesSection'>
                        <div className={'circle'} />
                        <div className={'flickSquare'} id='flickSquare' onClick={loadMore}>
                            <div className={'liCircle'}></div>
                        </div>
                        {/* {!loading ? <> */}
                        <div className={'graph'} id='graph' >
                            <div className={'line'} id='line' />
                            {products != undefined && products.length != 0 ?
                                <>
                                    {products.map((product, index) => {
                                        let delay = index / 5
                                        return <GraphItem key={product.id} product={product} animationDelay={delay} top={`calc(${index + 1}*20%)`} right={(index % 2 == 0) ? "50%" : undefined} cardRight={(index % 2 == 0) ? "70%" : undefined} left={(index % 2 == 0) ? undefined : "50%"} cardLeft={(index % 2 == 0) ? undefined : "70%"} />
                                    })}
                                </>
                                : undefined}
                        </div>
                    </Box>
                    <AboutUs />
                    <ContactUs />
                    <div className={'scrollArrow'} onClick={scroill}>
                        <img src='../svg/scroll_arrow_button.svg' style={{ width: "100%", height: "100%" }} />
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}
