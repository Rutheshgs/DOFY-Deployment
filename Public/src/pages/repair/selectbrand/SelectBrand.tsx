import { useEffect, useState } from "react";

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";

import "./SelectBrand.css";

import { RepairpageChange } from "../../../features/reducers/repair/RepairPageChange.Reducer";
import { InputParamChange } from "../../../features/reducers/shared/InputParams.Reducers";

import MasterServices from "../../../services/Master.Services";
import { IBrandMasterModel } from "../../../models/BrandMaster.Model";
import {
  useTypedSelector,
  useTypedDispatch,
} from "../../../features/reduxhooks/ReduxHooks";
import { ActionType } from "../../../features/actiontypes/Input.ActionTypes";
import { Skeleton } from "../../../components/skeleton/Skeleton";
import { GetHome } from "../../../components/helper/Helper";
import { HelperConstant } from "../../../components/helper/HelperConstant";
import { CustomImg } from "../../../components/shared/CustomImage";

function SelectBrand() {
  const dispatch = useTypedDispatch();
  const productTypeId = useTypedSelector(
    (state) => state.InputParamChangeReducer.DeviceId
  );

  const [selectBrand, setSelectBrand] = useState<Array<any>>([]);
  const [searchText, setSearchText] = useState<any>("");
  const [filteredData, setFilteredData] = useState<Array<IBrandMasterModel>>();
  const [isSkelton, setIsSkelton] = useState<boolean>(true);

  const brandSelectHandler = (productId: number) => {
    dispatch(RepairpageChange("selectmodel"));
    dispatch(
      InputParamChange({ payload: productId, type: ActionType.BRAND_ID })
    );
  };

  const getBrandById = (productTypeId: number, serviceTypeId: number) => {
    MasterServices.GetBrandMasterByProductId(productTypeId, serviceTypeId)
      .then((res) => {
        if (res.status === 200) setSelectBrand(res.data); setFilteredData(res.data);
      })
      .catch((e: string) => {
        console.log(e);
      });
  };

  useEffect(() => {
    GetHome(productTypeId);
    getBrandById(productTypeId, HelperConstant.serviceTypeId.REPAIR);
  }, [productTypeId]);

  useEffect(() => {
    const searchHandler = (data: Array<IBrandMasterModel>, searchText: string) => {
      if (searchText === "") {
        return setFilteredData(data);
      }
      var resultArray = Array<IBrandMasterModel>();
      data.forEach((data, i) => {
        if (data.Name.toLowerCase().includes(searchText.toLowerCase())) {
          resultArray.push(data);
        }
      })
      setFilteredData(resultArray);
      setIsSkelton(resultArray.length === 0 ? false : true);
      return resultArray;
    };
    searchHandler(selectBrand, searchText);
  }, [searchText, selectBrand]);

  return (
    <IonGrid>
      <IonRow className="sell-devices-header-row">
        <IonCol sizeLg='3' sizeMd='7' sizeSm='12' sizeXs='12'>
          <IonText className="sell-devices-header-text">
            <IonIcon
              icon={arrowBack}
              onClick={() => {
                dispatch(RepairpageChange("selectdevice"));
              }}
              className="cursor-pointer"
              title='Back to Device'
            />{" "}
            Select Your Brands
          </IonText>
        </IonCol>
        <IonCol sizeLg='3' offsetLg='6' sizeMd='5' offsetMd='0' sizeXs='12'>
          <IonSearchbar
            placeholder="Search your brand"
            onIonChange={(e) => setSearchText(e.detail.value)}
          />
        </IonCol>
      </IonRow>
      <IonRow>
        {filteredData && filteredData.length > 0
          ? filteredData
            .map((val: IBrandMasterModel, index) => {
              return (
                <IonCol sizeSm='6' sizeXs='6' sizeXl='1.5' sizeLg='1.5' sizeMd='3' key={index}>
                  <IonCard className="sell-card cursor-pointer" onClick={() => brandSelectHandler(val.Id)} >
                    {/* <IonCardHeader className="ion-text-center">
                      <IonText className="tod-text">
                        <IonIcon className="sell-icon-bg" icon={pricetagsSharp} />{" "}
                        {val.Name}
                      </IonText>
                    </IonCardHeader> */}
                    <IonCardContent className="sb-card-content">
                      <CustomImg src={`${HelperConstant.imageAPI}/${val.ThumbnailPath}`} alt={val.Name} style={{ height: "100px" }} />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              );
            })
          :
          isSkelton ?
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

export default SelectBrand;
