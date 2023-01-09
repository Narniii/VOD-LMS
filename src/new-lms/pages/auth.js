import SignUp from '../comps/SignUp';
import Login from '../comps/Login';
import { useState } from 'react';
import '../style/loginSignup.css'
import Box from '@mui/material/Box';
import StarLayout from '../ParticleLayout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';

const LoginSignup = () => {
    const [loginMode, setLoginMode] = useState(false)
    const handleChange = (value) => {
        if (value === 'login') {
            setLoginMode(true)
        } else {
            setLoginMode(false)
        }
    }

    return (
        <StarLayout>
            <div className={'containeeer'}>
                <main className={'mainn'}>
                    <Box className={'loginSignupWrapper'} sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
                        <Box className={'switchableView'} sx={{ width: { xs: "100%", md: "50%" }, height: { xs: "70%", md: "100%" }, left: { xs: undefined, md: loginMode ? 0 : '50%' }, top: { xs: loginMode ? 0 : '30%', md:0 } }}>
                            {loginMode ?
                                <>
                                    <Login handleChange={(value) => handleChange(value)} />
                                </>
                                :
                                <>
                                    <SignUp handleChange={(value) => handleChange(value)} />
                                </>
                            }
                        </Box>
                        {/* <Box className={'switchableViewMobile'} sx={{ display: { xs: 'flex', md: 'none' }, top: loginMode ? 0 : '50%' }}>
                            {loginMode ?
                                <>
                                    <Login handleChange={(value) => handleChange(value)} />
                                </>
                                :
                                <>
                                    <SignUp handleChange={(value) => handleChange(value)} />
                                </>
                            }
                        </Box> */}
                        <Box className={'switchableBackground'} sx={{ width: { xs: "100%", md: "50%" }, height: { xs: "30%", md: "100%" }, right: { xs: undefined, md: loginMode ? 0 : '50%' }, bottom: { xs: loginMode ? 0 : '70%', md: 0 } }}>
                            <Link to='/'>
                                <HomeOutlinedIcon sx={{ position: "absolute", color: "#64c5ba", left: 15, top: 15, zIndex: 1 }} />
                            </Link>
                            {loginMode ?
                                <>
                                    <h3>حساب کاربری ندارید ؟</h3>
                                    <button className={'loginSignupButton'} onClick={() => setLoginMode(false)}>عضویت</button>
                                </>
                                :
                                <>
                                    <h3>حساب کاربری دارید ؟</h3>
                                    <button className={'loginSignupButton'} onClick={() => setLoginMode(true)}>ورود</button>
                                </>
                            }
                        </Box>
                        {/* <Box className={'switchableBackgroundMobile'} sx={{ display: { xs: 'flex', md: 'none' }, bottom: loginMode ? 0 : '50%' }}>
                            <Link to='/'>
                                <HomeOutlinedIcon sx={{ position: "absolute", color: "#64c5ba", left: 15, top: 15, zIndex: 1 }} />
                            </Link>
                            {loginMode ?
                                <>
                                    <h3>حساب کاربری ندارید ؟</h3>
                                    <button className={'loginSignupButton'} onClick={() => setLoginMode(false)}>عضویت</button>
                                </>
                                :
                                <>
                                    <h3>حساب کاربری دارید ؟</h3>
                                    <button className={'loginSignupButton'} onClick={() => setLoginMode(true)}>ورود</button>
                                </>
                            } 
                        </Box> */}
                    </Box>
                </main>
            </div>
        </StarLayout>
    );
}

export default LoginSignup;

// LoginSignup.Layout = StarLayout;
