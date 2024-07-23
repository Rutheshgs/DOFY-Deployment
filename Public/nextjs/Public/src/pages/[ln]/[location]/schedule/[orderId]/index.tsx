import { useEffect, useRef, useState, useTransition } from "react";
import { caretBackOutline, caretForwardOutline, informationCircleOutline } from "ionicons/icons";
import { IAddressModel } from "@/models/Address.Model";
import MasterServices from "@/services/Master.Services";
import UserAddressServices from "@/services/UserAddress.Services";
import { ActionType } from "@/features/actiontypes/Input.ActionTypes";
import { InputParamChange } from "@/features/reducers/shared/InputParams.Reducers";
import { useTypedDispatch, useTypedSelector } from "@/features/reduxhooks/ReduxHooks";
import Language from "@/components/address/home/AddressHomeLanguage.json"
import Language1 from "@/components/timedataslot/TimeDataSlotLanguage.json"
import { Direction, ResponsiveItemPerView, SSRDetection, authUser, capacitorDevice, countrycodenumber, currencyByCountry, findBrowser, findWindow, getLocalStorage, getUserLanguage, getUserLocationForParam, isIn, toAmount } from "@/components/helper/Helper"
import { HelperConstant } from "@/components/helper/HelperConstant";
import "./ScheduleAddress.css";

import { ISellOrderModel } from "@/models/order/sell/SellOrder.Model";
import SellOrderServices from "@/services/order/sell/SellOrder.Services";
import AppointmentSlotMasterServices from "@/services/AppointmentSlotMaster.Services";
import moment from "moment";
import { IAppointmentModel } from "@/models/Appointment.Model";
import RefferalCodeServices from "@/services/RefferalCode.Services";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { IAppointmentSlotModel } from "@/models/AppointmentSlot.Model";
import { useRouter } from "next/dist/client/router";
import { GetServerSideProps } from "next/types";
import dynamic from 'next/dynamic';
import AddressForm from "@/components/address/form/AddressForm";

import MetaTags from '@/components/metatags/MetaTags';
import { ISEOModel } from '@/models/SEO.Model';
import SEOServices from '@/services/SEO.Services';
import Footer from "@/components/footer/Footer";
import ContactUsServices from "@/services/ContactUs.Services";

const OrderPayout = dynamic(() => import('@/components/orderpayout/OrderPayout').then(mod => mod.OrderPayout), { ssr: false });
const IonCol = dynamic(() => import("@ionic/react").then(mod => mod.IonCol), { ssr: false });
const IonCard = dynamic(() => import("@ionic/react").then(mod => mod.IonCard), { ssr: false });
const IonText = dynamic(() => import("@ionic/react").then(mod => mod.IonText), { ssr: false });
const Button = dynamic(() => import("@mui/material").then(mod => mod.Button), { ssr: false });
const IonButton = dynamic(() => import("@ionic/react").then(mod => mod.IonButton), { ssr: false });

const IonAlert = dynamic(() => import("@ionic/react").then(mod => mod.IonAlert), { ssr: false });


type ScheduleAddressData = {
    stateList: Array<any>,
    cityList: Array<any>,
    addressTypedata: Array<any>,
    personAddress: Array<any>,
    orderSummarydata: ISellOrderModel,
    direction: string,
    language: "in_en" | "ae_en" | "ae_ar",
    metaTags: ISEOModel
    address: any;
}

const fetchData = async (context: any): Promise<ScheduleAddressData> => {
    let direction = context ? SSRDetection(context, "dir") : Direction();
    let language = context ? SSRDetection(context, "lan") : getUserLanguage();
    let header = { LanguageCode: language?.slice(3), CountryCode: language?.slice(0, 2) };

    let orderId = context ? context.query.orderId : findWindow() && window.location.pathname.split('/').at(-1)?.toString();

    let stateListRes = await MasterServices.GetAllStateList(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let stateList = await (stateListRes.status === 200 && stateListRes.data);

    let cityListRes = await MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let cityList = await (cityListRes.status === 200 && cityListRes.data);

    let addressTypeRes = await MasterServices.GetAllAddressType(HelperConstant.serviceTypeId.SELL, header.LanguageCode, header.CountryCode);
    let addressTypedata = await (addressTypeRes.status === 200 && addressTypeRes.data);

    let addressRes = await ContactUsServices.getAddress(header.LanguageCode, header.CountryCode);
    let address = await (addressRes.status === 200 && addressRes.data);

    let orderSummaryRes = await SellOrderServices.GetOrderSummary(orderId, header.LanguageCode, header.CountryCode);
    let orderSummarydata = await (orderSummaryRes.status === 200 && orderSummaryRes.data);

    let personAddressRes = await UserAddressServices.GetPersonAddress(orderSummarydata.PersonId, header.LanguageCode, header.CountryCode);
    let personAddress = await (personAddressRes.status === 200 && personAddressRes.data.Items);

    let metaTagsData = await SEOServices.GetSEOList(HelperConstant.metaPages.Schedule, header.LanguageCode, header.CountryCode);
    let metaTags = await (metaTagsData.status === 200 && metaTagsData.data);

    return { stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address }
}

function ScheduleAddress({ stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address }: ScheduleAddressData) {

    let dataLocalization = Language[language];
    let dataLocalization1 = Language1[language];
    const { NEXT_PUBLIC_SSR } = process.env;

    const [scheduledData, setSchduleData] = useState({ stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address });

    SwiperCore.use([Autoplay]);

    const dispatch = useTypedDispatch();
    const router = useRouter();

    let id = router.query.orderId as string;
    const personId = getLocalStorage().PersonId;

    const addressId = useTypedSelector((state) => state.InputParamChangeReducer.AddressId);
    const rescheduleOrderId = useTypedSelector(state => state.OrdersReducer.orderId);
    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);
    const [removedId, setRemovedId] = useState<any>(0);
    const [searchText, setSearchText] = useState<any>("");
    const [filteredData, setfilteredData] = useState<Array<IAddressModel>>([]);
    const [defaultvalue, setDefaultValue] = useState<IAddressModel>({} as IAddressModel);
    const [defaultShow, setDefaultShow] = useState<boolean>(false);
    const [changesInAddress, setChangesInAddress] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isReferral, setIsReferral] = useState<boolean>(false);
    const [slotDate, setSlotDate] = useState<any>();
    const [slotSession, setSlotSession] = useState({ StartTime: "", EndTime: "", Id: 0 });
    const [slotList, setSlotList] = useState<Array<IAppointmentSlotModel>>([]);
    const [referralCodeMessage, setReferralCodeMessage] = useState<string>("");
    const [selectedAddressId, setSelectedAddressId] = useState(0);
    const [selectedAccordion, setSelectedAccordion] = useState<"address" | "slot">("address");
    const [muliticlick, setMultiClick] = useState<boolean>(false);

    const codeUsedInMultiOrders = "Pending order have Promo Code";
    const referralCodeIn = "NEW100";
    const referralCodeAe = "NEW50";

    const referralCode = scheduledData.language === "in_en" ? referralCodeIn : referralCodeAe;

    const currentDate = new Date();

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const addressHandler = (addressId: any, type: "view" | "edit") => {
        if (type === "view") {
            dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
            setIsEdit(false);
            filterAddresshandler(addressId);
        }
        if (type === "edit") {
            dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
            setIsEdit(true);
            filterAddresshandler(addressId);
        }
    }

    const RemoveAddressHandler = (addressId: any) => {
        UserAddressServices.remove(addressId).then(res => {
            if (res.status === 200)
                findWindow() && window.location.reload();
        }).catch((e: string) => {
            console.log(e)
        });
    }

    const filterAddresshandler = (id: any) => {
        let data = filteredData.find(x => x.Id == id) as IAddressModel;
        setDefaultValue(data);
        setTimeout(() => { setDefaultShow(false); }, 100);
        setTimeout(() => { setDefaultShow(true); }, 200);
    }


    const addNewAddressHandler = () => {
        setIsEdit(false);
        setDefaultValue({} as IAddressModel);
        setTimeout(() => { setDefaultShow(false); }, 100);
        setTimeout(() => { setDefaultShow(true); }, 200);
    }

    useEffect(() => {
        const searchFilter = (data: Array<IAddressModel>, searchString: string) => {
            if (searchText === "") {
                return setfilteredData(data);
            }
            var resultArray = Array<IAddressModel>();
            data.forEach((data, i) => {
                let strings = `${data?.Name} ${data.Address} ${data.Address1} ${data.LandMark} ${data.LocationPin} ${data.MobilePhone} ${data.PinCode}`;
                if (strings.toLowerCase().includes(searchText.toLowerCase())) {
                    return resultArray.push(data);
                }
            })

            setfilteredData(resultArray);
            return resultArray;
        }

        const getAddress = (personId: number, LanguageCode: any, CountryCode: any) => {
            UserAddressServices.GetPersonAddress(personId, LanguageCode, CountryCode).then(res => {
                if (res.status === 200)
                    searchFilter(res.data.Items, searchText);
                if (res.data.Items <= 0) {
                    setDefaultShow(true);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }

        if (NEXT_PUBLIC_SSR == 'false') {
            fetchData("").then(res => {
                setSchduleData({
                    direction: res.direction,
                    language: res.language,
                    metaTags: res.metaTags,
                    stateList: res.stateList,
                    cityList: res.cityList,
                    addressTypedata: res.addressTypedata,
                    personAddress: res.personAddress,
                    orderSummarydata: res.orderSummarydata,
                    address: res.address
                });
                setDefaultShow(defaultShow);
                getAddress(personId, '', '');
                searchFilter(res.personAddress, searchText);
            });
        }
        else if (personAddress.length <= 0) {
            setDefaultShow(true);
        }

        if (NEXT_PUBLIC_SSR == 'true') {
            setDefaultShow(defaultShow);
            getAddress(personId, '', '');
            searchFilter(personAddress, searchText);
        }

    }, [personId, searchText, defaultShow]);


    useEffect(() => {
        if (changesInAddress) {
            setSelectedAccordion("slot");
            setSelectedAddressId(addressId);
            selectSlot(addressId);
        }
        setChangesInAddress(changesInAddress);
    }, [changesInAddress]);

    useEffect(() => {
        dispatch(InputParamChange({ payload: 0, type: ActionType.ADDRESS_ID }));
        authUser();
    }, [dispatch]);

    const selectSlot = (addressId: any) => {
        dispatch(InputParamChange({ payload: addressId, type: ActionType.ADDRESS_ID }));
        getAppointmentSlotList(scheduledData.orderSummarydata.ProductTypeId, scheduledData.orderSummarydata.ServiceTypeId, false, addressId);
    }
    const getAppointmentSlotList = (productTypeId: number, serviceTypeId: number, isExpressPickup: boolean, userAddressId: number) => {
        AppointmentSlotMasterServices.GetAppointmentSlots(moment(currentDate).format('yyyy-MM-DD HH:mm'), productTypeId, serviceTypeId, isExpressPickup, userAddressId).then(res => {
            if (res.status === 200) {
                setSlotList(res.data);
                setSelectedAccordion("slot");
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const RemovePendingReferralsHandler = () => {
        RefferalCodeServices.RemoveReferralCode(referralCode, personId, 0).catch(e => {
            console.log(e);
        });
    }

    const routerHandler = () => {
        setReferralCodeMessage("");
        RemovePendingReferralsHandler();
        localStorage.removeItem("orderId");
    }

    const checkValidReferralCode = (orderId: any) => {
        RefferalCodeServices.GetReferralCode(referralCode, personId, parseInt(id)).then(res => {
            if (res.status === 200) {
                if (res.data.Message === codeUsedInMultiOrders) {
                    setReferralCodeMessage(res.data.Message);
                    setTimeout(() => {
                        routerHandler();
                        router.push(`/${getUserLanguage()}${getUserLocationForParam(scheduledData.language)}/order-summary/${orderId}`);
                    }, 3000);
                }
                else {
                    routerHandler();
                    router.push(`/${getUserLanguage()}${getUserLocationForParam(scheduledData.language)}/order-summary/${orderId}`);
                }
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const slotHandler = () => {
        let appointmentData: IAppointmentModel = {
            Id: 0,
            Created: "2022-04-13T14:40:43.424Z",
            CreatedBy: 0,
            Active: true,
            Modified: "2022-04-13T14:40:43.424Z",
            ModifiedBy: 0,
            ValidationErrors: {},
            OrderId: parseInt(id as any),
            AssigneeId: null,
            UserAddresId: addressId,
            AppointmentDate: slotDate,
            StartTime: slotSession.StartTime,
            EndTime: slotSession.EndTime,
            Remarks: "",
            TechnicianComments: "",
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: 0,
            address: ""
        };

        if (rescheduleOrderId === 0) {
            SellOrderServices.CreateAppointment(appointmentData).then(res => {
                if (res.status === 200) {
                    checkValidReferralCode(res.data);
                }
            }).catch((e: string) => {
                console.log(e)
            });
        }
        else {
            RescheduleOrder();
        }
        setMultiClick(true);

    }

    const RescheduleOrder = () => {
        let RescheduleOrderData: IAppointmentModel = {
            Id: 0,
            Created: "2022-04-13T14:40:43.424Z",
            CreatedBy: 0,
            Active: true,
            Modified: "2022-04-13T14:40:43.424Z",
            ModifiedBy: 0,
            ValidationErrors: {},
            OrderId: rescheduleOrderId,
            AssigneeId: null,
            UserAddresId: addressId,
            AppointmentDate: slotDate,
            StartTime: slotSession.StartTime,
            EndTime: slotSession.EndTime,
            Remarks: "",
            TechnicianComments: "",
            RowOrder: 0,
            IsReschedule: true,
            AppointmentCity: "",
            AppointmentPincode: 0,
            address: ""
        };

        SellOrderServices.Reschedule(RescheduleOrderData).then(res => {
            if (res.status === 200) {
                window.location.href = `/${getUserLanguage()}${getUserLocationForParam(scheduledData.language)}/view-orders`;
            }
        }).catch((e: string) => {
            console.log(e);
        });

    }

    const getSlots = (slotList: Array<IAppointmentSlotModel>) => {
        return <Swiper dir={scheduledData.direction} slidesPerView={ResponsiveItemPerView(2, 4, 3.5)} modules={[Navigation]} pagination={{ clickable: true }} rewind={false} navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
        }}>
            {slotList.filter((value, index, self) => index === self.findIndex((t) => (t.EventDate === value.EventDate)))
                .map((val, i) => (
                    <SwiperSlide key={i}>
                        <IonCard className={`slot-date-card  ${slotDate == val.EventDate && 'slot-date-card-selected'} ${moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") && 'slot-date-card-express'} `}
                            onClick={() => { setSlotDate(val.EventDate); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }) }}>
                            {moment(val.EventDate).format("MMM Do YY") === moment(currentDate).format("MMM Do YY") ?
                                <ion-card-header>
                                    <ion-text class="express-pickup">{dataLocalization1.Express_Pickup}</ion-text>
                                </ion-card-header>
                                :
                                <ion-card-header>
                                    <ion-text>{moment(val.EventDate).format('ddd')}</ion-text><br />
                                    <ion-text>{moment(val.EventDate).format('D')?.toString().padStart(2, "0")}</ion-text>
                                </ion-card-header>
                            }
                        </IonCard>
                    </SwiperSlide>
                ))}
        </Swiper>
    }

    return (
        <ion-app>
            <MetaTags metaTags={scheduledData.metaTags} environment={process.env.NEXT_PUBLIC_ENV} language={scheduledData.language} />
            <ion-content>
                <ion-grid class="sca-grid ad-padding-adjustment" dir={scheduledData.direction} data-aos="fade-down">
                    <ion-row class="ion-padding-top sa-margin">
                        {defaultShow &&
                            <>
                                <ion-col size-lg='0.5' size-xl='0.5' size-md='0' size-sm='0' size-xs='0'></ion-col>
                                <ion-col>
                                    <AddressForm isEdit={isEdit} isAddress={filteredData.length > 0} pageFrom={"ScheduleAddress"} setDefaultShow={setDefaultShow} setChangesInAddress={setChangesInAddress} defaultValues={defaultvalue} />
                                </ion-col>
                            </>
                        }
                        <IonCol size-lg="0.5" size-xl="0.5" size-md='0' size-sm='0' size-xs='0'></IonCol>

                        <IonCol size-xl="6" size-lg="6" size-xs="12" size-md="12" hidden={defaultShow} className="slot-orders-Col">

                            <ion-accordion-group value={selectedAccordion} onIonChange={(e) => { setSelectedAccordion(e.detail.value) }}>
                                <ion-accordion value="address" class='sa-address-choose-address'>
                                    <ion-item slot="header" color="white" lines="none" >
                                        <ion-text class='sa-address-header'>{dataLocalization.Choose}</ion-text>
                                    </ion-item>
                                    {(selectedAccordion != "address" && addressId > 0) &&
                                        <ion-item slot="header" lines="none" color={"white"}>
                                            <ion-text style={{ fontSize: "12px", overflow: "auto" }}>
                                                {filteredData.find(x => x.Id == addressId)?.Address},&nbsp;
                                                {filteredData.find(x => x.Id == addressId)?.Address1 && <>{filteredData.find(x => x.Id == addressId)?.Address1},&nbsp;</>}
                                                {filteredData.find(x => x.Id == addressId)?.LandMark && <>{filteredData.find(x => x.Id == addressId)?.LandMark},&nbsp;</>}
                                                {filteredData.find(x => x.Id == addressId)?.PinCode ? filteredData.find(x => x.Id == addressId)?.PinCode : filteredData.find(x => x.Id == addressId)?.LocationPin},&nbsp;
                                                {filteredData.find(x => x.Id == addressId)?.MobilePhone}
                                            </ion-text>
                                            <Button size="small" slot={"end"} className="slot-submit" variant="outlined">Modify</Button>
                                        </ion-item>
                                    }
                                    <ion-row slot="content">
                                        <ion-col class='sa-add-address-card' size='12'>
                                            <Button size="small" variant="contained" className="slot-submit" onClick={() => addNewAddressHandler()}>{dataLocalization.Add_New_Address}</Button>
                                            {/* <Button variant="contained" disabled={(slotSession.EndTime == "" && slotSession.StartTime == "")} onClick={() => slotHandler()}>{dataLocalization1.submit}</Button> */}
                                        </ion-col>
                                        <ion-col >
                                            <ion-radio-group value={addressId.toString()}>
                                                {
                                                    filteredData && filteredData.length > 0 ?
                                                        <>
                                                            {filteredData.map((val: IAddressModel, i: number) => {
                                                                return <ion-item key={i} color={"white"} style={{ marginBottom: "15px", zIndex: "2", borderBottom: "1px solid rgb(216, 218, 218)" }} lines={"none"}>
                                                                    <ion-radio slot="start" value={val.Id.toString()} style={{ marginRight: "10px" }} onClick={() => { setSelectedAddressId(val.Id); setSlotSession({ StartTime: "", EndTime: "", Id: 0 }); setSlotDate(""); selectSlot(val.Id); dispatch(InputParamChange({ payload: val.Id, type: ActionType.ADDRESS_ID })); }}></ion-radio>
                                                                    {scheduledData.language === "in_en" ?
                                                                        <ion-row style={{ width: "100%" }}>
                                                                            <ion-col size="12">
                                                                                {!isMobile &&
                                                                                    <ion-text>{val.Name}</ion-text>
                                                                                }
                                                                                {isMobile &&
                                                                                    <ion-item lines="none" color={"white"} class="sa-custom-ion-item">
                                                                                        <ion-label style={{ overflow: "unset", textOverflow: "unset" }} class="--dofy-color-primary-new">{val.Name}</ion-label>
                                                                                        <ion-text class='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</ion-text>&nbsp;&nbsp;
                                                                                        <ion-text onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} class='sa-address-controlls'>Delete</ion-text>
                                                                                    </ion-item>
                                                                                }
                                                                                <ion-item lines="none" color={"white"} class="sa-custom-ion-item">
                                                                                    <ion-text>
                                                                                        {val.Address},&nbsp;
                                                                                        {val.Address1 && <>{val.Address1},&nbsp;</>}
                                                                                        {val.LandMark && <>{val.LandMark},&nbsp;</>}
                                                                                        {(scheduledData.stateList.length > 0) && <>{scheduledData.stateList.find(x => x.Id === val.StateId)?.Name} - {val.PinCode ? val.PinCode : val.LocationPin}</>},&nbsp;
                                                                                        {countrycodenumber(val.MobilePhone)}
                                                                                    </ion-text>
                                                                                    {!isMobile &&
                                                                                        <>
                                                                                            <ion-text slot="end" class='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</ion-text>
                                                                                            <ion-text slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} class='sa-address-controlls'>Delete</ion-text>
                                                                                        </>
                                                                                    }
                                                                                </ion-item>
                                                                            </ion-col>
                                                                        </ion-row>
                                                                        :
                                                                        <ion-row style={{ width: "100%" }}>
                                                                            <ion-col size="12">
                                                                                {!isMobile &&
                                                                                    <ion-text>{val.Name}</ion-text>
                                                                                }
                                                                                {isMobile &&
                                                                                    <ion-item lines="none" color={"white"} class="sa-custom-ion-item">
                                                                                        <ion-label slot="start" class="--dofy-color-primary-new">{val.Name}</ion-label>
                                                                                        <ion-text slot="end" class='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</ion-text>
                                                                                        <ion-text slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} class='sa-address-controlls'>Delete</ion-text>
                                                                                    </ion-item>
                                                                                }
                                                                                <ion-item color={"white"} lines="none" class="sa-custom-ion-item">
                                                                                    <ion-text>
                                                                                        {val.Address},&nbsp;
                                                                                        {val.Address1 && <>{val.Address1},&nbsp;</>}
                                                                                        {val.LandMark && <>{val.LandMark},&nbsp;</>}
                                                                                        {scheduledData.cityList.find(x => x.Id === val.StateId)?.Name} - {val.PinCode},&nbsp;
                                                                                        {countrycodenumber(val.MobilePhone)}
                                                                                    </ion-text>
                                                                                    {!isMobile &&
                                                                                        <>
                                                                                            <ion-text slot="end" class='sa-address-controlls' onClick={() => addressHandler(val.Id, "edit")}>Edit</ion-text>
                                                                                            <ion-text slot="end" onClick={() => { setIsRemoveAlertOpen(true); setRemovedId(val.Id) }} class='sa-address-controlls'>Delete</ion-text>
                                                                                        </>
                                                                                    }
                                                                                </ion-item>
                                                                            </ion-col>
                                                                        </ion-row>
                                                                    }
                                                                </ion-item>
                                                            })}
                                                        </>
                                                        : <ion-card-header class='header'>
                                                            <ion-chip>
                                                                <ion-label style={{ color: "black" }}>{dataLocalization.No_Address_found}</ion-label>
                                                            </ion-chip>
                                                        </ion-card-header>
                                                }
                                            </ion-radio-group>
                                        </ion-col>
                                    </ion-row>
                                </ion-accordion>
                                <ion-accordion disabled={addressId == 0} value="slot" class='sa-address-choose-address'>
                                    <ion-item slot="header" color="white" lines="none">
                                        <ion-text class='sa-address-header'>{dataLocalization1.Please_schedule_the_convenient_time_for_pickup}</ion-text>
                                    </ion-item>
                                    {(selectedAccordion != "slot" && slotDate != "" && slotSession.StartTime != "") &&
                                        <ion-item slot="header" lines="none" color={"white"}>
                                            <ion-button size="small" slot="start" class="mr-3">{moment(slotDate).format('DD/MM/YYYY')}</ion-button>
                                            <ion-button size="small" slot="start">{moment(slotSession.StartTime).format('LT')}&nbsp;to&nbsp;{moment(slotSession.EndTime).format('LT')}</ion-button>
                                        </ion-item>
                                    }
                                    <ion-row slot="content">
                                        <ion-col size="12" size-xl="12" size-lg="12" size-xs="12" class="slot-details-col">
                                            <ion-card class="slot-details-card">
                                                <ion-row>
                                                    <ion-col size="12" class="slot-details-card-inline-col">
                                                        <ion-text>{moment(scheduledData.orderSummarydata.OrderDate).format("MMMM")}</ion-text>
                                                    </ion-col>
                                                </ion-row>
                                                <ion-row>
                                                    <ion-col size="1" class="ion-text-center">
                                                        <ion-icon ref={navigationPrevRef} class="cursor-pointer location-button-prev" icon={scheduledData.language == 'ae_ar' ? caretForwardOutline : caretBackOutline} />
                                                    </ion-col>
                                                    <IonCol size-xl="10" size-xs="10">
                                                        {getSlots(slotList)}
                                                    </IonCol>
                                                    <ion-col size="1" class="ion-text-center">
                                                        <ion-icon ref={navigationNextRef} class="cursor-pointer location-button-next " icon={scheduledData.language == 'ae_ar' ? caretBackOutline : caretForwardOutline} />
                                                    </ion-col>
                                                </ion-row>
                                                {slotList.length > 0 &&
                                                    <ion-row class="slot-date-row">
                                                        {slotList.filter(it => it.EventDate === slotDate).map((val: IAppointmentSlotModel, index: number) => (
                                                            <IonCol size-lg="4" sizeMd="4" size-xs="4" key={index}  >
                                                                <IonCard className={`slot-date-card  ${slotSession.Id == val.Id ? 'slot-chip-checked' : ''
                                                                    }`} onClick={() => { setSlotSession({ StartTime: val.StartTime, EndTime: val.EndTime, Id: val.Id }) }}>
                                                                    <ion-row>
                                                                        <ion-col size="12" class="p-0">
                                                                            <ion-row style={{ marginBottom: "3px" }}>
                                                                                <ion-col size="12" style={{ fontSize: "12px" }}>
                                                                                    {moment(val.StartTime).format('LT')}
                                                                                </ion-col>
                                                                            </ion-row>
                                                                            <ion-row style={{ borderBottom: slotSession.Id == val.Id ? "0.8px dotted white" : "0.8px dotted #1E4496", marginBottom: "10px" }}>
                                                                                <IonCol className="one">
                                                                                    <IonText class="slot-switch-icon">to</IonText>
                                                                                </IonCol>
                                                                            </ion-row>
                                                                            <ion-row style={{ marginTop: "3px" }}>
                                                                                <ion-col size="12" style={{ fontSize: "12px" }}>
                                                                                    {moment(val.EndTime).format('LT')}
                                                                                </ion-col>
                                                                            </ion-row>
                                                                        </ion-col>
                                                                    </ion-row>
                                                                </IonCard>
                                                            </IonCol>
                                                        ))}
                                                    </ion-row>
                                                }
                                            </ion-card>
                                        </ion-col>
                                    </ion-row>
                                </ion-accordion>
                            </ion-accordion-group>
                            {isMobile &&
                                <ion-row>
                                    <IonCol size="12" class="ion-text-center slot-controlls">
                                        <Button variant="outlined" className="prev-btn" onClick={() => { router.push(`/${getUserLanguage()}${getUserLocationForParam(scheduledData.language)}/sell-device-details/${id}`) }}>{dataLocalization.Back}</Button>
                                        <Button variant="contained" disabled={(slotSession.EndTime == "" && slotSession.StartTime == "" || muliticlick)} onClick={() => slotHandler()}>{dataLocalization1.submit}</Button>
                                    </IonCol>
                                </ion-row>
                            }
                        </IonCol>
                        <IonCol size-lg="0.5" size-xl="0.5" size-md='0' size-sm='0' size-xs='0'></IonCol>
                        <ion-col size-xl="4" size-lg="4" size-xs="12" size-md="12" size-sm="12" class="slot-orders-col">
                            <ion-card class="slot-orders-card">
                                <ion-row>
                                    <ion-col size="12" class="ion-padding-start">
                                        <ion-row>
                                            <ion-col size="5">
                                                <ion-text class='sa-address-header'>{dataLocalization1.Order_Summary}</ion-text>
                                            </ion-col>
                                            <ion-col>
                                                <ion-label>{dataLocalization1.Order_No}:  <b>{scheduledData.orderSummarydata.OrderCode}</b></ion-label>
                                            </ion-col>
                                        </ion-row>
                                    </ion-col>
                                </ion-row>
                                <ion-row>
                                    <ion-col size="12">
                                        <ion-card class="slot-orders-card-inline">
                                            <ion-row>
                                                <ion-col size="5" >
                                                    <ion-label>{dataLocalization1.Order_Date}</ion-label>
                                                </ion-col>
                                                <ion-col size="7" >
                                                    <ion-text class='slot-orders-card-inline'>{moment(scheduledData.orderSummarydata?.OrderDate).format("DD/MM/YYYY")}</ion-text>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card>
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-card class="slot-orders-card-inline-details">
                                            <ion-row>
                                                <ion-col size-lg="12" size-xs="12">
                                                    <ion-row>
                                                        <ion-col size="5" class="slot-orders-card-inline-card slot-orders-card-inline-card-0">
                                                            <img src={`${HelperConstant.imageAPI}/${scheduledData.orderSummarydata?.BrandThumbnailPath}`} alt={`sell${scheduledData.orderSummarydata?.ThumbnailPath}`} className={`${scheduledData.language === "ae_ar" ? "tds-device-img-ar" : "tds-device-img"}`}></img>
                                                        </ion-col>
                                                        <ion-col size="7" class={`${scheduledData.language === "ae_ar" ? "tds-combine-ar" : "tds-combine"}`}>
                                                            <ion-label>{scheduledData.orderSummarydata.BrandMasterName}</ion-label>
                                                        </ion-col>
                                                    </ion-row>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card>
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-card class="slot-orders-card-inline-details">
                                            <ion-row>
                                                <ion-col size="5" >
                                                    <ion-label>{dataLocalization1.Model_and_Variant}</ion-label>
                                                </ion-col>
                                                <ion-col size="7" >
                                                    <ion-text>{scheduledData.orderSummarydata?.SeriesModelName}-{scheduledData.orderSummarydata?.ModelVariantName}</ion-text>
                                                </ion-col>
                                            </ion-row>
                                        </ion-card>
                                    </ion-col>
                                    <ion-col size="12">
                                        <ion-card class="slot-orders-card-inline-cost">
                                            <ion-row>
                                                <ion-col size="5" >
                                                    <ion-label>{dataLocalization1.Final_Cost}</ion-label>
                                                </ion-col>
                                                <ion-col size="7" >
                                                    <ion-text>{currencyByCountry(scheduledData.orderSummarydata?.Payout?.TotalAmount > 0 ? toAmount(scheduledData.orderSummarydata?.Payout?.TotalAmount) : 0, scheduledData.language)}</ion-text>
                                                    <ion-icon title='' class='cursor-pointer' src={informationCircleOutline} onMouseLeave={() => setIsReferral(false)} onMouseEnter={() => setIsReferral(true)} />
                                                </ion-col>
                                            </ion-row>
                                        </ion-card>
                                        {isReferral &&
                                            <OrderPayout orderPayout={scheduledData.orderSummarydata} ReferralCode={scheduledData.orderSummarydata.ReferralCode} setIsReferral={setIsReferral} language={scheduledData.language} />
                                        }
                                    </ion-col>
                                </ion-row>
                            </ion-card>
                        </ion-col>
                        <ion-col size-lg="0.5" size-xl="0.5" size-md='0' size-sm='0' size-xs='0'></ion-col>
                    </ion-row>
                    {!isMobile &&
                        <ion-row class="ion-padding-top">
                            <IonCol size="12" class="ion-text-center slot-controlls">
                                <Button variant="outlined" className="prev-btn" onClick={() => { router.push(`/${getUserLanguage()}${getUserLocationForParam(scheduledData.language)}/sell-device-details/${id}`) }}>{dataLocalization.Back}</Button>
                                <Button variant="contained" disabled={(slotSession.EndTime == "" && slotSession.StartTime == "" || muliticlick)} className="slot-submit" onClick={() => slotHandler()}>{dataLocalization1.submit}</Button>
                            </IonCol>
                        </ion-row>
                    }
                    <IonAlert isOpen={referralCodeMessage === codeUsedInMultiOrders}
                        header={"Info"}
                        message={`Your pending ${referralCode} code is expired`}
                        buttons={[
                            {
                                text: 'OK',
                                role: 'confirm',
                                handler: () => {
                                    setReferralCodeMessage("");
                                },
                            }
                        ]}
                    />

                    <IonAlert isOpen={isRemoveAlertOpen}
                        onDidDismiss={() => setIsRemoveAlertOpen(false)}
                        header={"Confirmation"}
                        subHeader={dataLocalization.Are_You_Sure_To_Delete}
                        buttons={[{
                            text: "Yes",
                            handler: () => RemoveAddressHandler(removedId)
                        }, {
                            text: "No",
                            handler: () => setIsRemoveAlertOpen(false)
                        }]} />
                </ion-grid >
                {capacitorDevice() &&
                    (scheduledData.address.Address) &&
                    <Footer address={scheduledData.address} direction={scheduledData.direction} language={scheduledData.language} />
                }
            </ion-content>
        </ion-app>
    )
}

export const getServerSideProps: GetServerSideProps<ScheduleAddressData> = async (context) => {
    const { NEXT_PUBLIC_SSR } = process.env;

    // let direction = "";
    // let language = "in_en" as "in_en" | "ae_en" | "ae_ar";
    // let stateList: never[] = [];
    // let cityList: never[] = [];
    // let addressTypedata: never[] = []
    // let personAddress: never[] = [];
    // let orderSummarydata = {} as ISellOrderModel;
    // let metaTags = {} as ISEOModel;
    // let address = {} as any;

    // if (NEXT_PUBLIC_SSR == 'true') {
    const { stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address } = await fetchData(context);
    return { props: { stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address } }
    // }

    // return { props: { stateList, cityList, addressTypedata, personAddress, orderSummarydata, direction, language, metaTags, address } }

}

export default ScheduleAddress