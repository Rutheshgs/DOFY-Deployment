import "./TermsOfUse.css";
import Language from "./TermsOfUseLanguage.json";
import { GetServerSideProps } from 'next';
import LegalTerms from '@/components/legalterms/LegalTerms';
import { useTypedDispatch, useTypedSelector } from "@/features/reduxhooks/ReduxHooks";
import Footer from '@/components/footer/Footer';
import ContactUsServices from "@/services/ContactUs.Services";
import { Direction, IOSDevice, SSRDetection, androidDevice, capacitorDevice, getUserLanguage } from "@/components/helper/Helper";

import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { HelperConstant } from "@/components/helper/HelperConstant";
import { useEffect, useState } from "react";
import { modelChanger } from "@/features/reducers/login/LoginModel.Reducer";

type TermsOfUse = {
  address: any,
  direction: string,
  language: "in_en" | "ae_en" | "ae_ar",
  metaTags: ISEOModel
}

const fetchData = async (context: any): Promise<TermsOfUse> => {
  let direction = context ? SSRDetection(context, "dir") : Direction();
  let language = context ? SSRDetection(context, "lan") : getUserLanguage();
  let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

  let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
  let address = await (addressRes.status === 200 && addressRes.data);

  let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.TermsOfUse, header.LanguageCode, header.CountryCode);
  let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

  return { address, direction, language, metaTags }
}



function TermsOfUse({ direction, language, address, metaTags }: TermsOfUse) {

  let dataLocalization = Language[language];
  let dispatch = useTypedDispatch();
  const { NEXT_PUBLIC_SSR } = process.env;

  const [termsofusedata, setTermofuseData] = useState<TermsOfUse>({
    address, direction, language, metaTags,
  });

  useEffect(() => {
    if (NEXT_PUBLIC_SSR == 'false') {
      fetchData("").then(res => {
        setTermofuseData({
          address: res.address,
          direction: res.direction,
          language: res.language,
          metaTags: res.metaTags,
        });
      });
    }
  }, []);

  useEffect(() => {
    dispatch(modelChanger(false));
  }, [dispatch]);

  return (
    <ion-app>
      <MetaTags metaTags={termsofusedata.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={termsofusedata.language} />
      <ion-content>
        <ion-grid dir={termsofusedata.direction} style={{ background: '#fff' }}>
          <ion-row>
            <ion-col size='12' class='ion-text-center mt-3'>
              <ion-text class='tc_title-style'>{dataLocalization.Terms_and_Condition}</ion-text>
            </ion-col>
            <ion-col size='12'>
              <LegalTerms language={termsofusedata.language} />
            </ion-col>
            <ion-col size='12' class='tu-text tu-grid '>
              <ion-row>
                <ion-col size='12'>
                  <ion-item lines='none' class='tu-text'>
                    <ion-label><b> {dataLocalization.Terms_of_Use}</b>
                    </ion-label>
                  </ion-item>
                  <ion-item lines='none' class='tu-text'>
                    <ion-label>
                      {dataLocalization.Please_take_a_moment}
                    </ion-label>
                  </ion-item>
                  <ion-list class='tu-list'>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Dofy_electronics}</b><br />{dataLocalization.Dofy_electronics_and_solution}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Eligibilty}</b><br />{dataLocalization.Eligibility_you_must}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Ownership}</b><br />{dataLocalization.Ownership_Certification}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Quotations}</b><br />{dataLocalization.Quotations_and_Offers}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Acceptance}</b><br />{dataLocalization.Acceptance_of_Quotes}</ion-label>
                    </ion-item>
                    <ul>
                      <li> <ion-item lines='none' class='sub-points'>
                        <ion-label>{dataLocalization.Required}<br />{dataLocalization.Required_Documents}</ion-label>
                      </ion-item></li>
                      <li> <ion-item lines='none' class='sub-points'>
                        <ion-label>{dataLocalization.Lawful}<br />{dataLocalization.Lawful_Sales}</ion-label>
                      </ion-item></li>
                      <li><ion-item lines="none" class='sub-points'>
                        <ion-label>{dataLocalization.Data}<br />{dataLocalization.Data_Erasure}</ion-label>
                      </ion-item></li>
                      <li> <ion-item lines='none' class='sub-points'>
                        <ion-label>{dataLocalization.Returns}<br />{dataLocalization.No_Returns}</ion-label>
                      </ion-item></li>
                      <li><ion-item lines='none' class='sub-points'>
                        <ion-label>{dataLocalization.Gifted}<br />{dataLocalization.Gifted_Products}</ion-label>
                      </ion-item></li>
                    </ul>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Modification}</b><br />{dataLocalization.Modification_of_Agreement}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Agreement}</b><br />{dataLocalization.Agreement_Updates}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Effective} </b><br />{dataLocalization.Effective_Modifications}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Transaction}</b><br />{dataLocalization.Transaction_Cancellation}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Legal_and_Authorized}</b><br />{dataLocalization.Legal_and_Authorized_Use}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Service}</b><br />{dataLocalization.Service_Availability}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label>{dataLocalization.We_encourage_you_to_carefully}</ion-label>
                    </ion-item>
                    <ion-item lines="none" class='tu-text'>
                      <ion-label><b>{dataLocalization.Thank_you_for_choosing}</b></ion-label>
                    </ion-item>
                  </ion-list>
                </ion-col>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-grid>
        {capacitorDevice() &&
          (termsofusedata.address.Address) &&
          <Footer address={termsofusedata.address} direction={termsofusedata.direction} language={termsofusedata.language} />
        }
      </ion-content>
    </ion-app>
  )
}

export const getServerSideProps: GetServerSideProps<TermsOfUse> = async (context) => {
  // const { NEXT_PUBLIC_SSR } = process.env;

  // let direction = "";
  // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
  // let address = {} as any;
  // let metaTags = {} as ISEOModel;

  // if (NEXT_PUBLIC_SSR == 'true') {
  const { address, direction, language, metaTags } = await fetchData(context);
  return { props: { address, direction, language, metaTags } }
  // }

  // return { props: { address, direction, language, metaTags } }

}

export default TermsOfUse