import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
import Link from 'next/link';
import moment from 'jalali-moment'

const useStyles = makeStyles((theme) => ({
    cardWrapper: {
        height: '40vh',
        margin: '10px 0px',
        // [theme.breakpoints.down('xs')]: {
        //     height: '55vh',
        // },

    },
    imageWrapper: {
        height: '70%',
        // [theme.breakpoints.down('xs')]: {
        //     height: '65%',
        // },
    },
    linkToPost: {
        color: 'black',
        textDecoration: 'none',
        "&:hover": {
            transition: '200ms',
            color: '#64c5ba'
        }
    },
    cardTitle: {
        fontSize: '19px',
        padding: '10px 20px',
        color: 'black',
        // [theme.breakpoints.between('xs', 'md')]: {
        //     fontSize: '16px',
        // },
    },
    postDate: {
        padding: '0px 20px',
        color: '#6e6e6e'
    }
}));

export default function PostSingleCard({ post }) {
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
            <Link href={`/blog/${post.slug}`} >
                <div className={classes.linkToPost}>
                    <div className={classes.imageWrapper} style={{
                        backgroundImage: BG_URL(PUBLIC_URL(`https://api.aqua.ir:8283/${post.image}`)),
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
                </div>
            </Link>
        </Paper>

    )
}
