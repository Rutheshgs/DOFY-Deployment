import { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { IonCard, IonCol, IonGrid, IonIcon, IonImg, IonLabel, IonPage, IonRow, IonText } from "@ionic/react";
import { close, searchOutline } from "ionicons/icons";

import "./LocationModal.css";

import { useTypedDispatch, useTypedSelector } from "../../features/reduxhooks/ReduxHooks";
import { userLocationChanger } from "../../features/reducers/locationmodal/Location.Reducers";

import { Direction, getUserLocation, isIn } from "../helper/Helper";
import { HelperConstant } from "../helper/HelperConstant";

import MasterServices from "../../services/Master.Services";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import "swiper/css/navigation";
import 'swiper/css/pagination';

import { getUserLanguage } from '../../components/helper/Helper';

import Language from "./LocationModal.json";
import { loginPageChanger, modelChanger } from "../../features/reducers/login/LoginModel.Reducer";
import InputAdornment from "@mui/material/InputAdornment";
import { unique } from "underscore";


type Props = {
    isValid: any,
    showModel: any,
    // locationlist: Array<any>,
}

function LocationModel({ isValid, showModel }: Props) {

    const dispatch = useTypedDispatch();

    const [state, setState] = useState<Array<any>>([]);
    const [filterLocation, setFilterLocationList] = useState<Array<any>>([]);
    const [groupedLocation, setGroupedLocationList] = useState<Array<any>>([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedCityId, setSelectedCityId] = useState("");
    const [locationlist, setLocationList] = useState<Array<any>>([]);
    const [District, setDistrict] = useState<Array<any>>([]);
    const userLocation = getUserLocation();

    let dataLocalization = Language[getUserLanguage()];

    const isExtraSmall = useTypedSelector(state => state.FindDevice.isSmallMobile);
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);
    const IsTablet = useTypedSelector(state => state.FindDevice.isTablet);

    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const selectLocationHandler = (value: any) => {
        // let routerPage = languageHandler(value.Name?.replaceAll(' ', ''));
        // let data = filterLocation.find(x => x?.Name?.toLowerCase() == value?.Name.toLowerCase());

        if (value?.Id > 0) {
            localStorage.setItem("userLocation", JSON.stringify(value.Name?.toLowerCase()));
            localStorage.setItem("userLocation_ar", JSON.stringify(value.SecondLanguage));
            localStorage.setItem("userLocationId", JSON.stringify(value.Id));
            if (getUserLanguage() === "in_en") {
                localStorage.setItem("stateId", JSON.stringify(value.Parent1));
            }
            else {
                localStorage.setItem("stateId", JSON.stringify(value.Parent));
            }
            isValid(true);
            dispatch(userLocationChanger(true));
        }
        // else if (data?.Id > 0) {

        //     localStorage.setItem("userLocation", JSON.stringify(data?.Name?.toLowerCase()));
        //     localStorage.setItem("userLocationId", JSON.stringify(data?.Id));
        //     localStorage.setItem("userLocation_ar", JSON.stringify(data?.SecondLanguage));
        //     if (getUserLanguage() === "in_en") {
        //         localStorage.setItem("stateId", JSON.stringify(data?.Parent1));
        //     }
        //     else {
        //         localStorage.setItem("stateId", JSON.stringify(data?.Parent));
        //     }
        //     isValid(true);
        //     dispatch(userLocationChanger(true));
        // }
        // else if (data === undefined) {
        //     setError("No records found!");
        //     // setValue(value);
        // }
        // window.location.href = routerPage;
    };

    // const languageHandler = (location: string) => {
    //     if (getUserLocationForParam() != "") {
    //         let defaultPath = window.location.pathname.split('/').splice(3).toString().replaceAll(',', '/');
    //         let constructedPath = window.location.pathname.split('/').splice(1)[0] = location.toString().replaceAll(',', '/');
    //         return `/${getUserLanguage()}/${constructedPath}/${defaultPath}`;
    //     }
    //     const constructedPath = window.location.pathname.split('/');
    //     constructedPath.splice(2, 0, location.replace('/', ''));
    //     return constructedPath.toString().replaceAll(',', '/');

    // }

    // const backToHomeHandler = (notValid: boolean) => {
    //     setNotValidLocation(notValid);
    //     showModel(notValid);
    //     isValid(notValid);
    // }

    const selectedCityHandler = (value: any) => {
        setSelectedCity(value);
        const validLocation = value ? locationlist.filter(it => it.Parent1 === value) : locationlist;
        setGroupedLocationList(validLocation);
        var uniqueOptions = unique(validLocation, "Name");
        setFilterLocationList(uniqueOptions);
    }

    const initialSelectedCityHandler = (res: Array<any>) => {
        setGroupedLocationList(res);
        var uniqueOptions = unique(res, "Name");
        setFilterLocationList(uniqueOptions);
    }

    const getCityList = () => {
        MasterServices.GetCityList(HelperConstant.serviceTypeId.SELL, "", "").then(res => {
            if (res.status === 200) {
                setDistrict(res.data);
                // getIdentifierByEnumName();
            }
        }).catch(e => {
            console.log(e);
        });
    }

    // const getAreaList = (val: any) => {
    //     MasterServices.GetAreaList(HelperConstant.serviceTypeId.SELL, val).then(res => {
    //         if (res.status === 200) {
    //             setVillage(res.data);
    //             getIdentifierByEnumName();
    //         }
    //     }).catch(e => {
    //         console.log(e);
    //     });
    // }

    // const getIdentifierByEnumName = () => {
    //     const identifier = locationlist.find(x => x.Name === userLocation)?.Parent1;
    //     if (identifier) {
    //         selectedCityHandler(identifier);
    //     }
    // }

    const getStateList = () => {
        MasterServices.GetStateList(HelperConstant.serviceTypeId.SELL).then(res => {
            if (res.status === 200) {
                setState(res.data);
                setSelectedCity(res.data[0].Identifier);
                setSelectedCityId(res.data[0].Id)
                // selectedCityHandler(res.data[0].Identifier);
            }
        }).catch(e => {
            console.log(e);
        });
    }

    const GetAllDofyGeoBysearch = (serviceTypeId: any, stateId: any, searchText: any, LanguageCode: any, CountryCode: any) => {
        // setError("");
        if (searchText != "") {
            MasterServices.GetAllDofyGeoBysearch(serviceTypeId, stateId, searchText, LanguageCode, CountryCode).then(res => {
                if (res.status === 200) {
                    setLocationList(res.data);
                    setDistrict(res.data);
                    initialSelectedCityHandler(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        else {
            setLocationList([]);
            initialSelectedCityHandler([]);
        }
    }

    const findlocationHandler = () => {
        dispatch(modelChanger(true));
        dispatch(loginPageChanger("find-location"));
    }

    useEffect(() => {
        getCityList();
        getStateList();
    }, []);

    const filterOptions = createFilterOptions({
        stringify: (option: any) => option.Name + option.Code,
    });


    // const findlocation = (value: any) => {
    //     var options = groupedLocation.filter(x => x.Name?.toString()?.toLowerCase()?.indexOf(value?.toString()?.toLowerCase()) >= 0
    //         || x.Code?.toString()?.toLowerCase()?.indexOf(value?.toString()?.toLowerCase()) >= 0);
    //     var uniqueOptions = unique(options, "Name");
    //     setFilterLocationList(uniqueOptions);
    // }

    const defaultProps = {
        options: filterLocation,
        getOptionLabel: (option: any) => (getUserLanguage() === "ae_ar" ? option.SecondLanguage : option.Name),

    };

    return (
        <IonPage>
            {isIn() ?
                <IonGrid style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }} className="locaton-modal-grid" dir={Direction()}>
                    <IonRow>
                        <IonCol size="12" className="location-label ion-text-center">
                            <IonText style={{ color: '#2250b2' }}><b>{dataLocalization.Our_Services_in_this_Location}</b></IonText>
                        </IonCol>
                        <IonIcon className="modal-close-icon" icon={close} onClick={() => showModel(false)} />
                        <IonCol size="2" sizeXs="0" sizeSm="1" sizeMd="0.75" sizeLg="2"></IonCol>
                        <IonCol className="location-col" size="8" sizeXs="12" sizeSm="11" sizeMd="10.5" sizeLg="8">
                            <Swiper slidesPerView={(isExtraSmall ? 2 : IsMobile ? 2.5 : IsTablet ? 5 : 5)} rewind={true}
                                modules={[Navigation, Pagination]} pagination={{ clickable: true }} navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}>
                                {state.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <IonCard className={`location-card cursor-pointer ${val.Identifier === selectedCity && 'selected-dist'}`} onClick={() => { selectedCityHandler(val.Identifier); setSelectedCityId(val.Id) }}>
                                            {val.Identifier === selectedCity ?
                                                <IonImg className="lm_image-changes" src={`${HelperConstant.imageAPI}/locationicons/ind/${val.EnumName}_Selected.png`} alt="selected-image"></IonImg>
                                                :
                                                <IonImg className="lm_image-changes" src={`${HelperConstant.imageAPI}/locationicons/ind/${val.EnumName}_NotSelected.png`} alt="notselected-image"></IonImg>
                                            }
                                            <IonText>{val.Name}</IonText>
                                        </IonCard>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </IonCol>
                        <IonCol size="2" sizeXs="0" sizeSm="1" sizeMd="0.75" sizeLg="2"></IonCol>
                        <IonCol size="0.5" sizeXs="0" sizeSm="0" sizeMd="0.5" sizeLg="0.5"></IonCol>
                        <IonCol size="11" sizeXs="12" sizeSm="12" sizeMd="11" sizeLg="11">
                            <Autocomplete
                                {...defaultProps}
                                // freeSolo
                                filterOptions={filterOptions}
                                style={{ width: '100%' }}
                                disablePortal
                                onChange={(e, v) => selectLocationHandler(v)}
                                // onInputChange={(e, v) => findlocation(v)}
                                id="combo-box-demo"
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}
                                    onChange={(e) => GetAllDofyGeoBysearch(HelperConstant.serviceTypeId.SELL, selectedCityId, e.target.value, '', '')}
                                    label={dataLocalization.Search_Location_or_Pincode}
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IonIcon icon={searchOutline} />
                                            </InputAdornment>
                                        )
                                    }}

                                />}
                            />
                            {/* {error !== "" &&
                                <IonCol size="12" className="global-search-list">
                                    <IonList>
                                        <IonItem lines="none">
                                            <IonText>{error}</IonText>
                                        </IonItem>
                                    </IonList>
                                </IonCol>} */}
                        </IonCol>
                        <IonCol size="0.5" sizeXs="0" sizeSm="0" sizeMd="0.5" sizeLg="0.5"></IonCol>
                    </IonRow>
                </IonGrid>
                // </IonContent>
                :
                <IonGrid style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }} className="locaton-modal-grid" dir={Direction()}>
                    <IonRow>
                        <IonCol size="12" className="location-label ion-text-center">
                            <IonText style={{ color: '#004e73' }}><b>{dataLocalization.Our_Services_in_this_Location}</b></IonText>
                        </IonCol>
                        <IonIcon className="modal-close-icon" icon={close} onClick={() => showModel(false)} />
                        <IonCol size="2" sizeXs="0" sizeSm="1" sizeMd="0.75" sizeLg="2"></IonCol>
                        <IonCol className="location-col" size="8" sizeXs="12" sizeSm="11" sizeMd="10.5" sizeLg="8">
                            <Swiper dir={Direction()} slidesPerView={(isExtraSmall ? 2 : IsMobile ? 2.5 : IsTablet ? 5 : 5)} rewind={true}
                                modules={[Navigation, Pagination]} pagination={{ clickable: true }} navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}>
                                {state.map((val, i) => (
                                    <SwiperSlide key={i}>
                                        <IonCard className={`location-card cursor-pointer ${val.Identifier === selectedCity && 'selected-dist'}`} onClick={() => { selectedCityHandler(val.Identifier); setSelectedCityId(val.Id) }}>
                                            {val.Identifier === selectedCity ?

                                                <IonImg className="lm_image-changes" src={`${HelperConstant.imageAPI}/locationicons/uae/${val.EnumName}_Selected.png`} alt="selected-image"></IonImg>
                                                :
                                                <IonImg className="lm_image-changes" src={`${HelperConstant.imageAPI}/locationicons/uae/${val.EnumName}_NotSelected.png`} alt="notselected-image"></IonImg>

                                            }
                                            <IonText>{val.Name}</IonText>
                                        </IonCard>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </IonCol>
                        <IonCol size="2" sizeXs="0" sizeSm="1" sizeMd="0.75" sizeLg="2"></IonCol>
                        <IonCol size="0.5" sizeXs="0" sizeSm="0" sizeMd="0.5" sizeLg="0.5"></IonCol>
                        <IonCol size="11" sizeXs="12" sizeSm="12" sizeMd="11" sizeLg="11">
                            <Autocomplete
                                {...defaultProps}
                                // freeSolo
                                filterOptions={filterOptions}
                                style={{ width: '100%' }}
                                disablePortal
                                onChange={(e, v) => selectLocationHandler(v)}
                                // onInputChange={(e, v) => findlocation(v)}
                                id="combo-box-demo"
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}
                                    onChange={(e) => GetAllDofyGeoBysearch(HelperConstant.serviceTypeId.SELL, selectedCityId, e.target.value, '', '')}
                                    label={dataLocalization.Search_Location}
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IonIcon icon={searchOutline} />
                                            </InputAdornment>
                                        )
                                    }}

                                />}
                            />
                            {/* {error !== "" &&
                                <IonCol size="12" className="global-search-list">
                                    <IonList>
                                        <IonItem lines="none">
                                            <IonText>{error}</IonText>
                                        </IonItem>
                                    </IonList>
                                </IonCol>} */}
                        </IonCol>
                        {/* <IonCol size="0.5" sizeXs="0" sizeSm="0" sizeMd="0.5" sizeLg="0.5"></IonCol>
                        <IonCol size="12" className="label ion-text-center ion-margin-vertical">
                            <IonLabel style={{ color: '#004e73' }} className='cursor-pointer' onClick={findlocationHandler}><b>{dataLocalization.Cant_Find_your_Location}</b></IonLabel>
                        </IonCol> */}
                    </IonRow>
                </IonGrid>
            }
        </IonPage >

    )
}

export default LocationModel