import React from 'react'
import DevicesDetails from '../../sell-device-details/[orderId]';
import { GetServerSideProps } from 'next';
import SellOrderServices from '@/services/order/sell/SellOrder.Services';
import { HelperConstant } from '@/components/helper/HelperConstant';

import SEOServices from '@/services/SEO.Services';
import { ISEOModel } from '@/models/SEO.Model';
import { Direction, SSRDetection, findWindow, getUserLanguage } from '@/components/helper/Helper';
import ContactUsServices from '@/services/ContactUs.Services';

type pendingprops = {
  direction: string,
  language: "in_en" | "ae_en" | "ae_ar",
  orderList: any,
  isPendingOrderDetail: boolean
  ReEvaluteOrder: any,
  metaTags: ISEOModel
  address: any;
}

const fetchData = async (context: any): Promise<pendingprops> => {
  let direction = context ? SSRDetection(context, "dir") : Direction();
  let language = context ? SSRDetection(context, "lan") : getUserLanguage();
  let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };
  let Id = context ? context.query.orderId : findWindow() && window.location.pathname.split('/').at(-1)?.toString();
  let isPendingOrderDetail = context ? context.resolvedUrl.includes('/pending-order-detail') : findWindow() && window.location.pathname.includes('/pending-order-detail');

  let ReEvaluteOrderRes = await SellOrderServices.ReEvaluteOrder(Id, header.LanguageCode, header.CountryCode);
  let ReEvaluteOrder = await (ReEvaluteOrderRes.status === 200 && ReEvaluteOrderRes.data);

  let orderListRes = await SellOrderServices.GetOrderSummary(Id, header.LanguageCode, header.CountryCode);
  let orderList = await (orderListRes.status === 200 && orderListRes.data);

  let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
  let address = await (addressRes.status === 200 && addressRes.data);

  let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.PendingOrder, header.LanguageCode, header.CountryCode);
  let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

  return { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address }
}

export const getServerSideProps: GetServerSideProps<pendingprops> = async (context) => {

  // const { NEXT_PUBLIC_SSR } = process.env;

  // let direction = "";
  // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
  // let ReEvaluteOrder = [] as any;
  // let orderList = [] as any;
  // let isPendingOrderDetail = true;
  // let metaTags = {} as ISEOModel;
  // let address = {} as any;

  // if (NEXT_PUBLIC_SSR == 'true') {
    const { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } = await fetchData(context);
    return { props: { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } }
  // }

  // return { props: { direction, language, metaTags, ReEvaluteOrder, orderList, isPendingOrderDetail, address } }
}

function PendingOrder({ language, direction, orderList, isPendingOrderDetail, ReEvaluteOrder, metaTags, address }: pendingprops) {
  return (
    <DevicesDetails direction={direction} language={language} orderList={orderList} address={address} isPendingOrderDetail={isPendingOrderDetail} ReEvaluteOrder={ReEvaluteOrder} metaTags={metaTags} />
  )
}

export default PendingOrder
