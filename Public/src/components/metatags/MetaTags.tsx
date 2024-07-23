import { useEffect, useLayoutEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SEOServices from '../../services/SEO.Services';
import { ISEOModel } from '../../models/SEO.Model';

type PageProps = {
    pageName: string
}

function MetaTags({ pageName }: PageProps) {

    const [metaTags, setMetaTags] = useState<ISEOModel>();

    let metaTagsNames = ["description", "keywords", "twitter:card", "twitter:site", "twitter:title", "twitter:description",
        "twitter:image"]

    let metaTagsProperty = ["og:title", "og:type", "og:url", "og:image", "og:description"]

    const removeMetaTags = () => {
        for (let res of metaTagsProperty) {
            let existedMetaProperty = document.querySelector(`meta[property="${res}"]`)
            if (existedMetaProperty)
                document.querySelector(`meta[property="${res}"]`)?.remove();
        }

        let existedMetaNameTag = document.querySelectorAll(`meta`);
        if (existedMetaNameTag.length > 0) {
            existedMetaNameTag.forEach(item => {
                if (metaTagsNames.includes(item.name)) {
                    item?.remove();
                }
            });
        }
        getMetaTags();
        addProductionMetaTags();
    }

    const getMetaTags = () => {
        SEOServices.GetSEOList(pageName).then(res => {
            if (res.status == 200) {
                setMetaTags(res.data);
                setTimeout(() => {
                    removeMetaTagsAttr();
                }, 200);
            }
        }).catch(e => console.log(e));
    }

    const removeMetaTagsAttr = () => {
        const selectedMetaTags = document.querySelectorAll('meta');

        selectedMetaTags.forEach((item) => {
            if (item.hasAttribute('data-react-helmet'))
                item.removeAttribute('data-react-helmet')
        });
    }

    const addProductionMetaTags = () => {
        if (process.env.REACT_APP_ENV==='production') {

        }
    }

    useLayoutEffect(() => {
        removeMetaTags();
    }, []);

    return (
        metaTags?.Title ?
            <Helmet>
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
                {process.env.REACT_APP_ENV==='production' && 
                    <meta name='google-site-verification' content='CojqX2FveQKKP3bedMnZ0209TF7n0VhIm8SisEn7uqs' />
                }                
            </Helmet>
            : <></>
    )
}

export default MetaTags