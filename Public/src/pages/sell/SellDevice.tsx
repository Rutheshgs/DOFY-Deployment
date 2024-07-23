import { useEffect, useRef, useState } from 'react';
import { IonChip, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonPage, IonRow, isPlatform } from '@ionic/react';

import "swiper/css/effect-cards";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import SelectDevice from './selectdevice/SelectDevice';
import Footer from '../../components/footer/Footer';

import "./SellDevice.css";

import { useTypedDispatch, useTypedSelector } from '../../features/reduxhooks/ReduxHooks';
import { ResetSelectedQuestions } from '../../features/reducers/questionnaire/Questionnaire.Reducers';
import { Direction } from '../../components/helper/Helper';
import StepProgressBar from '../../components/stepprogressbar/StepProgressBar';
import { StepProgressBarReset } from '../../features/reducers/stepprogressbar/StepProgressBar.Reducers';
import { closeCircle } from 'ionicons/icons';
import { pageChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { DeviceNameChange } from '../../features/reducers/devicename/DeviceName.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';

function SellDevice() {
  let dispatch = useTypedDispatch();

  const [routPage] = useState({ selectDevice: "selectdevice", selectBrand: "selectbrand", selectSeries: "selectseries", selectModel: "selectmodel", selectVariant: "selectvariant", questionnaire: "questionnaire" });

  let selector = useTypedSelector((state) => state.PageChangeReducer.selectedPage);
  let selectorId = useTypedSelector((state) => state.InputParamChangeReducer);
  let columnSize = selector.includes('questionnaire') ? 8 : 12;

  let deviceName = useTypedSelector(state => state.DeviceNameChange.DeviceName);
  let brandName = useTypedSelector(state => state.DeviceNameChange.BrandName);
  let BrandId = useTypedSelector(state => state.InputParamChangeReducer.BrandId);
  let isMobile = useTypedSelector(state => state.FindDevice.isMobile);

  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop();
  };

  const deviceNameHandler = (type: "brand" | "model") => {
    if (type === "brand") {
      dispatch(pageChange("selectdevice"));
      dispatch(InputParamChange({ payload: 0, type: ActionType.PRODUCT_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.PRODUCT_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.MODEL_ID }));
    }
    if (type === "model") {
      dispatch(pageChange("selectbrand"));
      dispatch(InputParamChange({ payload: BrandId, type: ActionType.BRAND_ID }));
      dispatch(DeviceNameChange({ payload: "", type: ActionType.BRAND_ID }));
    }
  }

  useEffect(() => {
    const resetQuestions = () => {
      if (selector !== routPage.questionnaire) {
        dispatch(ResetSelectedQuestions());
        dispatch(StepProgressBarReset());
      }
    }

    resetQuestions();
    scrollToTop();
  }, [routPage, selector, dispatch, selectorId]);

  return (
    <IonPage data-aos="fade-left">
      <IonContent scrollEvents={true} ref={contentRef}>
        <IonGrid className='p-0 sd-grid' dir={Direction()}>
          <IonRow className='sd-row bg-color-white'>
            <IonCol sizeMd={columnSize.toString()} sizeXs='12'>
              {/* { (!isMobile || selector === routPage.selectDevice) */}
              {(!isMobile)
                &&
                <IonRow>
                  <IonCol className='ion-padding-top custom-center' >
                    <StepProgressBar />
                  </IonCol>
                </IonRow>
              }

              <IonRow>
                <IonCol className='ion-padding-top sd_margin-mob custom-center'>
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
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow className='sd-row bg-color-white'>
            <IonCol sizeLg='2' sizeXl='2' className='sd_moblie-device'></IonCol>
            <IonCol sizeMd={columnSize.toString()} sizeXs='12' sizeLg='8' sizeXl='8' sizeSm='12'>
              <SelectDevice />
              {/* {(selector === routPage.selectDevice || selector === routPage.selectVariant) &&
                <SelectDevice />
              }
              {selector === routPage.selectBrand &&
                <SelectBrand />
              }
              {selector === routPage.selectModel &&
                <SelectModel />
              } */}
            </IonCol>
            <IonCol sizeLg='2' sizeXl='2'></IonCol>
          </IonRow>
        </IonGrid>
        {/* <HowItWork /> */}
        {isPlatform("android") || isPlatform("ios") ? <></> :
          <Footer />
        }
      </IonContent>
    </IonPage>
  )
}

export default SellDevice