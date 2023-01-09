// import Image from 'next/image';
// import styles from '../../styles/Home.module.css'
import moment from 'jalali-moment'
import { makeStyles } from '@material-ui/core/styles';
import { useLayoutEffect, useState } from 'react';
// import { useRouter } from 'next/router'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    outerCard: {
        width: "300px",
        height: "300px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "20px",
    },
    border: {
        width: "3px",
        height: "100%",
        background: "rgb(100, 197, 186)",
        background: "linear-gradient(180deg,rgba(100, 197, 186, 1) 0%,rgba(98, 198, 186, 0.061239461604954526) 100%)",
    },
    postCard: {
        // backgroundColor:"white",
        // borderRight: "1px solid #64C5BA",
        // borderLeft: "1px solid #64C5BA",
        // borderRadius: "20px 0 20px 0",
        width: "297px",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        padding: "20px",
    },
    cardContent: {
        textAlign: "justify",
        color: "white",
    },
    courseImage: {
        width: "100px",
        height: "100px",
        // alignSelf: "flex-start",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    postDate: {
        fontSize: "12px",
        color: "#64C5BA"
    },
    imageAndDescription: {
        display: "flex",
        justifyContent: "space-between",
        width: "90%"

    },
    description: {
        width: "100px",
        height: "100px",
        textAlign: "justify",
        // borderRight: "1px solid #64C5BA",
        // borderLeft: "1px solid #64C5BA",
        borderRadius: "20px 0 20px 0",
        padding: "5px",
        fontWeight: "light",
        color: "white",
        fontSize: "12px",
        overflow: "scroll",
        "-ms-overflow-style": "none", /*IE and Edge*/
        scrollbarWidth: 'none', /*Firefox*/
        "&::-webkit-scrollbar": {
            display: "none",
        },

        // boxShadow: "-1px -1px 20px 5px #64C5BA",
    },
    showMoreButton: {
        border: "none",
        // border: '1px solid white',
        backgroundColor: 'inherit',
        // borderRadius: '21px 0px 21px 0px',
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '0 auto',
        "&:hover": {
            color: '#64c5ba',
            textShadow: "0 0 0.125em #64c5ba, 0 0 0.45em #64c5ba"
        }
    }
}));




const PostCard = ({ post }) => {
    const history = useHistory()
    const classes = useStyles()
    const day = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('dddd ')
    const month = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('MMM')
    const year = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy ')
    const [paragraph, setParagraph] = useState(undefined)
    useLayoutEffect(() => {
        const pageContents = document.getElementById('postcontent');
        const div = document.createElement('div');
        div.innerHTML = post.content
        const p = div.querySelector('p').innerText
        const shortedDes = p.substring(0, 70);
        setParagraph(shortedDes)
        // console.log(shortedDes)
        // setParagraph(div.querySelector('p'));
    }, []);
    // console.log(paragraph)
    return (
        <div className={classes.outerCard}>
            <div className={classes.border} />
            <div className={classes.postCard}>
                <div className={classes.cardContent}>
                    <h5 className='text-light'>{post.title}</h5>
                    <p className={classes.postDate}>انتشار یافته در:{day}،{month}&nbsp;{year}</p>
                </div>
                <div className={classes.imageAndDescription}>
                    <div className={classes.courseImage} style={{ backgroundImage: `url(${`https://api.aqua.ir:8283/${post.image}`})` }}>
                    </div>
                    {paragraph != undefined ?
                        <div id="postcontent" className={classes.description}>{paragraph}...</div>
                        :
                        < div className={classes.description}>{post.short_description}</div>}
                    {/* <div id="postcontent" dangerouslySetInnerHTML={{ __html: post.content }} className={classes.description}></div> */}
                    {/* <Image src='/images/banner1.png' layout='fill'/> */}
                </div>
                <button onClick={() => { history.push(`/blog/${post.slug}`) }} className={classes.showMoreButton}>نمایش پست</button>
            </div>
        </div >
    );
}

export default PostCard;