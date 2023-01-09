import React from "react";
import { Helmet } from "react-helmet";
import { BG_URL, PUBLIC_URL } from "../../utils/utils";
import Group from "./Group";
export default function AboutUs() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>درباره ما</title>
        <link rel="canonical" href="http://aqua.ir/about-us" />
      </Helmet>
      <div style={{
        position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
        backgroundImage: BG_URL(PUBLIC_URL('images/bg.png')),
        backgroundSize: 'auto 100%',
        backgroundPosition: 'center',
        zIndex: 0,
      }}>
      </div>
      <div style={{
        position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
        zIndex: 0,
      }}>
      </div>
      {/* <ReactPageScroller> */}
      <Group />
      {/* <Stuff />
      </ReactPageScroller> */}
    </>
  );
}
