
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { PUBLIC_URL } from '../../utils/utils';
import '../style/home.css'
import AboutCard from './cards/AboutCards';
const AboutUs = () => {
    const [activity, setActivity] = useState(false)

    function revealAbout() {
        var elemm = document.getElementById('about-graph');
        if (!elemm) return
        var elemTop = elemm.getBoundingClientRect().top;
        var elementVisible = 100;
        var windowHeight = window.innerHeight
        if (elemTop < windowHeight - elementVisible) {
            setActivity(true)
        } else {
            setActivity(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", revealAbout);
    }, [])


    return (
        <Box className='aboutUsWrapper' sx={{ width: "100%" }} >
            <Box className={'aboutUs'} sx={{ display: { xs: "none", md: "flex" } }}>
                <Box sx={{ width: { sm: "50%", md: "40%" } }} style={{ position: "relative", display: "flex", flexDirection: "column", height: "100vh", justifyContent: "space-evenly" }}>
                    <div className={'aboutHeader'} style={{ display: activity ? "block" : "none" }}>
                        <h1>درباره بیتداد</h1>
                        {/* <h5>Immersed in DeFi</h5> */}
                    </div>
                    <Box className={'textWrapper'} sx={{ bottom: "5%", transform: "translateY(50%)" }}>
                        <p>
                            گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span>، همواره با شناخت و تحلیل فرصت ها و تهدیدات
                            به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span> از هر طریق میپردازد.
                        </p>
                    </Box>
                    <Box style={{ top: "60%", position: "absolute", transform: "translateY(-50%)", width: "60%", zIndex: "2" }}>
                        <Box className={'aboutCardWrapper'}>
                            <AboutCard />
                            <AboutCard />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "column", height: "100vh", display: activity ? "flex" : "none", width: { sm: "10px", md: "100px" } }} style={{}} id='about-graph'>
                    <div className={'circle'} />
                    <div className={'line'} />
                    <div className={'square'} style={{ top: "60%", }}>
                        <div className={'liCircle'} />
                    </div>
                    <div className={'square'} style={{ bottom: "0", }}>
                        <div className={'liCircle'} />
                    </div>
                    <div className={'horizontalLine'} style={{ left: "50%", top: "60%", animationDelay: "1s" }} />
                    <div className={'horizontalLine'} style={{ right: "50%", bottom: "0", animationDelay: "1.5s", transform: "translateY(-10px)" }} />
                </Box>
                <Box sx={{ width: { sm: "50%", md: "40%" } }} style={{ position: "relative", display: "flex", alignItems: "flex-end", flexDirection: "column", height: "100vh", justifyContent: "space-evenly" }}>
                    <div className={'aboutUsImageHolder'}>
                        <img src={PUBLIC_URL('svg/us.svg')} style={{ width: "400px", height: "400px" }} />
                    </div>
                    <Box className={'textWrapper'} sx={{ top: "60%" }}>
                        <p>
                            گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span>، همواره با شناخت و تحلیل فرصت ها و تهدیدات
                            به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span> از هر طریق میپردازد.
                        </p>
                    </Box>
                    <Box style={{ bottom: 0, position: "absolute", transform: "translateY(50%)", width: "60%", zIndex: "2" }}>
                        <Box className={'aboutCardWrapper'}>
                            <AboutCard />
                            <AboutCard />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className={'aboutUsMobile'} sx={{ display: { xs: "flex", md: "none" } }}>
                <div className={'aboutHeader'} style={{ display: activity ? "block" : "none" }}>
                    <h1>درباره بیتداد</h1>
                </div>
                <Box className={'aboutCardsWrapperMobile'}>
                    <AboutCard />
                    <AboutCard />
                </Box>
                <Box className={'textWrapper'}>
                    <p>
                        گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span>، همواره با شناخت و تحلیل فرصت ها و تهدیدات
                        به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span> از هر طریق میپردازد.
                    </p>
                </Box>
                <Box className={'aboutCardsWrapperMobile'}>
                    <AboutCard />
                    <AboutCard />
                </Box>
                <Box className={'textWrapper'}>
                    <p>
                        گروه بیتداد با اتکا به تجربه و دانش تخصصی خود در حوزه فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span>، همواره با شناخت و تحلیل فرصت ها و تهدیدات
                        به پالایش اطلاعات پرداخته و از این طریق به تسهیل راههای تعامل هر فرد در جامعه با فعالیت های مالی <span style={{ color: "#64C5BA" }}>غیر متمرکز</span> از هر طریق میپردازد.
                    </p>
                </Box>

            </Box>
        </Box>

    );
}

export default AboutUs;