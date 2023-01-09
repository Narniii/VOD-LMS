import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import { BG_URL, PUBLIC_URL } from '../../utils/utils';
const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        [theme.breakpoints.between("sm", "md")]: {
            paddingTop: 100
        },
    },
    animateLogo: {
        animation: '$spin 1s infinite',
        animationDirection: 'alternate-reverse;',
        [theme.breakpoints.down('xs')]: {
            width: '50%'
        },
        [theme.breakpoints.between("sm", "md")]: {
            width: '50%'
        },
        "@media (min-width: 1000px)": {
            width: '30%'
        }
    },
    '@keyframes spin': {
        '100%': { transform: 'rotate(1deg)' }
    },

}))
export default function Loading() {
    const classes = useStyles();
    return (
        <section className={classes.wrapper} style={{
            backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center',
        }} >
            <img className={classes.animateLogo} src={PUBLIC_URL('images/logo.svg')} />
            <h1 className="text-english">Loading</h1>
        </section>

    )
}
