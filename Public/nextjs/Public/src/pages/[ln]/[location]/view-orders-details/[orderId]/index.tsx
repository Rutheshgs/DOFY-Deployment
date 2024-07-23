import React from 'react'
import OrderSummary from '../../order-summary/[orderId]'
import { ISellOrderModel } from '@/models/order/sell/SellOrder.Model'
import { GetServerSideProps } from 'next'
import SellOrderServices from '@/services/order/sell/SellOrder.Services'
import { IStatusModel } from '@/models/StatusModel'
import MasterServices from '@/services/Master.Services'
import { HelperConstant } from '@/components/helper/HelperConstant'
import MetaTags from '@/components/metatags/MetaTags'
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { Direction, SSRDetection, findWindow, getUserLanguage } from '@/components/helper/Helper'
import ContactUsServices from '@/services/ContactUs.Services'

class OrderSummaryData {
    address: { Address: string, Email: string, Phone: string, PromotionLinks: { faceBook: string, instagram: string, linkedIn: string, tikTok: string, youTube: string, Twitter: string } } =
        {
            Address: "", Email: "", Phone: "",
            PromotionLinks: {
                faceBook: "",
                instagram: "",
                linkedIn: "",
                youTube: "",
                tikTok: "",
                Twitter: ""
            }
        };
    direction: string = "";
    language: "in_en" | "ae_en" | "ae_ar" = "in_en";
    orderSummary!: ISellOrderModel;
    orderPathName!: boolean;
    Status!: Array<IStatusModel>;
    metaTags: ISEOModel = {} as ISEOModel
}

const fetchData = async (context: any): Promise<OrderSummaryData> => {
    let direction = context ? SSRDetection(context,"dir"): Direction();
    let language = context ? SSRDetection(context,"lan") : getUserLanguage();
    let orderId = context ? context.query.orderId : findWindow() && window.location.pathname.split('/').at(-1)?.toString();
    let orderPathName = context ? context.resolvedUrl.includes('/view-orders-details') : findWindow() && window.location.pathname.includes('/view-orders-details');
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let orderSummaryRes = await SellOrderServices.GetOrderSummary(orderId, header.LanguageCode, header.CountryCode);
    let orderSummary = await (orderSummaryRes.status === 200 && orderSummaryRes.data);

    let statusData = await MasterServices.GetAllStatus(HelperConstant.serviceTypeId.SELL);
    let Status = await (statusData.status === 200 && statusData.data);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.ViewOrderDetails, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { address, direction, language, orderSummary, orderPathName, Status, metaTags }
}

export const getServerSideProps: GetServerSideProps<OrderSummaryData> = async (context) => {

    // const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let orderPathName = false;
    // let orderSummary = {} as ISellOrderModel;
    // let Status = [] as any;
    // let address = {} as any;
    // let metaTags = {} as ISEOModel;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { address, direction, language, orderSummary, orderPathName, Status, metaTags } = await fetchData(context);
    return { props: { address, direction, language, orderSummary, orderPathName, Status, metaTags } }
    // }

    // return { props: { address, direction, language, orderSummary, orderPathName, Status, metaTags } }
}

function ViewOrders({ direction, language, orderSummary, orderPathName, Status, metaTags, address }: OrderSummaryData) {
    return (
        <OrderSummary direction={direction} language={language} orderSummary={orderSummary} orderPathName={orderPathName} Status={Status} metaTags={metaTags} address={address} />
    )
}

export default ViewOrders