
import Navbar from '../navbar/Navbar';
import Footer from '../comps/Footer';
import '../style/home.css'
import { Box } from '@mui/material';

const PrivacyPolicy = () => {
    return (
        <>
            <Navbar />
            <div className="containeer">
                <main className="main" style={{ marginTop: "100px" }}>
                    <div className={"mainBorderShape"}>
                        <h4>قوانین حریم خصوصی</h4>
                        <Box sx={{ display: "flex", flexWrap: "wrap", width: { xs: "90vw", md: "70vw" }, direction: "rtl", textAlign: "justify" }}>
                            <br />

                            بیتداد با تاکید بر احترامی که برای حریم شخصی کاربران قائل است، برای سفارش، ثبت نظر یا استفاده از برخی امکانات وب سایت اطلاعاتی را از کاربران درخواست می‌کند تا بتواند خدماتی امن و مطمئن را به کابران ارائه دهد. برای نمونه می‌توان به اطلاعاتی مانند ایمیل، شماره همراه، نام و ... اشاره نمود. لازم به ذکر است تمام مکاتبات بیتداد از طریق ایمیل و شماره همراهی که مخاطب در پروفایل خود ثبت می‌کند صورت می‌گیرد.

                            حفظ و نگهداری رمز عبور بر عهده مخاطب می‌باشد و لذا برای جلوگیری از هرگونه سوء استفاده احتمالی، کاربران نباید آن اطلاعات را برای شخص دیگری فاش کنند. بیتداد هویت شخصی مخاطبان را محرمانه می‌داند و اطلاعات شخصی آنان را به هیچ شخص یا سازمان دیگری منتقل نمی‌کند.

                            بیتداد برای حفاظت و نگهداری اطلاعات و حریم شخصی کاربران همه توان خود را به کار می‌گیرد و امیدوار است که تجربه‌ی خریدی امن، راحت و خوشایند را برای همه مخاطبان فراهم آورد.
                        </Box>
                    </div>
                </main>
            </div>
            <Footer />
        </>

    );
}

export default PrivacyPolicy;