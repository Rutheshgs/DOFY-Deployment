import { ISEOModel } from '@/models/SEO.Model';
import Head from 'next/head';
import Script from 'next/script'

type PageProps = {
    metaTags: ISEOModel,
    language: "in_en" | "ae_en" | "ae_ar",
    environment: "production" | "testing" | any,
    pageName?: "Order-summary"
}

function MetaTags({ metaTags, environment, language, pageName }: PageProps) {
    let gTagCode = language === "in_en" ? 'G-MNTQP747J8' : 'G-PQ6HMT31EV';
    let orderSummaryGTagCode = language === "in_en" ? 'AW-10905691303/KN7WCKqIsMwYEKfJntAo' : 'AW-10905691303/E6nKCN-VpMwYEKfJntAo';

    return (
        <>
            <Head>
                <title>{metaTags?.Title}</title>
                <meta name="description" content={metaTags?.Description} />
                <meta name="keywords"
                    content={metaTags?.Keywords} />
                <meta name="twitter:card" content={metaTags?.TwitterCard} />
                <meta name="twitter:site" content={metaTags?.TwitterSite} />
                <meta name="twitter:title" content={metaTags?.TwitterTitle} />
                <meta name="twitter:description" content={metaTags?.TwitterDescription} />
                <meta name="twitter:image" content={metaTags?.TwitterImage} />
                <meta property="og:title" content={metaTags?.OGTitle} />
                <meta property="og:type" content={metaTags?.OGType} />
                <meta property="og:url" content={metaTags?.OGUrl} />
                <meta property="og:image" content={metaTags?.OGImage} />
                <meta property="og:description" content={metaTags?.OGDescription} />
            </Head>
            {environment === "production" &&
                <>

                    {language === "in_en" ?
                        <meta name="google-site-verification" content="e1KuNB3Ra89OIW6XF2otJtjEvUet9fC8ORoZTiIOj5E" />
                        :
                        <meta name="google-site-verification" content="Vpwo0aQnfbLK-ubRq2KLTcFiEZoJXwMhYki7S9i_Wi0" />
                    }
                    <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gTagCode}`} />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            gtag('js', new Date());                        
                        
                            gtag('config', '${gTagCode}');                           
                           `}} />
                    {(pageName == "Order-summary") &&
                        <>
                            <Script async src={`https://www.googletagmanager.com/gtag/js?id=AW-1090569130`} />
                            <script dangerouslySetInnerHTML={{
                                __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag() { dataLayer.push(arguments); }
                            gtag('js', new Date());
                        
                            gtag('config', 'AW-1090569130');                            
                           `}} />
                            <script dangerouslySetInnerHTML={{
                                __html: `
                                gtag('event', 'conversion', { 'send_to': '${orderSummaryGTagCode}' });
                                `}} />
                        </>
                    }
                </>
            }
        </>

    )
}

export default MetaTags