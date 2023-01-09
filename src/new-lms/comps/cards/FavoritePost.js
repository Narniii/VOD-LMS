import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import moment from 'jalali-moment'
// import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';
// import styles from '../../styles/Home.module.css'
import { Box } from '@material-ui/core'
import { BG_URL, PUBLIC_URL } from '../../../utils/utils';
import { CONFIG } from '../../../blog/utils/Config';
import '../../style/home.css'

const useStyles = makeStyles((theme) => ({
    favoriteWrapper: {
        display: 'flex',
        margin: '20px 0px',
        height: '40vh',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        },
    },
    cardWrapper: {
        flex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        position: 'relative'
    },
    card: {
        backgroundColor: "#0f2d3e",
        width: '100%',
        position: 'absolute',
        left: '-30px',
        height: '27vh',
        borderRadius: '0',
        padding: '10px 20px',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around"
    },
    imageWrapper: {
        flex: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '0'
    },
    cardTitle: {
        fontSize: '16px',
        borderRadius: "10px",
        padding: '2px',
        color: '#64C5BA',
        [theme.breakpoints.down('xs')]: {
            marginTop: '5px',
            marginRight: '10px',
        },
    },
    postTitle: {
        fontWeight: 'bold',
        color: 'white'
    },

    MobileCardWrapper: {
        backgroundColor: "#0f2d3e",
        position: 'relative',
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            height: '50vh',
            margin: '10px 0px',
            display: 'block',
            //another way ==>
            // display:"flex",
            // flexDirection:"column"
        },
    },
    mobileImageWrapper: {
        height: '50%',
    },
    linkToPost: {
        height: "60%",
        color: 'white',
        textDecoration: 'none',
        "&:hover": {
            transition: '200ms',
            color: '#64c5ba'
        }
    },
    MobileCardTitle: {
        fontSize: '19px',
        padding: '0px 10px',
        color: 'white'
    },
    postDate: {
        padding: '0px 20px',
        color: '#64c5ba'
    },
    customButton: {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        border: "none",
        padding: '10px 20px',
        width: '50%',
        height: "50px",
        display: 'inline-block',
        color: 'white',
        textAlign: 'center',
        margin: '0 auto',
        bottom: "-10%",
        "&:hover": {
            color: "#0f2d3e",
            transition: "500ms ease",
        },
        [theme.breakpoints.down('xs')]: {
            position: "unset",
            marginRight: "20px"
        },

    }

}));


export default function FavoritePost({ post }) {
    const classes = useStyles();
    const fullDate = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
    const dayByNumber = fullDate.substring(8)
    const day = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('dddd ')
    const month = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('MMM')
    const year = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy ')
    return (
        <>
            {/* no mobile card */}
            <div className={classes.favoriteWrapper}>
                <div className={classes.cardWrapper}>
                    <Paper className={classes.card} elevation={3}>
                        <h1 className={classes.cardTitle}>پربازدید ترین</h1>
                        <div className={classes.postTitle}>{post.title}</div>
                        {post.short_description.length > 100 ?
                            <div style={{ color: 'white', opacity: "0.7" }}>{post.short_description.substring(0, 100) + "..."}</div> :
                            <div style={{ color: 'white', opacity: "0.7" }}>{post.short_description}</div>
                        }
                        <div className={classes.postDate}>
                            {day}،
                            {dayByNumber}
                            &nbsp;
                            {month}
                            &nbsp;
                            {year}
                            {/* {day}،{month}&nbsp;{year} */}

                        </div>
                        <Link className='text-center' to={`/blog/${post.slug}`} style={{
                            position: 'absolute',
                            width: '100%',
                            bottom: '-25px',
                            left: 0
                        }}>
                            <div className={classes.customButton} style={{ backgroundImage: BG_URL(PUBLIC_URL("svg/login_button_fill.svg")), color: 'white', height: '50px', width: '160px', margin: '0 auto' }}>نمایش پست</div>
                        </Link>
                    </Paper>
                </div>
                <div className={classes.imageWrapper}>
                    <div className={classes.image} style={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${CONFIG.API_URL}${post.image}`)),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: 'no-repeat',
                        boxShadow: '0px 0px 25px 5px rgba(0,0,0,0.1)'
                    }} />
                </div>
            </div>
            {/* mobile only card */}
            <Paper className={classes.MobileCardWrapper} elevation={2}>
                <Link className={classes.linkToPost} to={`/posts/${post.slug}`} >
                    <div className={classes.mobileImageWrapper} style={{
                        backgroundImage: BG_URL(PUBLIC_URL(`${CONFIG.API_URL}${post.image}`)),
                        backgroundSize: "auto 100%",
                        backgroundPosition: "center",
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                    <h1 className={classes.cardTitle}>پربازدید ترین</h1>
                    <h1 className={classes.MobileCardTitle}>
                        {post.title}
                    </h1>
                    <p className={classes.postDate}>
                        {day}،
                        {dayByNumber}
                        &nbsp;
                        {month}
                        &nbsp;
                        {year}
                        {/* {day}،{month}&nbsp;{year} */}
                    </p>
                    <Link className='text-center' to={`/blog/${post.slug}`} style={{
                        position: 'absolute',
                        width: '100%',
                        bottom: '-25px',
                        left: 0
                    }}>
                        <div className={classes.customButton} style={{ backgroundImage: BG_URL(PUBLIC_URL("svg/login_button_fill.svg")), color: 'white', height: '50px', width: '160px', margin: '0 auto' }}>نمایش پست</div>
                    </Link>
                </Link>
            </Paper>
        </>
    )
}
