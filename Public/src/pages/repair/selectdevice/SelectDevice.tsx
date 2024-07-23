import { useEffect, useState } from "react";

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  IonSearchbar,
} from "@ionic/react";

import "./SelectDevice.css";

import { InputParamChange } from "../../../features/reducers/shared/InputParams.Reducers";
import { ActionType } from "../../../features/actiontypes/Input.ActionTypes";
import { useTypedDispatch } from "../../../features/reduxhooks/ReduxHooks";
import { RepairpageChange } from "../../../features/reducers/repair/RepairPageChange.Reducer";

import MasterServices from "../../../services/Master.Services";
import { IProductTypeModel } from "../../../models/ProductType.Model";

import { Skeleton } from "../../../components/skeleton/Skeleton";
import { pricetagsSharp } from "ionicons/icons";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { CustomImg } from "../../../components/shared/CustomImage";

import Language from './SelectDevice.json'
import { getUserLanguage } from "../../../components/helper/Helper";

function SelectDevice() {

  let dataLocalization = Language[getUserLanguage()];
  let dispatch = useTypedDispatch();

  const [selectDevice, setSelectDevice] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [filteredData, setFilteredData] = useState<Array<IProductTypeModel>>();

  const deviceSelectHandler = (productId: number) => {
    dispatch(RepairpageChange("selectbrand"));
    dispatch(
      InputParamChange({ payload: productId, type: ActionType.PRODUCT_ID })
    );
  };

  const getDevice = (serviceTypeId: number) => {
    MasterServices.GetAllProductType(serviceTypeId)
      .then((res) => {
        if (res.status === 200) {
          setSelectDevice(res.data);
          setFilteredData(res.data);
          // setIsSkelton(false);
        }
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDevice(HelperConstant.serviceTypeId.REPAIR);
  }, []);

  useEffect(() => {
    const searchHandler = (data: Array<IProductTypeModel>, searchText: string) => {
      if (searchText === "") {
        setFilteredData(data);
      }
      var resultArray = Array<IProductTypeModel>();
      data.forEach((data, i) => {
        if (data.Name.toLowerCase().includes(searchText.toLowerCase())) {
          resultArray.push(data);
        }
      })
      setFilteredData(resultArray);
      return resultArray;
    };
    searchHandler(selectDevice, searchText);
  }, [searchText, selectDevice]);

  return (
    <IonGrid>
      <IonRow className="sell-devices-header-row">
        <IonCol sizeLg='3' sizeMd='7' sizeSm='12' sizeXs='12'>
          <IonText className="sell-devices-header-text">
            {dataLocalization.Select_Your_Device}
          </IonText>
        </IonCol>
        <IonCol sizeLg='3' offsetLg='6' sizeMd='5' offsetMd='0' sizeXs='12'>
          <IonSearchbar
            placeholder="Search your product"
            onIonChange={(e) => setSearchText(e.detail.value)}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        {filteredData && filteredData.length > 0
          ? filteredData
            .map((val: IProductTypeModel, index) => {
              return (
                <IonCol sizeSm='6' sizeXs='6' sizeXl='1.5' sizeLg='1.5' sizeMd='3' key={index}>
                  <IonCard
                    className="sell-card cursor-pointer"
                    onClick={() => deviceSelectHandler(val.Id)}
                  >
                    <IonCardHeader className="ion-text-center">
                      <IonText className="tod-text">
                        <IonIcon
                          className="sell-icon-bg"
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
          :
          Skeleton()
        }
      </IonRow>
    </IonGrid>
  );
}

export default SelectDevice;
