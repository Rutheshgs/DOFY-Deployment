import { useEffect, useState } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonChip, IonCol, IonGrid, IonIcon, IonLabel, IonRow, IonSearchbar, IonText, } from "@ionic/react";
import { arrowBack, pricetagsSharp } from "ionicons/icons";

import "./SelectModel.css";

import { RepairpageChange } from "../../../features/reducers/repair/RepairPageChange.Reducer";
import { InputParamChange } from "../../../features/reducers/shared/InputParams.Reducers";
import { ActionType } from "../../../features/actiontypes/Input.ActionTypes";
import { useTypedDispatch, useTypedSelector, } from "../../../features/reduxhooks/ReduxHooks";

import MasterServices from "../../../services/Master.Services";

import { Skeleton } from "../../../components/skeleton/Skeleton";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { IModelTypeModel } from "../../../models/ModelType.Model";
import { CustomImg } from "../../../components/shared/CustomImage";

function SelectModel() {
  let dispatch = useTypedDispatch();

  const [selectModel, setSelectModel] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [filteredData, setFilteredData] = useState<Array<IModelTypeModel>>();
  const [isSkelton, setIsSkelton] = useState<boolean>(true);

  const searchHandler = (data: Array<IModelTypeModel>, searchText: string) => {
    if (searchText === "") {
      return setFilteredData(data);
    }
    var resultArray = Array<IModelTypeModel>();
    data.forEach((data, i) => {
      if (data.Name.toLowerCase().includes(searchText.toLowerCase())) {
        resultArray.push(data);
      }
    });
    setFilteredData(resultArray);
    setIsSkelton(resultArray.length === 0 ? false : true);

    return resultArray;
  };

  const BrandId = useTypedSelector(
    (state) => state.InputParamChangeReducer.BrandId
  );

  const modelSelectHandler = (modelId: number) => {
    dispatch(RepairpageChange("selectcolour"));
    dispatch(InputParamChange({ payload: modelId, type: ActionType.MODEL_ID }));
  };

  const getModel = (BrandId: number, serviceTypeId: number) => {
    MasterServices.GetSeriesModelByBrandMasterId(BrandId, serviceTypeId)
      .then((res) => {
        if (res.status === 200) {
          setSelectModel(res.data);
          setFilteredData(res.data);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getModel(BrandId, HelperConstant.serviceTypeId.REPAIR);
  }, [BrandId]);

  useEffect(() => {
    searchHandler(selectModel, searchText);
  }, [searchText, selectModel]);


  return (
    <IonGrid>
      <IonRow className="sell-devices-header-row">
        <IonCol sizeLg='3' sizeMd='7' sizeSm='12' sizeXs='12'>
          <IonText className="sell-devices-header-text">
            <IonIcon
              icon={arrowBack}
              onClick={() => {
                dispatch(RepairpageChange("selectbrand"));
              }}
              className="cursor-pointer"
              title='Back to Brands'
            />{" "}
            Select Your Model
          </IonText>
        </IonCol>
        <IonCol sizeLg='3' offsetLg='6' sizeMd='5' offsetMd='0' sizeXs='12'>
          <IonSearchbar
            placeholder="Search your model"
            onIonChange={(e) => setSearchText(e.detail.value)}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        {filteredData && filteredData.length > 0
          ? filteredData
            .map((val: IModelTypeModel, index) => {
              return (
                <IonCol sizeSm='6' sizeXs='6' sizeXl='1.5' sizeLg='1.5' sizeMd='3' key={index}>
                  <IonCard
                    className="sell-card cursor-pointer ss-image"
                    onClick={() => modelSelectHandler(val.Id)}
                  >
                    <IonCardHeader className="ion-text-center">
                      <IonText className="tod-text">
                        <IonIcon
                          className="repair-icon-bg"
                          icon={pricetagsSharp}
                        />{" "}
                        {val.Name}
                      </IonText>
                    </IonCardHeader>
                    <IonCardContent>
                      <CustomImg
                        src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`}
                        alt={val.Name}
                        style={{ height: "80px" }}
                      />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })
          : isSkelton ?
            Skeleton() :
            <IonCardHeader className='header' >
              <IonChip>
                <IonLabel color='black'>No records found</IonLabel>
              </IonChip>
            </IonCardHeader>
        }
      </IonRow>
    </IonGrid>
  );
}

export default SelectModel;
