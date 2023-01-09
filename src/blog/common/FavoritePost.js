import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { BG_URL, PUBLIC_URL } from '../utils/utils';
import { CONFIG } from '../utils/Config';
import moment from 'jalali-moment'
import CustomButton from './CustomButton';
import { Link } from 'react-router-dom';

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
        width: '100%',
        position: 'absolute',
        left: '-30px',
        height: '27vh',
        borderRadius: '10px',
        padding: '10px 20px'
    },
    imageWrapper: {
        flex: 4,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: '10px'
    },
    cardTitle: {
        fontSize: '16px',
        borderRight: '3px solid #64c5ba',
        padding: '5px 10px',
        color: '#64c5ba',
        [theme.breakpoints.down('xs')]: {
            marginTop: '5px',
            marginRight: '10px',
        },
    },
    postTitle: {
        fontWeight: 'bold',
        color: 'black'
    },

    MobileCardWrapper: {
        [theme.breakpoints.up('xs')]: {
            display: 'none'
        },
        [theme.breakpoints.down('xs')]: {
            height: '75vh',
            margin: '10px 0px',
            display: 'block'

        },
    },
    mobileImageWrapper: {
        height: '60%'
    },
    linkToPost: {
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            transition: '200ms',
            color: '#64c5ba'
        }
    },
    MobileCardTitle: {
        fontSize: '19px',
        padding: '0px 10px',
        color: 'black'
    },
    postDate: {
        padding: '0px 20px',
        color: '#6e6e6e'
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
                            <div style={{ color: 'black' }}>{post.short_description.substring(0, 100) + "..."}</div> :
                            <div style={{ color: 'black' }}>{post.short_description}</div>
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
                        <CustomButton target={`/blog/${post.slug}`} title="نمایش پست" />
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
                    <CustomButton target={`/blog/${post.slug}`} title="نمایش پست" />

                </Link>
            </Paper>
        </>
    )
}
