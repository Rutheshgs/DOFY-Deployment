import { useState } from "react";
import { IonGrid, IonRow, IonCol, IonList, IonItem, IonText, IonAvatar, IonImg, IonChip, IonIcon, IonInput } from "@ionic/react";
import { searchOutline } from "ionicons/icons";

import { ISeriesModel } from "../../models/SeriesModel.Model";

import { HelperConstant } from "../helper/HelperConstant";

import "./GlobalSearch.css";

import { useTypedSelector } from "../../features/reduxhooks/ReduxHooks";

import { getUserLanguage, getUserLocationForParam } from "../helper/Helper";

type Props = {
    searchKeyWord: string,
    globalData: Array<ISeriesModel>
}

function GlobalSearch({ searchKeyWord, globalData }: Props) {

    const [resultData, setResultData] = useState<Array<ISeriesModel>>([]);
    const [globalDataErr, setGlobalDataErr] = useState("");

    let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

    const inputField = document.querySelector("#globalSearch-input") as any;
    const globalSearchItems = document.querySelectorAll(".global-search-items") as any;
    let [activeIndex, length] = [-1, globalData.length];

    inputField?.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(e: any) {
        const { key } = e;
        if (key === "ArrowDown") moveDown(e);
        if (key === "ArrowUp" && activeIndex !== -1 && activeIndex !== 0) moveUp(e);
        if (key === 'Enter') insertText(e);
    }

    function moveDown(e: any) {
        activeIndex = (activeIndex + 1) % length;
        navigateThroughElement(activeIndex, "down");
    }

    function moveUp(e: any) {
        if (activeIndex === -1) activeIndex = 0;
        activeIndex = (length + (activeIndex - 1)) % length;
        navigateThroughElement(activeIndex, "up");
    }

    function navigateThroughElement(index: any, direction: "up" | "down") {
        if (globalSearchItems.length > 0) {
            if (direction === "up") {
                globalSearchItems[index - 1]?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
            }
            if (direction === "down") {
                globalSearchItems[index]?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            }

            globalSearchItems.forEach((el: any) => {
                if (el?.classList?.contains('hover')) el?.classList?.remove('hover');
            })
            globalSearchItems[index]?.classList?.add('hover');
        }
    }

    function insertText(e: any) {
        if (globalSearchItems.length > 0) {
            if (activeIndex >= 0) {
                searchDataHandler(globalSearchItems[activeIndex]?.getAttribute("id"), "usingKey");
            }
        }
    }

    const searchDataHandler = (searchKeyword: string, type: "usingSearch" | "usingKey") => {
        if (type === "usingSearch" && searchKeyword.length > 1) {
            const validData = globalData.filter(it => it.DisplayName.toLowerCase().includes(searchKeyword.toLowerCase()));
            if (validData && validData.length > 0) {
                setGlobalDataErr("");
                setResultData(validData);
            }
            else {
                setResultData([]);
                setGlobalDataErr("No Records found!!");
            }
        }
        if (type === "usingKey" && searchKeyword) {
            const validData = globalData.find(it => it.Id === parseInt(searchKeyword));
            if (validData) {
                setGlobalDataErr("");
                routerHandler(validData?.ProductTypeId, validData?.BrandMasterId, validData?.Id, "sell-your-device", globalData);
            }
        }
        if (searchKeyWord === "") {
            setResultData([]);
            setGlobalDataErr("");
        }
    }

    const routerHandler = (productId: number, brandId: number, modeId: number, type: "sell-your-device" | "Repair-Device", value: any) => {
        // dispatch(InputParamChange({ payload: productId, type: ActionType.PRODUCT_ID }));
        // dispatch(InputParamChange({ payload: brandId, type: ActionType.BRAND_ID }));
        // dispatch(InputParamChange({ payload: modeId, type: ActionType.MODEL_ID }));

        // dispatch(DeviceNameChange({ payload: value.ProductTypeName, type: ActionType.PRODUCT_ID }));
        // dispatch(DeviceNameChange({ payload: value.BrandMasterName, type: ActionType.BRAND_ID }));
        // dispatch(DeviceNameChange({ payload: value.DisplayName, type: ActionType.MODEL_ID }));

        // if (type === "sell-your-device") {
        //     dispatch(pageChange("selectvariant"));
        //     history.push(`/${getUserLanguage()}${getUserLocationForParam()}/${type}/sell-${value.DisplayName?.replaceAll(' ', '-')?.toLowerCase()}`);
        // }

        // dispatch(routerChange(value.ProductTypeName.toLowerCase()));
        window.location.href = (`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/sell-your-old-${value.ProductTypeName.toLowerCase()}/${value.BrandMasterName.toLowerCase()}/${value.EnumName.replaceAll('_', '-')?.toLowerCase()}`);

    }

    // useEffect(() => {
    //     const getGlobalData = (serviceTypeId: number, LanguageCode: any, CountryCode: any) => {
    //         MasterServices.GetAllSeriesModel(HelperConstant.serviceTypeId.SELL, LanguageCode, CountryCode).then(res => {
    //             if (res.status === 200) {
    //                 setGlobalData(res.data);
    //             }
    //         }).catch(e => {
    //             console.log(e);
    //         });
    //     }

    //     getGlobalData(HelperConstant.serviceTypeId.SELL, "", "");
    // }, []);

    return (
        <>
            {globalData &&
                <IonGrid hidden={resultData.length === 0 && globalDataErr === ""} className={'global-search-grid'}>
                    <IonRow>
                        {/* <IonCol offsetMd="10" offsetXs="9.5" className="global-search-close-icon-col">
                            <IonItem lines="none" color="white">
                                <IonIcon size="small" className="cursor-pointer" src={closeCircleOutline} />
                            </IonItem>
                        </IonCol> */}
                        <IonCol hidden={true} className="global-search-search-bar" size="12">
                            <IonItem lines="none">
                                <IonIcon icon={searchOutline} />&nbsp;&nbsp;
                                <IonInput value={searchKeyWord} placeholder="Search your product/brand/model" onIonChange={(e) => searchDataHandler(e.detail.value!, "usingSearch")} />
                            </IonItem>
                        </IonCol>
                        {resultData.length > 0 ?
                            <IonCol size="12" className="global-search-list">
                                <IonList>
                                    {resultData.filter(x => x.DisplayInList === true).map((val, i) => (
                                        <IonItem id={`${val.Id}`} lines="none" key={i} className="cursor-pointer global-search-items" onClick={() => routerHandler(val.ProductTypeId, val.BrandMasterId, val.Id, "sell-your-device", val)}>
                                            <IonText className="--dofy-color-primary-new">{val.DisplayName}</IonText>
                                            <IonChip slot="end" className="gs_chip-style">
                                                <IonAvatar>
                                                    <IonImg src={`${HelperConstant.imageAPI}/${val.BrandMasterThumbnailPath}`} alt="BrandLogo" />
                                                </IonAvatar>
                                                <IonText className="global-search-labeling">{val.BrandMasterName}</IonText    >
                                            </IonChip>
                                            {!isMobile &&
                                                <IonChip slot="end" className="gs_chip2-style">
                                                    <IonAvatar>
                                                        <IonImg src={`${HelperConstant.imageAPI}/${val.ProductTypeThumbnailPath}`} alt="Product" />
                                                    </IonAvatar>
                                                    <IonText className="global-search-labeling">{val.ProductTypeName}</IonText>
                                                </IonChip>
                                            }
                                        </IonItem>
                                    ))}
                                </IonList>
                            </IonCol>
                            :
                            globalDataErr !== "" &&
                            <IonCol size="12" className="global-search-list">
                                <IonList>
                                    <IonItem lines="none">
                                        <IonText>{globalDataErr}</IonText>
                                    </IonItem>
                                </IonList>
                            </IonCol>
                        }
                    </IonRow>
                </IonGrid>
            }
        </>
    )
}

export default GlobalSearch