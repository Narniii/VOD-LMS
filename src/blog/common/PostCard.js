import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { BG_URL, PUBLIC_URL } from '../utils/utils';
import { Link } from 'react-router-dom';
import { CONFIG } from "../utils/Config"
import moment from 'jalali-moment'

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        height: '40vh',
        margin: '10px 0px',
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        background: '#2f3835',
        [theme.breakpoints.down('xs')]: {
            height: '55vh',
        },
    },
    imageWrapper: {
        height: '70%',
        [theme.breakpoints.down('xs')]: {
            height: '65%',
        },
    },
    linkToPost: {
        textDecoration: 'none',
        "&:hover": {
            transition: '200ms',
            color: '#64c5ba'
        }
    },
    cardTitle: {
        fontSize: '19px',
        padding: '10px 20px',
        [theme.breakpoints.between('xs', 'md')]: {
            fontSize: '16px',
        },
    },
    postDate: {
        padding: '0px 20px',
        color: '#6e6e6e'
    }
}));

export default function Title({ post }) {
    const classes = useStyles();
    var day
    var month
    var year
    var dayByNumber
    if (post.last_publish_time !== null && post.last_publish_time !== undefined) {
        day = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('dddd ')
        month = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('MMM')
        year = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('yyyy ')
        const fullDate = moment(post.last_publish_time, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
        dayByNumber = fullDate.substring(8)
    }
    return (
        <Paper className={classes.cardWrapper} elevation={2}>
            <Link className={classes.linkToPost} to={`/blog/${post.slug}`} >
                <div className={classes.imageWrapper} style={{
                    backgroundImage: BG_URL(PUBLIC_URL(`${CONFIG.API_URL}${post.image}`)),
                    backgroundSize: "auto 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: 'no-repeat'
                }}>
                </div>
                <h1 className={classes.cardTitle}>
                    {post.title}
                </h1>
                {day != undefined && month != undefined && year != undefined ?
                    <p className={classes.postDate}>
                        {day}،
                        {dayByNumber}
                        &nbsp;
                        {month}
                        &nbsp;
                        {year}
                        {/* {day}،{month}&nbsp;{year} */}
                    </p>
                    :
                    undefined}

            </Link>
        </Paper>

    )
}
