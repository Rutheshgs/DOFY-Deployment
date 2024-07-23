import { useEffect } from 'react';
import { Direction, SSRDetection, getUserLanguage, getUserLocationForParam } from '@/components/helper/Helper';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import MetaTags from '@/components/metatags/MetaTags';
import SEOServices from '@/services/SEO.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';
import { ISEOModel } from '@/models/SEO.Model';

type InitialLoad = {
    direction: string,
    language: any
    metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<InitialLoad> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();

    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let metaTagsRes = await SEOServices.GetSEOList(HelperConstant.metaPages.Home, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsRes.status === 200 && metaTagsRes.data);

    return { direction, language, metaTags }
}

function index({ direction, language, metaTags }: InitialLoad) {

    let router = useRouter();

    useEffect(() => {
        router.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}`)
    }, []);

    return (
        <MetaTags metaTags={metaTags} language={language} environment={process.env.NEXT_PUBLIC_ENV} />
    )
}

export const getServerSideProps: GetServerSideProps<InitialLoad> = async (context) => {

    const { direction, language, metaTags } = await fetchData(context);
    return { props: { direction, language, metaTags } }

}

export default index