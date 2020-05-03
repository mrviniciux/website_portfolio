// pages/_app.js
import React from "react";
import Head from 'next/head'
import "../components/components.scss";
import 'antd/dist/antd.css';
import '../css/antd.less'



// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return (
    <div>
    <Head>
      <title>Mr.Viniciux</title>
      <meta charSet="UTF-8"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
      <meta name="description" content="Frontend developer in Blumenau - SC - Brazil"></meta>


      <meta property="og:title" content="mrviniciux"/>
      <meta property="og:description" content="Frontend developer in Blumenau - SC - Brazil"/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="/static/images/profile.png"/>

      <meta name="twitter:title" content="mrviniciux.me"/>
      <meta name="twitter:description" content="Frontend developer in Blumenau - SC - Brazil"></meta>
      <meta name="twitter:image" content="/static/images/profile.png"></meta>

    </Head>
    <Component {...pageProps} />
  </div>
    
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;