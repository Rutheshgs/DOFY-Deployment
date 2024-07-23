import { IonCard, IonCardTitle, IonCol, IonGrid, IonIcon, IonItem, IonModal, IonRow, IonText, } from "@ionic/react";
import { close, informationCircleOutline } from "ionicons/icons";
import React, { InputHTMLAttributes, useState } from "react";
import { IQuestionTypeModel } from "../../../../models/QuestionsType.Model";
import { OptionQuestions } from "./OptionsQuestions";
import { CustomImg } from "../../../../components/shared/CustomImage";
import { HelperConstant } from "../../../../components/helper/HelperConstant";
import { useTypedSelector } from "../../../../features/reduxhooks/ReduxHooks";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  data: Array<IQuestionTypeModel>,
  item: IQuestionTypeModel,
  index: any,
  elementRef: any
  clickHandler: any,
}

export const NoneQuestions = React.forwardRef(({ data, item, index, elementRef, clickHandler, ...rest }: inputProps, ref) => {
  const subQuestions = data.filter(options => options.ParentId === item.Identifier);

  const [thumbnailImages, setThumbnailImages] = useState<Array<any>>([]);
  const [informationModal, setInformationModal] = useState<boolean>(false);
  let questionsThumbnailPath: string = useTypedSelector(state => state.QuestionnaireReducer.questionsThumbnailPath);

  const closeModalHandler = () => {
    setInformationModal(false);
    setThumbnailImages([]);
  }

  const bindThumbnailImages = (thumbnails: string) => {
    if (thumbnails !== "") {
      const thumbnailItems = JSON.parse(thumbnails);
      setThumbnailImages(thumbnailItems['Thumbnails']);
      setInformationModal(true);
    }
    else {
      setThumbnailImages([]);
    }
  };

  SwiperCore.use([Autoplay]);

  return (
    <IonCol style={{ borderBottom: "1px solid #f7f4f4" }} ref={elementRef} size="12" key={index} className="pt-0 mt-0">
      <IonItem className="pt-0 mt-0 bg-color-white yes-no-items" lines="none">
        <IonText className="questionaire-sub-question">{item.DisplayName}</IonText>
        {item.ThumbnailPath &&
          <IonText onClick={() => bindThumbnailImages(item.ThumbnailPath)}><i className="fa fa-arrows-left-right" style={{ cursor: "pointer", marginLeft: '5px', marginTop: '2px' }} ></i></IonText>
          // <IonIcon icon={informationCircleOutline} style={{ cursor: "pointer", marginLeft: '5px', marginTop: '2px' }} size="small" onClick={() => bindThumbnailImages(item.ThumbnailPath)} ></IonIcon>
        }
      </IonItem>
      <IonGrid>
        <IonModal className="information-modal" isOpen={informationModal} onDidDismiss={() => closeModalHandler()}>
          <IonIcon icon={close} className="information-modal-close " onClick={() => closeModalHandler()} />
          <IonRow className="information-row">
            <IonCol sizeMd='12' size="12">
              <Swiper centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false, }} speed={1000} pagination={{ clickable: true, }}
                modules={[Autoplay, Pagination]} className="mySwiper">
                {thumbnailImages?.length > 0 ? thumbnailImages.map((val, i) => (
                  <SwiperSlide key={i} >
                    <IonCard className="information-card">
                      <IonCardTitle>{val.DisplayText}</IonCardTitle>
                      <CustomImg src={`${HelperConstant.imageAPI}/${val.Path}`} alt={questionsThumbnailPath} className={"mt-2"} />
                    </IonCard>
                  </SwiperSlide>
                )) :
                  <CustomImg src={`${HelperConstant.imageAPI}/${questionsThumbnailPath}`} alt={questionsThumbnailPath} className={"img-fluid mt-2"} />
                }
              </Swiper>
            </IonCol>
          </IonRow>
        </IonModal>
        {subQuestions && subQuestions[1]?.AnswerType === "Option" ?
          <OptionQuestions data={subQuestions} index={index} elementRef={elementRef} clickHandler={clickHandler}></OptionQuestions>
          : ''}
      </IonGrid>
      <IonText id={`err-yesno-text-${item.Id}`} className="err-yesno-text err-yesno-text-hide">Please specify a answer for question.</IonText>
    </IonCol>
  );
});
