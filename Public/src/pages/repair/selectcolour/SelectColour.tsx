import { Key, useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, IonSearchbar, IonText } from '@ionic/react';
import { arrowBack, tabletPortrait, tabletPortraitOutline } from 'ionicons/icons';

import './SelectColour.css';

import { RepairpageChange } from '../../../features/reducers/repair/RepairPageChange.Reducer';
import { useTypedSelector, useTypedDispatch } from '../../../features/reduxhooks/ReduxHooks';
import { InputParamChange } from '../../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../../features/actiontypes/Input.ActionTypes';
import { getQuestionsThumbnailPath } from '../../../features/reducers/repairdevicesummary/RepairDeviceSummary.Reducers';

import MasterServices from '../../../services/Master.Services';

import { Skeleton } from '../../../components/skeleton/Skeleton';
import { HelperConstant } from '../../../components/helper/HelperConstant';
import { CustomImg } from '../../../components/shared/CustomImage';
import { IVariantTypeModel } from '../../../models/VariantType.Model';

function SelectColour() {

    let dispatch = useTypedDispatch();

    const seriesModelId = useTypedSelector(state => state.InputParamChangeReducer.ModelId);
    const IsMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const [PhoneColour, setPhoneColour] = useState<Array<any>>([]);
    const [filteredData, setFilteredData] = useState<any>("");
    const [searchText, setSearchText] = useState<any>("");

    const modelSelectHandler = (colourId: number) => {
        dispatch(getQuestionsThumbnailPath(PhoneColour[0].ThumbnailPath));
        dispatch(InputParamChange({ payload: colourId, type: ActionType.COLOUR_ID }));
        dispatch(RepairpageChange("questionnaire"));
    }

    const searchEvent = (inputData: Array<IVariantTypeModel>, searchText: string) => {
        if (searchText === "")
            return setFilteredData(inputData);

        var resultObject = Array<IVariantTypeModel>();
        inputData.forEach((eachData, i) => {
            let searchData = `${eachData.Name} ${eachData.MaximumValue}`;
            if (searchData.toLowerCase().includes(searchText.toLowerCase()))
                resultObject.push(eachData);
        });

        setFilteredData(resultObject);
        return resultObject;
    }

    useEffect(() => {
        const ColorsBySeriesModelId = (seriesModelId: any, serviceTypeId: number) => {
            MasterServices.GetColourBySeriesModelId(seriesModelId, serviceTypeId).then((res) => {
                if (res.status === 200) {
                    setPhoneColour(res.data);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        ColorsBySeriesModelId(seriesModelId, HelperConstant.serviceTypeId.REPAIR)
    }, [seriesModelId]);

    useEffect(() => {
        searchEvent(PhoneColour, searchText);
    }, [searchText, PhoneColour]);

    return (
        <>
            {PhoneColour.length > 0 ?
                <IonGrid className='ion-padding'>
                    <IonRow className='sell-devices-header-row'>
                        <IonCol sizeLg='3' sizeMd='7' sizeSm='12' sizeXs='12'>
                            <IonText className='sell-devices-header-text'>
                                <IonIcon icon={arrowBack} onClick={() => { dispatch(RepairpageChange("selectmodel")) }}
                                    className="cursor-pointer" /> Select Your colour
                            </IonText>
                        </IonCol>
                        <IonCol sizeLg='3' offsetLg='6' sizeMd='5' offsetMd='0' sizeXs='12'>
                            <IonSearchbar placeholder='Search your Color' onIonChange={(e) => setSearchText(e.detail.value)} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        {
                            !IsMobile &&
                            <IonCol size='6' sizeMd='0' sizeLg='3'>
                                <CustomImg src={`${HelperConstant.imageAPI}/${PhoneColour[0].ThumbnailPath}`} alt={PhoneColour[0].ThumbnailPath} className={"img-fluid mt-2"} style={{ height: '300px' }} />
                            </IonCol>
                        }
                        <IonCol size='12' sizeMd='12' sizeLg='9'>
                            <IonRow>
                                <IonCol className='ion-text-center'>
                                    <IonText className='sell-devices-header-variant'>{PhoneColour[0].SeriesModelName}</IonText>
                                </IonCol>
                            </IonRow>
                            <hr />
                            <IonRow>
                                {filteredData.length === 5 ?
                                    <IonCol size="12">
                                        <IonRow>
                                            {PhoneColour.map((val: any, index) => {
                                                return (
                                                    <IonCol key={index} size="12" sizeMd='4'>
                                                        <IonCard key={index} className="cursor-pointer a" onClick={() => modelSelectHandler(val.Id)}>
                                                            <IonCardContent>
                                                                <IonRow>
                                                                    <IonCol>
                                                                        <IonRow>
                                                                            {/* <IonCol sizeLg='1' sizeXs='2' className='sv-checked' >
                                                                            <IonIcon id={`heartOutline-${val.Id}`} className={ "cursor-pointer " + val.OrderWishlistId === null ? "show" : "hide"}
                                                                                icon={heartOutline} onClick={() => { heartCheckHandler(val, "none") }} />
                                                                            <IonIcon id={`heart-${val.Id}`} style={{ color: '#e2264d' }} className={"cursor-pointer " + val.OrderWishlistId === null ? "hide" : "show"}
                                                                                icon={heart} onClick={() => { heartCheckHandler(val, "filled") }} />
                                                                        </IonCol> */}
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            {val.ColorCode === '#FFFFFF' ?
                                                                                <IonCol size='12' className='ion-text-center'>
                                                                                    <IonIcon size='large' icon={tabletPortraitOutline} style={{ color: "grey" }}></IonIcon>
                                                                                </IonCol>
                                                                                :
                                                                                <IonCol size='12' className='ion-text-center'>
                                                                                    <IonIcon size='large' icon={tabletPortrait} style={{ color: val.ColorCode }}></IonIcon>
                                                                                </IonCol>
                                                                            }

                                                                            <IonCol size='12' className='ion-text-center'>
                                                                                <IonText> {val.DisplayName}</IonText>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            <IonCol size='12' className='ion-text-center'>
                                                                                <IonButton size="small" onClick={() => modelSelectHandler(val.Id)}>GET Service</IonButton>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    </IonCol>
                                                                </IonRow>
                                                            </IonCardContent>
                                                        </IonCard>
                                                    </IonCol>
                                                )
                                            })
                                            }
                                        </IonRow>
                                    </IonCol>
                                    :
                                    <IonCol size="12">
                                        <IonRow>
                                            {filteredData.map((val: any, index: Key) => {
                                                return (
                                                    <IonCol key={index}>
                                                        <IonCard key={index} className="cursor-pointer a" onClick={() => modelSelectHandler(val.Id)}>
                                                            <IonCardContent>
                                                                <IonRow>
                                                                    <IonCol>
                                                                        <IonRow>
                                                                            {/* <IonCol sizeLg='1' sizeXs='2' className='sv-checked' >
                                                                            <IonIcon id={`heartOutline-${val.Id}`} className={ "cursor-pointer " + val.OrderWishlistId === null ? "show" : "hide"}
                                                                                icon={heartOutline} onClick={() => { heartCheckHandler(val, "none") }} />
                                                                            <IonIcon id={`heart-${val.Id}`} style={{ color: '#e2264d' }} className={"cursor-pointer " + val.OrderWishlistId === null ? "hide" : "show"}
                                                                                icon={heart} onClick={() => { heartCheckHandler(val, "filled") }} />
                                                                        </IonCol> */}
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            {val.ColorCode === '#FFFFFF' ?
                                                                                <IonCol size='12' className='ion-text-center'>
                                                                                    <IonIcon size='large' icon={tabletPortraitOutline} style={{ color: "grey" }}></IonIcon>
                                                                                </IonCol>
                                                                                :
                                                                                <IonCol size='12' className='ion-text-center'>
                                                                                    <IonIcon size='large' icon={tabletPortrait} style={{ color: val.ColorCode }}></IonIcon>
                                                                                </IonCol>
                                                                            }

                                                                            <IonCol size='12' className='ion-text-center'>
                                                                                <IonText> {val.DisplayName}</IonText>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                        <IonRow>
                                                                            <IonCol size='12' className='ion-text-center'>
                                                                                <IonButton size="small" onClick={() => modelSelectHandler(val.Id)}>GET Service</IonButton>
                                                                            </IonCol>
                                                                        </IonRow>
                                                                    </IonCol>
                                                                </IonRow>
                                                            </IonCardContent>
                                                        </IonCard>
                                                    </IonCol>
                                                )
                                            })
                                            }
                                        </IonRow>
                                    </IonCol>
                                }
                            </IonRow>
                        </IonCol>
                    </IonRow>
                </IonGrid >
                :
                Skeleton("12", "12")
            }
        </>
    )
}

export default SelectColour