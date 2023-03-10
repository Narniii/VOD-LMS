import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BG_URL, PUBLIC_URL } from "../../../utils/utils";

const useStyles = makeStyles((theme) => ({
    scrollableWrapper: {
        width: '97%',
        margin: '10px',
        overflow: "scroll",
        '&::webkit-scrollbar': {
            display: "none",
        },
    },
    certifContainer: {
        backgroundColor: 'white',
        height: '600px',
        border: '3px solid #64c5ba',
        borderRadius: 0,
        padding: '20px',
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            width: "800px",
        },
    },
    firstSection: {
        display: 'flex',
        flexDirection: 'row',
    },
    badgeContainer: {
        flex: 10
    },
    dateContainer: {
        flex: 2,
        marginTop: '20px'
    },
    title: {
        color: 'black',
        fontSize: '30px',
        borderBottom: '3px solid #64c5ba',
        width: '40%',
        margin: '20px auto',
        textAlign: 'center'
    },
    paragraph: {
        textAlign: 'justify',
        textJustify: 'inter - word',
        color: 'black',
        width: '90%',
        margin: '0 auto'
    },
    aquaContainer: {
        position: 'absolute',
        padding: '10px 40px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    aquaDetailsContainer: {
        alignSelf: 'center',
    },
    aquaLogoContainer: {
    },
    aquaImagesEmza: {
        display: 'block',
        width: "50%",
        position: 'relative'
    },
    aquaImagesMohr: {
        display: 'block',
        width: "25%",
        position: 'absolute',
        top: 20,
        right: 80,
        zIndex: 10
    },
    subDescription: {
        fontSize: '12px',
        color: 'black'
    }
}))
export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { firstName, lastname, ssid, courseTitle, date, id } = props
    const classes = useStyles();
    return (
        <div ref={ref}>
            <div className={classes.scrollableWrapper}>
                <div className={classes.certifContainer}>
                    <div className={classes.firstSection}>
                        <div className={classes.badgeContainer}>
                            <img style={{ width: '10%' }} src={PUBLIC_URL('images/academy/badgepng.png')} />
                        </div>
                        <div className={classes.dateContainer}>
                            <div className="text-dark">??????????:{id}</div>
                            <div className="text-dark">??????????:{date} </div>
                        </div>
                    </div>

                    <div className={classes.secondSection}>
                        <div className={classes.logoContainer}>
                            <div className="text-center">
                                <img style={{ width: '25%' }} src={PUBLIC_URL('images/academy/logoaqua.png')} />
                            </div>
                        </div>
                    </div>

                    <div className={classes.title}>
                        <b>?????????????????? ?????????? ????????</b>
                    </div>

                    <div className={classes.FourthSection}>
                        <div className={classes.paragraph}>
                            ?????????? ?????????? ?????????? ????????????
                            &nbsp;<b>{firstName}&nbsp;{lastname}</b>&nbsp;
                            ???? ?????????? ??????
                            &nbsp;<b>{ssid}</b>&nbsp;
                            ???? ??????????
                            &nbsp;<b>{date}</b>&nbsp;
                            ???????? ???? ?????????????? ???????? ??
                            &nbsp;<b>{courseTitle}</b>&nbsp;
                            ???? ???????????? ????????????  ???????????? ??????.??????
                            <br></br>
                            <br></br>
                            <div className={classes.subDescription}>
                                *?????? ?????????? ???????? ???? ?????????? ?????????? ???? ???????? ?? ???????????? ?????? ???? ???????????? ???????????? ???????????? ???????? ???????????? ??????.
                            </div>
                        </div>
                    </div>
                    <div className={classes.aquaContainer}>
                        <div className={classes.aquaLogoContainer}>
                            <img className={classes.aquaImagesEmza} src={PUBLIC_URL('images/academy/mehdi/mehdi-sign2.png')} />
                            <img className={classes.aquaImagesMohr} src={PUBLIC_URL('images/academy/mehdi/mohr5.png')} />
                        </div>
                        <div className={classes.aquaDetailsContainer}>
                            <div className="text-dark">www.aqua.ir</div>
                            <div className="text-dark" >02144207988</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});  