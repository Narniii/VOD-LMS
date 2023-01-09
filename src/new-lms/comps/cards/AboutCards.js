import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    card: {
        width: "120px",
        height: "120px",
        backgroundColor: "#0f2d3e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        border: "solid white 1px",
        animation: '2s borderer ease',
        borderRadius: "20px 0 20px 0",
        clipPath: 'polygon(20px 0, 100% 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 100%, 0 20px)',
        "&:after": {
            content: '""',
            border: '1px solid white',
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: '20px',
            width: '20px',
            zIndex: 4,
            backgroundColor: 'white',
            clipPath: "polygon(100% 0,100% 0,100% 0,100% 100%,100% 100%,0 100%,0 100%,0 100%)",
        },
        "&:before": {
            content: '""',
            border: '1px solid white',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '20px',
            width: '20px',
            zIndex: 4,
            backgroundColor: 'white',
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 100% 0, 0 100%, 0 100%, 0 100%, 0 0)',
        },
    },
    innerCard: {
        width: "50%",
        height: "50%",
        borderRadius: "50%",
        overflow: "hidden",
        opacity: "0.5",
        border: "1px solid white",
        filter: 'blur(2px)',
        transition: "500ms ease",
        "&:hover": {
            transition: "500ms ease",
            filter: "blur(0px)"
        }
    },
    "@keyframes borderer": {
        "0%": {
            borderRight: "1px solid white"
        },
        "25%": {
            borderBottom: "1px solid white"
        },
        "50%": {
            borderLeft: "1px solid white"
        },
        "75%": {
            borderTop: "1px solid white"
        },
        "100%": {
            border: "1px solid white"
        },
    },

}))

const AboutCard = () => {
    const classes = useStyles()
    return (
        <div className={classes.card}>
            <div className={classes.innerCard}>
                <img style={{ width: "100%", height: "100%" }} src='../../svg/us.svg' />
            </div>
        </div>
    );
}

export default AboutCard;