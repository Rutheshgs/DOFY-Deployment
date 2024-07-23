import { useEffect, useRef, useState } from "react";
import { IonRow, IonCol, IonCard, IonButton, IonGrid, IonText, IonSlide, IonSlides, IonLabel, IonCardHeader, isPlatform, IonItem, IonSkeletonText, IonLoading } from "@ionic/react";

import { YesNoQuestions } from "./questiontypes/YesNoQuestions";
import { NoneQuestions } from "./questiontypes/NoneQuestions";
import { MultiSelectQuestions } from "./questiontypes/MultiSelectQuestions";
import { PopupQustions } from "./questiontypes/PopupQuestions";
import { IQuestOptions, IQuestionModel, IQuestionTypeModel, IQuestionnaireModel, IQuestionnaireUIModel, sections } from "../../models/QuestionType.Model";
import SellOrderServices from "../../services/order/sell/SellOrder.Services";
import { Skeleton } from "../../components/skeleton/Skeleton";
import { IGetOrderSummaryModel } from "../../models/GetOrderSummary.Model";

import "./Questionnaire.css";
import { IRequoteModel } from "../../models/Requote.Model";
import { Dictionary, groupBy } from "underscore";

interface inputProps {
    data: IGetOrderSummaryModel | undefined,
    id: string
}

function Questionnaire({ data, id }: inputProps) {

    const [questionnaireData, setQuestionnaireData] = useState<Array<IQuestionTypeModel>>([]);
    const [orderedQuestionaire, setOrderedQuestionaire] = useState<Dictionary<IQuestionTypeModel[]>>();
    const [fakeLoad, setFakeLoad] = useState<boolean>(false);
    const [requoteLoader, setRequoteLoader] = useState<boolean>(false);
    const [nextSection, setNextSection] = useState<number>(0);
    const [sectionObj] = useState<Array<sections>>([]);
    const [sectionArray] = useState<Array<number>>([0]);
    const [questionType] = useState<number>(0);

    useEffect(() => { setFakeLoad(fakeLoad) }, [fakeLoad]);

    const [orderData, setOrderData] = useState<Array<IQuestionModel>>([]);
    const [postOrderData, setPostOrderData] = useState<Array<IQuestionModel>>([]);

    const [index, setIndex] = useState<number>(0);
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const [muliticlick, setMultiClick] = useState<boolean>(false);
    const [enabledvalues, setEnablesValues] = useState([0]);
    const [questionnaireUI, setQuestionnaireUI] = useState<Array<IQuestionnaireUIModel>>();
    const [questionTypes] = useState({ YES_OR_NO: "Yes_No", MULTI_SELECT: "Multi_Select", OPTION: "Option", NONE: 'None', POPUP: "Popup" });
    const [hideWarranty, setHideWarranty] = useState<boolean>(false);
    const [isWarrantNoSelected, setIsWarrantNoSelected] = useState<boolean>(false);

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

        // setMultiClick(true);
        submitOrderHandler();
    }

    const defaultDataHandler = (selectedQuestionsIndex: any, QuestionnaireData: any) => {
        let questions = QuestionnaireData?.Questionnaire.Sections as Array<IQuestionTypeModel>;
        questions[selectedQuestionsIndex].Questions.forEach((x) => {
            orderData.filter(y => y.QuestionnaireTypeEnumName == x.QuestionnaireTypeEnumName).forEach((y) => {
                if (x.Id == y.QuestionnaireTemplateId) {
                    let fIndex = postOrderData.findIndex(z => z?.QuestionnaireTemplateId == x?.Id);
                    const questionObject: IQuestionModel = bindQuestionModel(x, x.Selected);

                    if (fIndex === -1) {
                        postOrderData.push(questionObject);
                    } else {
                        postOrderData[fIndex] = questionObject;
                    }
                    setPostOrderData(postOrderData);
                }
            })
        })
    }

    const submitOrderHandler = () => {
        setRequoteLoader(true);
        postOrderData.forEach((x) => {
            if (x.Selected == false) {
                let removeItems = x?.IgnoreResponseIds?.split(',');
                removeItems?.forEach((y: string) => {
                    let fIndex = postOrderData.findIndex((x: { Identifier: number; }) => x?.Identifier == parseInt(y));
                    postOrderData.splice(fIndex, 1);
                });
            }
        });
        switchSelectionForScreen();

        let selectedData = postOrderData?.filter((x) => x.Selected === true);
        let bindOrderData: any[] = [];

        selectedData.forEach(x => {
            x.OrderId = data?.Id;
            bindOrderData.push(x);
        });

        SellOrderServices.RequoteOrder(bindOrderData).then(res => {
            if (res.status === 200) {
                setRequoteLoader(false);
                window.location.href = '/AgentTicketView/' + res.data;
            }
        }).catch(e => {
            console.log(e);
        });
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
                    let index = postOrderData.findIndex((x: { QuestionnaireTemplateId: number; }) => x.QuestionnaireTemplateId === item.Id);
                    let selected = postOrderData[index]?.Selected == null ? false : (postOrderData[index]?.Selected == false ? true : false);

                    if (index >= 0) {
                        onCheckMarkHandler(selected, item)
                    }
                }
            });
        }
        if (warrantyOptions?.length > 0) {
            warrantyOptions?.forEach(item => {
                let selected = item.DisplayInList === true ? false : true;
                onCheckMarkHandler(selected, item)
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
        onCheckMarkHandler(value, question);
        if(value == false){
            removeChildResponse(index);
        }       
    }

    const removeChildResponse = (index: number) => {
        questionnaireData[0].Questions.forEach((item, ind) => {
            if(ind > index){
                onCheckMarkHandler(null, item);
            } 
        })
    }

    const onRadioChange = (value: boolean, question: IQuestionTypeModel) => {
        onCheckMarkHandler(value, question);
    }

    const onMultiSelectHandler = (value: boolean, question: IQuestionTypeModel) => {
        onCheckMarkHandler(value, question);
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

    const onCheckMarkHandler = (checked: any, question: IQuestionTypeModel) => {
        const Id = question.Id;
        const fIndex = orderData.findIndex((it: { QuestionnaireTemplateId: number; }) => it.QuestionnaireTemplateId === Id);
        const pFIndex = postOrderData.findIndex((it: { QuestionnaireTemplateId: number; }) => it?.QuestionnaireTemplateId === Id);
        const questionObject: IQuestionModel = bindQuestionModel(question, checked);
        // if (checked) {
        //     const thumbnailItems = question?.ThumbnailPath ? JSON.parse(question.ThumbnailPath) : '';
        //     bindThumbnailImages(thumbnailItems['ThumbnailPath']);
        // }
        if (pFIndex === -1) {
            postOrderData.push(questionObject);
        } else {
            postOrderData[pFIndex] = questionObject;
        }

        if (fIndex === -1) {
            orderData.push(questionObject);
        } else {
            orderData[fIndex] = questionObject;
        }

        setOrderData(orderData);
        setPostOrderData(postOrderData);
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
            IgnoreResponseIds: question.IgnoreResponseIds,
            OrderId: question.OrderId,
            NextQuestionNo: question.NextQuestionNo
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
                    const fIndex = orderData.findIndex((it: { QuestionnaireTemplateId: number; }) => it.QuestionnaireTemplateId === YES_OR_NO.Id);

                    if (fIndex === -1) {
                        const indexedRes = bindQuestionModel(YES_OR_NO, null);
                        orderData.push(indexedRes);
                    }
                }
            }

            setQuestionnaireUI(result);
        }

        questionnaireUIModel(obj);
    }, [questionnaireData, questionTypes, index, orderData]);

    const onNextIndexChange = async (direction?: string, sliderIndex?: any, isValidSubmit?: boolean, questionType?: string) => {
        if (slideIndex == 0) {
            let nxtIndex = sectionObj.find(x => x.DisplayInList == true && x.SectionIndex > slideIndex)?.SectionIndex as number;
            sectionArray.push(nxtIndex);
            clearSelectedValues(nxtIndex);
        }

        orderData.forEach((x) => {
            if (x.DisableWarranty == true && x.QuestionnaireTypeEnumName == "ScreeningQuestion") {
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
                onCheckMarkHandler(false, item);
            })
        }
    }

    const onSlideIndexChange = async (direction?: string, sliderIndex?: any, isValidSubmit?: boolean, questionType?: string) => {
        const swiper = await mySlides.current.getSwiper();
        checkForWarranty();
        if (direction && direction === "next") {
            let isValid: boolean = validateTab(slideIndex);
            if (isValid) {
                let nextIndex = sectionObj.find(x => x.DisplayInList == true && x.SectionIndex > slideIndex)?.SectionIndex as number;
                if (nextIndex){
                    defaultDataHandler(nextIndex, data);
                }                
                nextIndex = nextIndex ? nextIndex : sectionObj.length - 1;
                sectionArray.push(nextIndex);
                setIndex(nextIndex);
                headerSwiperHandler("next");
                setShowError(false);
                setEnablesValues([...enabledvalues, nextIndex]);
                // bindThumbnailImages([]);
                if (isWarrantNoSelected && isValidSubmit) {
                    setSlideIndex(questionnaireData?.length - 2);
                }
                else {
                    setSlideIndex(nextIndex);
                    swiper.slideTo(nextIndex);
                }

                if (isValidSubmit) {
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

        let depreciateWarranty = orderData.filter((x) => x.DisableWarranty === true && x.Selected === true && x.DepreciateCalculation === true && x.QuestionnaireTypeEnumName != "ScreeningQuestion");
        let screeningQuestionWarranty = orderData.filter((x: { QuestionnaireTypeEnumName: string; DisableWarranty: boolean; Selected: boolean; AnswerType: string; }) => x.QuestionnaireTypeEnumName == "ScreeningQuestion" && x.DisableWarranty === true && x.Selected === false && x.AnswerType == "Yes_No");
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
                valid = orderData.find((x: { Identifier: number; }) => x.Identifier === question.Identifier)?.Selected !== null ? true : false;
            }
            else if (question.ParentId === 0) {
                valid = validateOptions(question);
            }
            else {
                let parentValid = orderData.find((x: { Identifier: number; }) => x.Identifier === question.ParentId)?.Selected !== false ? true : false;
                let childvalid = validateOptions(question);
                valid = parentValid === false ? true : childvalid;
            }
        }

        return valid;
    };

    const validateOptions = (question: IQuestionTypeModel) => {
        let valid = true;
        valid = orderData.filter((x: { ParentId: number; Selected: boolean; }) => x.ParentId === question.Identifier && x.Selected === true)?.length > 0 ? true : false;
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

    const GroupData = (QuestionnaireData: any) => {

        let questions = QuestionnaireData?.Questionnaire.Sections as Array<IQuestionTypeModel>;
        let QuestionnaireResponse = QuestionnaireData?.QuestionnaireResponse as Array<IQuestionModel>;
        questions.forEach((item, index) => {
            sectionObj.push({ SectionIndex: index, SectionId: item.QuestionnaireTypeId, DisplayInList: true } as sections);
        });
        // if (rQuestion.QuestionnaireTypeEnumName == "ScreeningQuestion" && qResponse.QuestionnaireTemplateId == rQuestion.Id) {
        //     rQuestion.Response = false;
        // }
        // else if (rQuestion.QuestionnaireTypeEnumName == "ScreeningQuestion") {
        //     rQuestion.Response = true;
        //     let binded = bindQuestionModel(rQuestion, rQuestion.Response);
        //     orderData.push(binded);
        // }      

        // orderData.forEach((x) => {
        //     if (x.Selected == false) {
        //         let removeItems = x?.IgnoreResponseIds?.split(',');
        //         removeItems?.forEach((y: string) => {
        //             let fIndex = orderData.findIndex((x: { Identifier: number; }) => x?.Identifier == parseInt(y));
        //             orderData.splice(fIndex, 1);
        //         });
        //     }
        // });


        questions.forEach((gQuestion) => {
            gQuestion.Questions.forEach(rQuestion => {
                let result = QuestionnaireResponse.find(x => x.QuestionnaireTemplateId === rQuestion.Id);
                if (rQuestion.QuestionnaireTypeEnumName == "ScreeningQuestion") {
                    rQuestion.Response = !result ? true : false;
                    rQuestion.Selected = !result ? true : false;
                    if (!result) {
                        let data = bindQuestionModel(rQuestion, true);
                        orderData.push(data)
                    }
                    else {
                        let data = bindQuestionModel(rQuestion, false);
                        orderData.push(data)
                        let nextSectionIndex = rQuestion.Selected == true && rQuestion?.NextQuestionNo > 0 ? 0 : questions.findIndex(x => x.QuestionnaireTypeId == rQuestion.NextQuestionNo);
                        setNextSection(nextSectionIndex);
                        calculateInitialSectionArray(rQuestion?.NextQuestionNo, rQuestion.Selected, nextSectionIndex, questions);
                        let removeItems = rQuestion?.IgnoreResponseIds?.split(',');
                        removeItems?.forEach((y: string) => {
                            let fIndex = gQuestion.Questions.findIndex(x => x.Identifier == parseInt(y));
                            gQuestion.Questions[fIndex].DisplayInList = false;
                        });
                    }
                }
                else {
                    rQuestion.Response = result?.Selected ?? null;
                    rQuestion.Selected = result?.Selected ?? null;
                    if (result != null) {
                        let data = bindQuestionModel(rQuestion, true);
                        orderData.push(data)
                    }
                }
            })
            questionnaireData.push(gQuestion);
        });

        setOrderedQuestionaire(groupBy(questions ?? [], "QuestionnaireTypeName"));
        defaultDataHandler(0, QuestionnaireData);
    }

    const calculateInitialSectionArray = (sectionId: number, canshow: boolean, nextSectionIndex: number, questions: IQuestionTypeModel[]) => {
        sectionObj.forEach((x, ind) => {
            if (!canshow && nextSectionIndex == questions?.length - 1) {
                x.DisplayInList = ind > 0 ? false : true;
            }
            else if (canshow && nextSectionIndex != questions?.length - 1) {
                x.DisplayInList = true;
            }
            else {
                x.DisplayInList = (x.SectionId == sectionId) ? canshow : true;
            }
        })
    }

    // const getQuestionnaire = (QuestionnaireData: any) => {

    //     let sections = QuestionnaireData?.Questionnaire.Sections as Array<IQuestionTypeModel>;
    //     setQuestionnaireData(sections);
    //     sections.forEach((item, index) => {
    //         sectionObj.push({ SectionIndex: index, SectionId: item.QuestionnaireTypeId, DisplayInList: true } as sections);
    //     });

    // }


    useEffect(() => {
        if (data) {
            // getQuestionnaire(data);
            GroupData(data);
        }
    }, [data]);

    return (
        <IonGrid ref={windowTop} className={`question-grid ${questionType === slideIndex && 'question-grid-screening'}`}>
            <IonLoading isOpen={requoteLoader} message="Requote in Process..." />
            {questionnaireUI
                ?
                <IonRow>
                    <IonCol size="12" className="questionnaire-parent">
                        {questionnaireData.length === 0 &&
                            Array.from({ length: 8 }).map((val, index) => {
                                return <IonRow key={index}>
                                    <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                                    <IonCol size="8" sizeLg="8" sizeXs="12" style={{ padding: (isPlatform("android") || isPlatform("ios")) ? "0px" : "0 25px" }}>
                                        <IonItem className={`custom-ion-item-question bg-color-white`} lines="none">
                                            <IonSkeletonText animated ></IonSkeletonText>
                                            <IonItem lines="none" slot="end" className="bg-color-white yes-no-items">
                                                <IonSkeletonText animated ></IonSkeletonText>
                                                <IonSkeletonText animated ></IonSkeletonText>
                                            </IonItem>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                                </IonRow>
                            })
                        }
                        <IonRow>
                            <IonCol size="2" sizeLg="2" sizeXs="0"></IonCol>
                            <IonCol size="8" sizeLg="8" sizeXs="12" style={{ padding: (isPlatform("android") || isPlatform("ios")) ? "0px" : "0 25px" }}>
                                <IonSlides scrollbar={false} pager={false} options={slideOpts} ref={mySlides} style={{ boxShadow: "unset" }}>
                                    {questionnaireData?.map((section: IQuestionTypeModel, sIndex: number) => {
                                        const parentQuestions = section?.Questions?.filter(question => question.ParentId === 0);
                                        return (
                                            <IonSlide key={sIndex} className="mt-15 mb-15">
                                                {(hideWarranty === true && section.QuestionnaireTypeEnumName === "DeviceAge") ?
                                                    <IonRow className="mt-15 mb-15">
                                                        <IonCol size="12">
                                                            <IonText className="questionaire-question mt-15 mb-15">
                                                                Warranty Is Void
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
                                                                                    Select Any Options
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
                                                                                <MultiSelectQuestions data={section.Questions} item={item} index={index} elementRef={multiSelectRef} response={orderData} clickHandler={onMultiSelectHandler}></MultiSelectQuestions> : <></>
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
                    <IonCol size="12" className="ion-text-center">
                        {slideIndex !== 0 &&
                            <IonButton color="white" className="sell-devices-btn-back"
                                onClick={() => onSlideIndexChange("prev", undefined, undefined, questionnaireData[slideIndex].QuestionnaireTypeDisplayName)}>Back
                            </IonButton>
                        }
                        {
                            (nextSection === questionnaireData.length - 1)
                                ?
                                <IonButton color="white" disabled={muliticlick} className="sell-devices-btn-continue" onClick={() => clearAllSelectionAndSubmit()}>Finish</IonButton>
                                :
                                (isWarrantNoSelected ? slideIndex === (questionnaireData.length - 2) : slideIndex === (questionnaireData.length - 1))
                                    ?
                                    <IonButton disabled={muliticlick} color="white" className="sell-devices-btn-continue" onClick={() => onSlideIndexChange("next", undefined, true, questionnaireData[slideIndex].QuestionnaireTypeDisplayName)}>Finish</IonButton>
                                    :
                                    <IonButton color="white" className="sell-devices-btn-continue"
                                        onClick={() => onNextIndexChange("next", undefined, undefined, questionnaireData[slideIndex]?.QuestionnaireTypeDisplayName)}>Continue
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
