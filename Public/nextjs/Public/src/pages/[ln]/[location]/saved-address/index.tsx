import AddressHome from "@/components/address/home/AddressHome";
import Footer from '@/components/footer/Footer';
import { Direction, SSRDetection, capacitorDevice, getCookiesFromServer, getLocalStorage, getUserLanguage } from "@/components/helper/Helper";
import ContactUsServices from "@/services/ContactUs.Services";
import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import { HelperConstant } from "@/components/helper/HelperConstant";
import UserAddressServices from "@/services/UserAddress.Services";
import { IAddressModel } from "@/models/Address.Model";
import { useEffect, useState } from "react";

type AddressProps = {
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    address: any,
    metaTags: ISEOModel
    addressHome: Array<IAddressModel>,
    personId: any,
}

const fetchData = async (context: any): Promise<AddressProps> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };
    let personId = getCookiesFromServer(context.req).personId ?? getLocalStorage().PersonId;

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let AddressHomeRes = await UserAddressServices.GetPersonAddress(personId, header.LanguageCode, header.CountryCode);
    let addressHome = await (AddressHomeRes.status === 200 && AddressHomeRes.data.Items);

    let metaTagsRes = await SEOServices.GetSEOList(HelperConstant.metaPages.SavedAddress, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsRes.status === 200 && metaTagsRes.data);

    return { language, direction, address, metaTags, addressHome, personId }
}

function Address({ language, direction, address, metaTags, addressHome, personId }: AddressProps) {

    const [addressData, setAddressData] = useState({ language, direction, address, metaTags, addressHome, personId });
    const { NEXT_PUBLIC_SSR } = process.env;

    useEffect(() => {
        // if (NEXT_PUBLIC_SSR == 'false') {
        fetchData("").then(res => {
            setAddressData({
                address: res.address,
                direction: res.direction,
                language: res.language,
                metaTags: res.metaTags,
                personId: res.personId,
                addressHome: res.addressHome
            });
        });
        // }
    }, []);

    return (
        <ion-app data-aos="fade-down">
            <MetaTags metaTags={addressData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={addressData.language} />
            <ion-content>
                <ion-row class='slot-row slot-padding-adjustment' style={{ background: "white" }}>
                    <ion-col size-lg="12" size-xs="12" class="ion-padding-top">
                        {addressData.addressHome &&
                            <AddressHome direction={addressData.direction} language={addressData.language} addressHome={addressData.addressHome} personId={addressData.personId} />
                        }
                    </ion-col>
                </ion-row>
                {capacitorDevice() &&
                    (addressData.address?.Address) &&
                    <Footer address={addressData.address} direction={addressData.direction} language={addressData.language} />
                }
            </ion-content>
        </ion-app>
    )
}

// export const getServerSideProps: GetServerSideProps<AddressProps> = async (context) => {

//     // const { NEXT_PUBLIC_SSR } = process.env;

//     // let direction = "";
//     // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
//     // let address = {};
//     // let metaTags = {} as ISEOModel;
//     // let personId = "";
//     // let addressHome = [] as any

//     // if (NEXT_PUBLIC_SSR == 'true') {
//     const { language, direction, address, metaTags, addressHome, personId } = await fetchData(context);
//     return { props: { language, direction, address, metaTags, addressHome, personId } }
//     // }

//     // return { props: { language, direction, address, metaTags, addressHome, personId } }

// };

export default Address