import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet'
import ScreenRouter from './ScreenRouter'
import { useSelector, useDispatch } from 'react-redux';
import { getuser } from '../../redux/actions';
import "./App.css"
export default function App() {
  const dispatch = useDispatch();
  const fetchUser = () => dispatch(getuser());
  useEffect(() => {
    fetchUser();
  }, []);
  // *********************note : redux provider is used in index.js***************************
  return (
    <>
      <ScreenRouter />
      <Helmet>
        <title>بیتداد</title>
        <meta name="keywords" content="بیتداد,aqua,pourdad,Decentralized finance,decentral,decentral land,blockchain,tether,erc20,,erc721,Non-fungible token,nft,UStether,Defi,Crypto,Crypto currency,Crypto currencies,bitcoin,btc,bnb,binance,bsc,binance smart chain,cake,pancake,pancakeSwap,solana,ethereum,doge,doge coin,shiba,shiba inu.shiba token,investment,bep2,bep20,profit,asset management,asset" />
        <meta name="keywords" content="صرافی غیر متمرکز, توکن, ارز دیجیتالی, ارز دیجیتال, کریپتو کارنسی, کریپتو, بایننس اسمارت چین, بلاکچین, اسمارت چین, بلاک چین, بیت کوین, داج کوین, دوج کوین, شیبا کوین, شیبا توکن, سولانا, اتریوم, تتر, صرافی, صرافی متمرکز, erc-20, erc-721, ERC-20, ERC-721,nft, توکن مثلی, توکن غیر مثلی, none-fungible-token, دیسنترالند, مدیریت دارایی, اقتصاد, سبدگردانی" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="%PUBLIC_URL%/images/icon.png" />
        <meta
          name="twitter:title"
          content="بیتداد"
        />
        <meta
          name="twitter:description"
          content="گروه بیتداد در سال ۱۳۹۹ توسط محمد مهدی پورداد تاسیس شد. اولین اقدام، تاسیس «صرافی رمزارز ها» برای مشترکین بود که در ادامه با توسعه ی تراکنش ها، این خدمت توسط شرکت های همکار صورت میگیرد. گام بعدی، آموزش و انتقال مفاهیم در امور رمزنگاری، در «قالب آکادمی» بیتداد بود. سپس در فاز «تبدیل دانش به سرمایه»، با بررسی فرصت ها و تهدیدات سرمایه گذاری در بازار رمزارز ها، موفق شد سبد سرمایه ای با ارزش بالا را بدست آورده، و با مدیریت فعال، آنرا توسعه دهد. در ادامه، گروه بیتداد به همراه تیم فنی خود تصمیم به «توسعه ی اپلیکیشن های وب۳ و محصولات نرم‌افزاری بر بستر بلاکچین» گرفت. و پس از آن با «ایجاد یک متاورس» جدید و در موازات، انجام تمام امور مربوط به «توکن های غیر مثلی (NFT)» به ادامه ی مسیر می پردازد."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="www.aqua.ir" />
        <meta
          property="og:title"
          content="بیتداد"
        />
        <meta
          property="og:description"
          content="گروه بیتداد در سال ۱۳۹۹ توسط محمد مهدی پورداد تاسیس شد. اولین اقدام، تاسیس «صرافی رمزارز ها» برای مشترکین بود که در ادامه با توسعه ی تراکنش ها، این خدمت توسط شرکت های همکار صورت میگیرد. گام بعدی، آموزش و انتقال مفاهیم در امور رمزنگاری، در «قالب آکادمی» بیتداد بود. سپس در فاز «تبدیل دانش به سرمایه»، با بررسی فرصت ها و تهدیدات سرمایه گذاری در بازار رمزارز ها، موفق شد سبد سرمایه ای با ارزش بالا را بدست آورده، و با مدیریت فعال، آنرا توسعه دهد. در ادامه، گروه بیتداد به همراه تیم فنی خود تصمیم به «توسعه ی اپلیکیشن های وب۳ و محصولات نرم‌افزاری بر بستر بلاکچین» گرفت. و پس از آن با «ایجاد یک متاورس» جدید و در موازات، انجام تمام امور مربوط به «توکن های غیر مثلی (NFT)» به ادامه ی مسیر می پردازد."
        />
        <meta
          property="og:image"
          content="%PUBLIC_URL%/images/icon.png"
        />
      </Helmet>
    </>
  )
}
