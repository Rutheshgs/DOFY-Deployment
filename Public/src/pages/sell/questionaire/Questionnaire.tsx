import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonRow, IonCol, IonCard, IonButton, IonGrid, IonText, IonIcon, IonSlide, IonSlides, IonLabel, IonCardHeader, IonChip, isPlatform, IonItem, IonSkeletonText, IonThumbnail } from "@ionic/react";
import { closeCircle } from "ionicons/icons";

import SellOrderServices from "../../../services/order/sell/SellOrder.Services";
import { IQuestionTypeModel, sections } from "../../../models/QuestionsType.Model";
import { ISellOrderModel } from "../../../models/order/sell/SellOrder.Model";
import { IQuestionModel } from "../../../models/Question.Model";
import { IQuestionnaireUIModel, IQuestOptions } from "../../../models/Questionnaire-UI.Model";

import { IdChanger } from "../../../features/reducers/shared/IdChanger.Reducer";
import { ResetSelectedQuestions, SelectedQuestions } from "../../../features/reducers/questionnaire/Questionnaire.Reducers";
import { useTypedDispatch, useTypedSelector } from "../../../features/reduxhooks/ReduxHooks";
import { modelChanger, modelChangerClose } from "../../../features/reducers/login/LoginModel.Reducer";
import { Skeleton } from "../../../components/skeleton/Skeleton";

import { Direction, findedLocation, getLocalStorage, getUserLocationForParam } from './../../../components/helper/Helper';
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { getUserLanguage } from '../../../components/helper/Helper';


import { YesNoQuestions } from "./questiontypes/YesNoQuestions";
import { NoneQuestions } from "./questiontypes/NoneQuestions";
import { MultiSelectQuestions } from "./questiontypes/MultiSelectQuestions";
import { PopupQustions } from "./questiontypes/PopupQuestions";

import Language from "./QuestionnaireLanguage.json";
import { StepProgressBarInput } from "../../../features/reducers/stepprogressbar/StepProgressBar.Reducers";
import StepProgressBar from "../../../components/stepprogressbar/StepProgressBar";
import { pageChange } from "../../../features/reducers/selldevice/PageChange.Reducer";
import { DeviceNameChange } from "../../../features/reducers/devicename/DeviceName.Reducers";
import { InputParamChange } from "../../../features/reducers/shared/InputParams.Reducers";
import { ActionType } from "../../../features/actiontypes/Input.ActionTypes";
import QuestionnaireTypeServices from "../../../services/questionaire/sell/QuestionnaireType.Services";
import { IQuestionnaireModel } from "../../../models/Questionnaire.Model";

function Questionnaire() {

    let dispatch = useTypedDispatch();
    let history = useHistory();

    // const questionnaireData: Array<IQuestionTypeModel> = useTypedSelector(state => state.QuestionnaireReducer.questionsData);
    const productTypeId = useTypedSelector(state => state.InputParamChangeReducer.DeviceId);
    const modelVarientId = useTypedSelector(state => state.InputParamChangeReducer.VariantId);
    const IsTablet = useTypedSelector(state => state.FindDevice.isTablet);
    let isMobile = useTypedSelector((state) => state.FindDevice.isMobile);

    let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
    let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
    let modelName = useTypedSelector(state => state.DeviceNameChange.ModelName);
    let variantName = useTypedSelector(state => state.DeviceNameChange.VariantName);
    const ModelId = useTypedSelector(state => state.InputParamChangeReducer.ModelId);
    let BrandId = useTypedSelector(state => state.InputParamChangeReducer.BrandId);

    let isLoginClosed = useTypedSelector(state => state.ModelChangerReducer.isCloseLogin);    

    let dataLocalization = Language[getUserLanguage()];

    const UTM_Reference = window.localStorage.getItem("UTM");
   
    useEffect(() => {
        if(isLoginClosed){           
            reverseSwitchSelectionForScreen(); 
            if(isWarrantNoSelected){
                sectionArray.pop();
                setSlideIndex(sectionArray.at(-1) as number);
            }          
        }
    },[isLoginClosed])

    const [questionnaireData, setQuestionnaireData] = useState<Array<IQuestionTypeModel>>([]);
    const [fakeLoad, setFakeLoad] = useState<boolean>(false);
    const [nextSection, setNextSection] = useState<number>(0);
    const [sectionObj] = useState<Array<sections>>([]);
    const [sectionArray] = useState<Array<number>>([0]);
    const [questionType] = useState<number>(0);

    useEffect(() => { setFakeLoad(fakeLoad) }, [fakeLoad]);

    const [orderData, setOrderData] = useState<ISellOrderModel>({
        PersonId: getLocalStorage()?.PersonId,
        UserName: getLocalStorage()?.FirstName,
        ModelVariantId: modelVarientId,
        ServiceTypeId: HelperConstant.serviceTypeId.SELL,
        SeriesModelColor: "",
        SeriesModelColorId: null,
        ServiceType: "",
        Id: 0,
        Created: "2022-04-13T11:46:16.538Z",
        CreatedBy: 0,
        Active: true,
        Modified: "2022-04-13T11:46:16.538Z",
        ModifiedBy: 0,
        ValidationErrors: {},
        StatusId: null,
        CancellationTypeId: null,
        OrderLanguage: findedLocation().LanguageCode,
        OrderCode: "",
        Remarks: "",
        RowOrder: 0,
        OrderDate: undefined,
        ModelVariantName: "",
        ThumbnailPath: "",
        BrandThumbnailPath: "",
        ProductTypeName: "",
        ProductTypeId: 0,
        BrandMasterName: "",
        SeriesModelName: "",
        UserMobile: getLocalStorage()?.MobileNumber,
        SecondaryMobile: "",
        StatusName: "",
        ExternalStatus: "",
        ReferralCode: undefined,
        ReferralCodeId: undefined,
        Appointment: null as any,
        AssigneeDetails: null as any,
        OrderDocuments: null as any,
        QuestionnaireResponse: [],
        RepairParts: null as any,
        Payout: null as any,
        orderSpecificationsList: null as any,
        UTMReference: UTM_Reference
    });

    const [index, setIndex] = useState<number>(0);
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const [muliticlick, setMultiClick] = useState<boolean>(false);
    const [enabledvalues, setEnablesValues] = useState([0]);
    const [questionnaireUI, setQuestionnaireUI] = useState<Array<IQuestionnaireUIModel>>();
    const [questionTypes] = useState({ YES_OR_NO: "Yes_No", MULTI_SELECT: "Multi_Select", OPTION: "Option", NONE: 'None', POPUP: "Popup" });
    const [hideWarranty, setHideWarranty] = useState<boolean>(false);
    const [isWarrantNoSelected, setIsWarrantNoSelected] = useState<boolean>(false);
    const [finishClicked, setFinishClicked] = useState<boolean>(false);
    
    const windowTop = useRef(null) as any;
    const multiSelectRef = useRef(null) as any;
    const mySlides = useRef(null) as any;

    const navigationPrevRef = useRef(null) as any;
    const navigationNextRef = useRef(null) as any;

    const executeScroll = () => windowTop?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // const questionTypesScroll = (ref: any) => {
    //     ref?.current?.scrollIntoView({ behavior: 'smooth' });
    // }

    const clearAllSelectionAndSubmit = () => {
        questionnaireData.forEach((item, index) => {
            if (index > 0) {
                item.Questions.forEach(ques => {
                    ques.Response = false;
                });
            }
        });

        setMultiClick(true);
        submitOrderHandler();
    }

    const submitOrderHandler = () => {
        if (finishClicked == false) {
        orderData.QuestionnaireResponse.forEach((x) => {
            if (x.Selected == false) {
                let removeItems = x?.IgnoreResponseIds?.split(',');
                removeItems?.forEach((y) => {
                    let fIndex = orderData?.QuestionnaireResponse?.findIndex(x => x?.Identifier == parseInt(y));
                    orderData?.QuestionnaireResponse?.splice(fIndex, 1);
                });
            }
        });       
    }
    setFinishClicked(true);
        if (getLocalStorage()?.PersonId) {
            switchSelectionForScreen();
            let selectedData = orderData?.QuestionnaireResponse?.filter(x => x.Selected === true);
            orderData.QuestionnaireResponse = selectedData;

            SellOrderServices.Create(orderData).then(res => {
                if (res.status === 200) {
                    localStorage.removeItem("UTM");
                    dispatch(IdChanger(res.data));
                    dispatch(ResetSelectedQuestions())
                    localStorage.setItem("orderId", res.data);
                    setTimeout(() => { window.location.href = `/${getUserLanguage()}${getUserLocationForParam()}/sell-device-details/${res.data}`; }, 500);
                }
            }).catch((e: string) => {
                console.log(e);
            });
        }
        else {            
            setMultiClick(false);           
            switchSelectionForScreen();
            let selectedData = orderData?.QuestionnaireResponse?.filter(x => x.Selected === true);

            var dataToPost = orderData;
            dataToPost.QuestionnaireResponse = selectedData;           
     
            localStorage.setItem("orders", JSON.stringify(dataToPost));

            setTimeout(() => {
                localStorage.removeItem("orders");
            }, 600000);
            setSlideIndex(questionnaireData.length - 1);
            dispatch(modelChanger(true));
            dispatch(modelChangerClose(false));
        }
    }

    const switchSelectionForScreen = () => {
        var data: Array<IQuestionTypeModel> = [];
        var warrantyOptions: Array<IQuestionTypeModel> = [];
        questionnaireData?.forEach(question => {
            let list = question?.Questions?.filter(x => x.AnswerType === "Yes_No");
            list?.forEach(x => {
                data.push(x);
            });

            if (question?.QuestionnaireTypeEnumName === "DeviceAge" && hideWarranty) {
                let warrantyData = question?.Questions?.filter(x => x.AnswerType === "Option");
                warrantyData.forEach(ques => {
                    warrantyOptions.push(ques);
                })
            }
        });

        if (data?.length > 0) {
            data?.forEach(item => {
                if (!(item?.QuestionnaireTypeEnumName === "DeviceAge" && hideWarranty)) {
                    let index = orderData?.QuestionnaireResponse?.findIndex(x => x.QuestionnaireTemplateId === item.Id);
                    let selected = orderData?.QuestionnaireResponse[index]?.Selected == null ? null : (orderData?.QuestionnaireResponse[index]?.Selected == false ? true : false);

                    if (index >= 0) {
                        onCheckMarkHandler(item, selected)
                    }
                }
            });
        }
        if (warrantyOptions?.length > 0) {
            warrantyOptions?.forEach(item => {
                let selected = item.DisplayInList === true ? false : true;
                onCheckMarkHandler(item, selected)
            });
        }
    }

    const reverseSwitchSelectionForScreen = () => {
        var data: Array<IQuestionTypeModel> = [];

        questionnaireData?.forEach(question => {
            let list = question?.Questions?.filter(x => x.AnswerType === "Yes_No");
            list?.forEach(x => {
                data.push(x);
            });
        });      

        if (data?.length > 0) {
            data?.forEach(item => {
                if (!(item?.QuestionnaireTypeEnumName === "DeviceAge" && hideWarranty)) {
                    let index = orderData?.QuestionnaireResponse?.findIndex(x => x.QuestionnaireTemplateId === item.Id);
                    let selected = orderData?.QuestionnaireResponse[index]?.Selected == null ? null : (orderData?.QuestionnaireResponse[index]?.Selected == false ? true : false);

                    if (index >= 0) {
                        onCheckMarkHandler(item, selected)
                    }
                }
            });
        }
    }

    const onYesNoChange = (value: boolean, question: IQuestionTypeModel, index: number) => {
        questionnaireData[0].Questions.forEach((item, ind) => (
            item.DisplayInList = ind > index ? value : item.DisplayInList
        ))
        let nextSectionIndex = value == true && question?.NextQuestionNo > 0 ? 0 : questionnaireData.findIndex(x => x.QuestionnaireTypeId == question.NextQuestionNo);
        setNextSection(nextSectionIndex);
        calculateSectionArray(question?.NextQuestionNo, value, nextSectionIndex);
        setSlideIndex(0);
        setFakeLoad(!fakeLoad);
        onCheckMarkHandler(question, value);
    }

    const onRadioChange = (value: boolean, question: IQuestionTypeModel) => {
        setFinishClicked(false);
        onCheckMarkHandler(question, value);
    }

    const onMultiSelectHandler = (value: boolean, question: IQuestionTypeModel) => {
        onCheckMarkHandler(question, value);
    }

    const calculateSectionArray = (sectionId: number, canshow: boolean, nextSectionIndex: number) => {
        sectionObj.forEach((x, ind) => {
            if (!canshow && nextSectionIndex == questionnaireData?.length - 1) {
                x.DisplayInList = ind > 0 ? false : true;
            }
            else if (canshow && nextSectionIndex != questionnaireData?.length - 1) {
                x.DisplayInList = true;
            }
            else {
                x.DisplayInList = (x.SectionId == sectionId) ? canshow : true;
            }
        })
    }

    const onCheckMarkHandler = (question: IQuestionTypeModel, checked?: any) => {
        const Id = question?.Id;
        const fIndex = orderData.QuestionnaireResponse.findIndex(it => it.QuestionnaireTemplateId === Id);
        const questionObject: IQuestionModel = bindQuestionModel(question, checked);
        // if (checked) {
        //     const thumbnailItems = question?.ThumbnailPath ? JSON.parse(question.ThumbnailPath) : '';
        //     bindThumbnailImages(thumbnailItems['ThumbnailPath']);
        // }

        if (fIndex === -1) {
            orderData.QuestionnaireResponse.push(questionObject);
        } else {
            orderData.QuestionnaireResponse[fIndex] = questionObject;
        }

        setOrderData(orderData);

        const selectedItems = orderData.QuestionnaireResponse.filter(it => it.Selected);
        dispatch(SelectedQuestions(selectedItems));

    }

    const bindQuestionModel = (question: IQuestionTypeModel, checked: any): IQuestionModel => {
        return {
            Id: 0,
            Name: question.DisplayName,
            AnswerType: question.AnswerType,
            QuestionnaireTypeEnumName: question.QuestionnaireTypeEnumName,
            QuestionnaireTemplateId: question.Id,
            Selected: checked,
            Threshold: question.Threshold,
            RowOrder: question.RowOrder,
            Identifier: question.Identifier,
            ParentId: question.ParentId,
            DisableWarranty: question.DisableWarranty,
            AppreciateCalculation: question.AppreciateCalculation,
            DepreciateCalculation: question.DepreciateCalculation,
            QuestionnaireTypeId: question.QuestionnaireTypeId,
            IgnoreResponseIds: question.IgnoreResponseIds
        };
    }

    useEffect(() => {
        const obj = questionnaireData[index];

        const questionnaireUIModel = (obj: IQuestionTypeModel) => {
            const result: Array<IQuestionnaireUIModel> = [];
            if (obj && obj?.Questions) {
                const questions = obj.Questions;
                const yesOrNo = questions?.filter(it => it.AnswerType === questionTypes.YES_OR_NO);
                const multiSelect = questions?.filter(it => it.AnswerType === questionTypes.MULTI_SELECT);
                const noneItems = questions?.filter(it => it.AnswerType === questionTypes.NONE);
                const options: Array<IQuestOptions> = [];
                if (noneItems && noneItems.length > 0) {
                    for (const item of noneItems) {
                        const opts = questions?.filter(it => it.ParentId === item.Identifier && it.AnswerType === questionTypes.OPTION);
                        const optionsObj: IQuestOptions = {
                            QuestionName: item.Name,
                            Lists: opts,
                            QuestionnaireTypeDisplayName: item.QuestionnaireTypeEnumName,
                        }
                        options.push(optionsObj);
                    }
                }
                result.push({
                    QuestionnaireTypeDisplayName: obj.QuestionnaireTypeDisplayName,
                    Header: obj.DisplayName,
                    Yes_No: yesOrNo,
                    Multi_Select: multiSelect,
                    Options: options,
                    QuestionnaireTypeEnumName: obj.QuestionnaireTypeEnumName
                });
                for (const YES_OR_NO of yesOrNo) {
                    const fIndex = orderData.QuestionnaireResponse.findIndex(it => it.QuestionnaireTemplateId === YES_OR_NO.Id);

                    if (fIndex === -1) {
                        const indexedRes = bindQuestionModel(YES_OR_NO, null);
                        orderData.QuestionnaireResponse.push(indexedRes);
                    }
                }
            }

            setQuestionnaireUI(result);
        }

        questionnaireUIModel(obj);
    }, [questionnaireData, questionTypes, index, orderData.QuestionnaireResponse]);

    const onNextIndexChange = async (direction?: string, sliderIndex?: any, isValidSubmit?: boolean, questionType?: string) => {
        if (slideIndex == 0) {
            let nxtIndex = sectionObj.find(x => x.DisplayInList == true && x.SectionIndex > slideIndex)?.SectionIndex as number;
            clearSelectedValues(nxtIndex);
        }

        orderData.QuestionnaireResponse.forEach((x) => {        
            if (x.DisableWarranty == true && x.QuestionnaireTypeEnumName == "ScreeningQuestion" && x.Name.includes("warranty")) {
                if (x.Selected == false) {
                    setIsWarrantNoSelected(true);
                }
                else {
                    setIsWarrantNoSelected(false);
                }
            }
        });


        onSlideIndexChange(direction, sliderIndex, isValidSubmit, questionType);
    };

    const clearSelectedValues = async (nextIndex: number) => {
        for (let i = 1; i < nextIndex; i++) {
            questionnaireData[i].Questions.forEach(item => {
                item.Response = false;
                onCheckMarkHandler(item, false);
            })
        }
    }

    const onSlideIndexChange = async (direction?: string, sliderIndex?: any, isValidSubmit?: boolean, questionType?: string) => {
        setFinishClicked(false);       
        const swiper = await mySlides.current.getSwiper();
        checkForWarranty();
        if (direction && direction === "next") {
            
            let isValid: boolean = validateTab(slideIndex);
            if (isValid) {
                let nextIndex = sectionObj.find(x => x.DisplayInList == true && x.SectionIndex > slideIndex)?.SectionIndex as number;
             
                nextIndex = nextIndex ? nextIndex : sectionObj.length - 1;
                if (sectionArray[sectionArray.length - 1] != nextIndex){
                    sectionArray.push(nextIndex);
                }    

                setIndex(nextIndex);
                headerSwiperHandler("next");
                setShowError(false);
                setEnablesValues([...enabledvalues, nextIndex]);
                // bindThumbnailImages([]);
                stepProgressBarHandler(questionType, "next");
               
                if (isWarrantNoSelected && isValidSubmit) {
                    setSlideIndex(questionnaireData?.length - 2);
                }
                else {
                    setSlideIndex(nextIndex);
                    setFakeLoad(!fakeLoad);
                    swiper.slideTo(nextIndex);
                }

                if (isValidSubmit) {
                    stepProgressBarHandler(questionType, "next", true);
                    setMultiClick(true);
                    submitOrderHandler();
                    if (!isWarrantNoSelected) {
                        setSlideIndex(questionnaireData?.length - 1);
                    }
                }
            }
            else {
                setShowError(true);
                setTimeout(() => {
                    setShowError(false);
                }, 1000);
            }
           
        } else if (direction && direction === "prev") {
            sectionArray.pop();
            let prevIndex = sectionArray.at(-1) as number;
            setIndex(prevIndex);
            setSlideIndex(prevIndex);
           
            headerSwiperHandler("prev");
            // bindThumbnailImages([]);
            stepProgressBarHandler(questionType, "prev");

            swiper.slideTo(prevIndex);          
        } else if (sliderIndex >= 0) {
            // bindThumbnailImages([]);
            setSlideIndex(sliderIndex);
            setIndex(sliderIndex);
            swiper.slideTo(sliderIndex);
        }
        executeScroll();
    };

    const headerSwiperHandler = (direction: "next" | "prev") => {
        if (direction === "next") {
            (document.getElementById("navigation-next") as any).click();
        }
        else {
            (document.getElementById("navigation-prev") as any).click();
        }
    }

    const checkForWarranty = async () => {
        let appreciateData = [];

        questionnaireData.forEach(quest => {
            quest.Questions.forEach(ques => {
                if (ques.AppreciateCalculation === true && ques.DisableWarranty === true) {
                    appreciateData.push(ques);
                }
            })
        });

        let depreciateWarranty = orderData.QuestionnaireResponse?.filter(x => x.DisableWarranty === true && x.Selected === true && x.DepreciateCalculation === true && x.QuestionnaireTypeEnumName != "ScreeningQuestion");
        let screeningQuestionWarranty = orderData.QuestionnaireResponse?.filter(x => x.QuestionnaireTypeEnumName == "ScreeningQuestion" && x.DisableWarranty === true && x.Selected === false && x.AnswerType == "Yes_No");
        let warranty = depreciateWarranty?.length > 0 || screeningQuestionWarranty?.length > 0 ? true : false;
        setHideWarranty(warranty);
    };

    const validateTab = (index: any) => {
        let valid = true;
        if (questionnaireData[index]?.QuestionnaireTypeEnumName === "DeviceAge" && hideWarranty) {
            return valid;
        }
        var requiredQuestions = questionnaireData[index]?.Questions?.filter(x => x.Required === true);
        if (requiredQuestions?.length > 0) {
            requiredQuestions.forEach(question => {
                let isValid = validateQuestion(question);
                if (isValid === false) {
                    valid = false;
                }
            });
        }
        return valid;
    };

    const validateQuestion = (question: IQuestionTypeModel) => {
        let valid = true;
        if (question.DisplayInList == true) {
            if (question.AnswerType !== questionTypes.NONE && question.AnswerType !== questionTypes.POPUP) {
                valid = orderData.QuestionnaireResponse?.find(x => x.Identifier === question.Identifier)?.Selected !== null ? true : false;
            }
            else if (question.ParentId === 0) {
                valid = validateOptions(question);
            }
            else {
                let parentValid = orderData.QuestionnaireResponse?.find(x => x.Identifier === question.ParentId)?.Selected !== false ? true : false;
                let childvalid = validateOptions(question);
                valid = parentValid === false ? true : childvalid;
            }
        }

        return valid;
    };

    const validateOptions = (question: IQuestionTypeModel) => {
        let valid = true;
        valid = orderData.QuestionnaireResponse?.filter(x => x.ParentId === question.Identifier && x.Selected === true)?.length > 0 ? true : false;
        return valid;
    };

    const slideOpts = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        initialSlide: 0,
        speed: 400,
        autoHeight: true,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        allowTouchMove: false
    };

    const stepProgressBarHandler = (type?: string, direction?: "next" | "prev", isComplete?: boolean) => {
        if (direction === "next") {
            if (type === "Body") {
                dispatch(StepProgressBarInput([1, 2, 3]));
            }
            if (type === "Functional") {
                dispatch(StepProgressBarInput([1, 2, 3, 4]));
            }
            if (isComplete) {
                dispatch(StepProgressBarInput([1, 2, 3, 4, 5]));
            }
        }
        if (direction === "prev") {
            if (type === "Accessories ") {
                dispatch(StepProgressBarInput([1, 2, 3]));
            }
            if (type === "Warranty") {
                dispatch(StepProgressBarInput([1, 2, 3, 4]));
            }
        }
    }

    // const bindThumbnailImages = (thumbnails: IQuestionnaireThumbnailModel[]) => {
    //     if (thumbnails) {
    //         setThumbnailData(thumbnails);
    //     }
    //     else {
    //         setThumbnailData([]);
    //     }
    // };

    const deviceNameHandler = (type: "back" | "brand" | "model" | "variant") => {
        if (type === "brand") {
            dispatch(pageChange("selectdevice"));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
            dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }
        if (type === "model") {
            dispatch(pageChange("selectbrand"));
            dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }
        if (type === "variant") {
            dispatch(pageChange("selectmodel"));
            dispatch(InputParamChange({ payload: ModelId, type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
            history.push(`/${getUserLanguage()}${getUserLocationForParam()}/sell-your-old-device`);
        }
        if (type === "back") {
            dispatch(pageChange("selectvariant"));
            dispatch(InputParamChange({ payload: ModelId, type: ActionType.MODEL_ID }));
            dispatch(DeviceNameChange({ payload: "", type: ActionType.VARIANT_ID }));
        }
    }

    const getQuestionnaire = (QuestionnaireParam: IQuestionnaireModel) => {
        QuestionnaireTypeServices.getQuestionnaireTemplate(QuestionnaireParam).then((res: any) => {
            if (res.status === 200) {
                let sections = res.data.Sections as Array<IQuestionTypeModel>;
                setQuestionnaireData(sections);
                sections.forEach((item, index) => {
                    sectionObj.push({ SectionIndex: index, SectionId: item.QuestionnaireTypeId, DisplayInList: true } as sections);
                });
                // dispatch(getQuestions({ payload: res.data.Sections, type: "QuestionData" }));
            }
        }).catch((e: any) => {
            console.log(e);
        });
    }

    useEffect(() => {
        getQuestionnaire({
            ProductTypeId: productTypeId,
            QuestionnaireTypeId: null,
            OSTypeId: HelperConstant.osTypeId.ANDROID,
            ModelVariantId: modelVarientId,
            ParentId: null
        });
    }, []);

    return (
        <IonGrid ref={windowTop} className={`question-grid ${questionType === slideIndex && 'question-grid-screening'}`} dir={Direction()}>
            {questionnaireUI
                ?
                <IonRow>
                    <IonCol size="12" className="questionnaire-parent">
                        {(questionType === slideIndex && isMobile) ? null
                            :
                            <>
                                <IonRow >
                                    <IonCol className='ion-padding-top custom-center'>
                                        <StepProgressBar />
                                    </IonCol>
                                </IonRow>
                                <IonRow >
                                    <IonCol className='ion-padding-top custom-center'>
                                        {deviceName &&
                                            <IonChip className='sd_devicesname'>
                                                <IonLabel>{deviceName}</IonLabel>
                                                <IonIcon onClick={() => deviceNameHandler("brand")} icon={closeCircle}></IonIcon>
                                            </IonChip>
                                        }
                                        {brandName &&
                                            <IonChip className='sd_devicesname'>
                                                <IonLabel>{brandName}</IonLabel>
                                                <IonIcon onClick={() => deviceNameHandler("model")} icon={closeCircle}></IonIcon>
                                            </IonChip>
                                        }
                                        {modelName &&
                                            <IonChip className='sd_devicesname'>
                                                <IonLabel>{modelName}</IonLabel>
                                                <IonIcon onClick={() => deviceNameHandler("variant")} icon={closeCircle}></IonIcon>
                                            </IonChip>
                                        }
                                        {variantName &&
                                            <IonChip className='sd_devicesname' dir="ltr">
                                                <IonLabel>{variantName}</IonLabel>
                                                <IonIcon onClick={() => deviceNameHandler("back")} icon={closeCircle}></IonIcon>
                                            </IonChip>
                                        }
                                    </IonCol>
                                </IonRow>
                            </>
                        }

                        {/* <IonRow >
                            <IonCol>
                                <Swiper slidesPerView={(IsMobile ? 2 : IsTablet ? 3 : 5)} modules={[Navigation]} spaceBetween={0} navigation={{
                                    prevEl: navigationPrevRef.current,
                                    nextEl: navigationNextRef.current,
                                }}>
                                    <IonSegment scrollable={true}>
                                        {questionnaireData.map((val, i) => (
                                            <SwiperSlide key={i}>
                                                <IonCard defaultValue={val.QuestionnaireTypeEnumName} onClick={() => onSlideIndexChange(undefined, i)}
                                                    className={`db-card ${i === 0 && 'db-card-0'} ${(questionnaireData.length - 1) === i && 'db-card-nth'} ${index === i ? 'db-card-active' : ''}`} disabled={!(enabledvalues.includes(i))}>
                                                    <IonRow>
                                                        <IonCol sizeLg="12" style={{ position: 'relative' }}>
                                                            <IonItem style={{ minHeight: '40px' }} color="transparent">
                                                                <IonBadge slot="start" className="question-seg-index" color="medium">{i + 1}</IonBadge>
                                                                <IonText className="question-segment">{val.QuestionnaireTypeDisplayName}</IonText>
                                                                <IonIcon className="question-seg-arrow" hidden={i === (questionnaireData.length - 1)} slot="end" icon={chevronForward} size="small" color="primary"></IonIcon>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            </SwiperSlide>
                                        ))}
                                    </IonSegment>
                                </Swiper>
                            </IonCol>
                        </IonRow> */}
                        {questionnaireData.length === 0 &&
                            Array.from({ length: 8 }).map((val, index) => {
                                return <IonRow key={index}>
                                    <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                                    <IonCol size="8" sizeLg="8" sizeXs="12" style={{ padding: IsTablet ? "0px" : (isPlatform("android") || isPlatform("ios")) ? "0px" : "0 25px" }}>
                                        <IonItem className={`custom-ion-item-question bg-color-white`} lines="none">
                                            <IonSkeletonText animated ></IonSkeletonText>
                                            {!isMobile &&
                                                <IonItem lines="none" slot="end" className="bg-color-white yes-no-items">
                                                    <IonSkeletonText animated ></IonSkeletonText>
                                                    <IonSkeletonText animated ></IonSkeletonText>
                                                </IonItem>
                                            }
                                        </IonItem>
                                        {isMobile &&
                                            <IonRow>
                                                <IonCol size="12" className="ion-text-center">
                                                    <IonCard className={`mobile-btn-yes-no-card`}>
                                                        <IonItem lines="none" color="white" className="custom-ion-item">
                                                            <IonCard slot="start" className="mobile-btn-yes-no-card-inline">
                                                                <IonSkeletonText animated></IonSkeletonText>
                                                            </IonCard>
                                                            <IonSkeletonText animated ></IonSkeletonText>
                                                        </IonItem>
                                                    </IonCard>
                                                </IonCol>
                                            </IonRow>}
                                    </IonCol>
                                    <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                                </IonRow>
                            })
                        }
                        <IonRow>
                            <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                            <IonCol size="8" sizeLg="8" sizeXs="12" style={{ padding: IsTablet ? "0px" : (isPlatform("android") || isPlatform("ios")) ? "0px" : "0 25px" }}>
                                <IonSlides scrollbar={false} pager={false} options={slideOpts} ref={mySlides} style={{ boxShadow: "unset" }}>
                                    {questionnaireData?.map((section: IQuestionTypeModel, sIndex: number) => {
                                        const parentQuestions = section?.Questions?.filter(question => question.ParentId === 0);
                                        return (
                                            <IonSlide key={sIndex} className="mt-15 mb-15">
                                                {(hideWarranty === true && section.QuestionnaireTypeEnumName === "DeviceAge") ?
                                                    <IonRow className="mt-15 mb-15">
                                                        <IonCol size="12">
                                                            <IonText className="questionaire-question mt-15 mb-15">
                                                                {dataLocalization.Warranty_is_void}
                                                            </IonText>
                                                        </IonCol>
                                                    </IonRow>
                                                    :
                                                    <IonGrid style={{ textAlign: 'left' }}>
                                                        <IonRow>
                                                            <IonCol size="12" className="ion-text-center">
                                                                <IonLabel className="questionaire-title">{section.DisplayName}</IonLabel>
                                                            </IonCol>
                                                        </IonRow>
                                                        {showError === true ?
                                                            (
                                                                <IonRow>
                                                                    <IonCol className="ion-text-center">
                                                                        <IonCard color="danger" className="pc-err-card p-0 mb-1" style={{ cursor: "pointer" }}>
                                                                            <IonCardHeader class="p-5">
                                                                                <IonText className="pv_questionnaire_name-err">
                                                                                    {dataLocalization.Select_any_option}
                                                                                </IonText>
                                                                            </IonCardHeader>
                                                                        </IonCard>
                                                                    </IonCol>
                                                                </IonRow>
                                                            ) : <></>}
                                                        <IonRow>
                                                            {parentQuestions?.map((item: IQuestionTypeModel, index: any) => {
                                                                return (
                                                                    <IonCol className="questions" sizeXl={item && item.AnswerType === questionTypes.POPUP ? "6" : "12"} sizeLg="12" sizeMd="12" sizeXs="12" key={`${sIndex}_${index}`}>
                                                                        <IonRow className={showError ? "err-question" : ""}>
                                                                            {item && item.AnswerType === questionTypes.YES_OR_NO && item.DisplayInList == true ?
                                                                                <YesNoQuestions data={section.Questions} item={item} index={index} elementRef={multiSelectRef} clickHandler={onYesNoChange} questionIndex={index}></YesNoQuestions> : <></>
                                                                            }
                                                                            {item && item.AnswerType === questionTypes.NONE ?
                                                                                <NoneQuestions data={section.Questions} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange} ></NoneQuestions> : <></>
                                                                            }
                                                                            {item && item.AnswerType === questionTypes.POPUP ?
                                                                                <PopupQustions data={section.Questions} item={item} index={index} elementRef={multiSelectRef} clickHandler={onRadioChange}></PopupQustions> : <></>
                                                                            }
                                                                            {item && item.AnswerType === questionTypes.MULTI_SELECT ?
                                                                                <MultiSelectQuestions data={section.Questions} item={item} index={index} elementRef={multiSelectRef} response={orderData.QuestionnaireResponse} clickHandler={onMultiSelectHandler}></MultiSelectQuestions> : <></>
                                                                            }
                                                                        </IonRow>
                                                                    </IonCol>
                                                                )
                                                            })}
                                                        </IonRow>
                                                    </IonGrid>
                                                }
                                            </IonSlide>
                                        )
                                    })}
                                </IonSlides>
                            </IonCol>
                            <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                        </IonRow>
                    </IonCol>
                    {/* {informationShow &&
                        <IonCol sizeMd='12' size="12">
                            <Swiper modules={[Pagination, Autoplay]} autoplay={{ delay: 2000 }} loop pagination={{ clickable: true }} speed={1500} className="testimonial-swiper">
                                {thumbnailImages && thumbnailImages?.length > 0 ? thumbnailImages.map((val: any, i) => (
                                    <SwiperSlide key={i} >
                                        <IonCard style={{ height: "350px" }} className="home-yt-card">
                                            <IonCardSubtitle>{val.DisplayText}</IonCardSubtitle>
                                            <CustomImg src={`${HelperConstant.imageAPI}/${val.Selected}`} alt={questionsThumbnailPath} className={"img-fluid mt-2"} />
                                        </IonCard>
                                    </SwiperSlide>
                                )) :
                                    <CustomImg src={`${HelperConstant.imageAPI}/${questionsThumbnailPath}`} alt={questionsThumbnailPath} className={"img-fluid mt-2"} />
                                }
                            </Swiper>
                        </IonCol>
                    } */}
                    <IonCol size="12" className="ion-text-center">
                        {slideIndex !== 0 &&
                            <IonButton style={{ width: isMobile ? "45%" : "auto" }} color="white" className="sell-devices-btn-back"
                                onClick={() => onSlideIndexChange("prev", undefined, undefined, questionnaireData[slideIndex].QuestionnaireTypeDisplayName)}>{dataLocalization.Back}
                            </IonButton>
                        }
                        {slideIndex == 0 &&
                            <IonButton style={{ width: isMobile ? "45%" : "auto" }} color="white" onClick={() => deviceNameHandler("back")} className="sell-devices-btn-back">
                                {dataLocalization.Back}
                            </IonButton>
                        }

                        {
                            (nextSection === questionnaireData.length - 1)
                                ?
                                <IonButton style={{ width: isMobile ? "45%" : "auto" }} color="white" disabled={muliticlick} className="sell-devices-btn-continue" onClick={() => clearAllSelectionAndSubmit()}>{dataLocalization.Finish}</IonButton>
                                :
                                (isWarrantNoSelected ? slideIndex === (questionnaireData.length - 2) : slideIndex === (questionnaireData.length - 1))
                                    ?
                                    <IonButton style={{ width: isMobile ? "45%" : "auto" }} disabled={muliticlick} color="white" className="sell-devices-btn-continue" onClick={() => { onSlideIndexChange("next", undefined, true, questionnaireData[slideIndex].QuestionnaireTypeDisplayName) }}>{dataLocalization.Finish}</IonButton>
                                    :
                                    <IonButton color="white" style={{ width: isMobile ? "45%" : "auto" }} className="sell-devices-btn-continue"
                                        onClick={() => onNextIndexChange("next", undefined, undefined, questionnaireData[slideIndex]?.QuestionnaireTypeDisplayName)}>{dataLocalization.Continue}
                                    </IonButton>
                        }
                        <div ref={navigationNextRef} id="navigation-next" />
                        <div ref={navigationPrevRef} id="navigation-prev" />
                    </IonCol>
                </IonRow>
                :
                Skeleton("12", "12")
            }
        </IonGrid>
    )
};

export default Questionnaire
