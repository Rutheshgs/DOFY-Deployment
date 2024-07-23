import { IonCol, IonIcon, IonRow } from '@ionic/react'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { InputAdornment, TextField } from '@mui/material'
import { searchOutline } from 'ionicons/icons'
import { useEffect, useState } from 'react'
import MasterServices from '../../services/Master.Services';
import { HelperConstant } from '../helper/HelperConstant';
import { ISeriesModel } from '../../models/SeriesModel.Model';
import { useTypedDispatch } from '../../features/reduxhooks/ReduxHooks';
import { InputParamChange } from '../../features/reducers/shared/InputParams.Reducers';
import { ActionType } from '../../features/actiontypes/Input.ActionTypes';
import { pageChange, routerChange } from '../../features/reducers/selldevice/PageChange.Reducer';
import { getUserLanguage, getUserLocationForParam } from '../helper/Helper';
import { DeviceNameChange } from '../../features/reducers/devicename/DeviceName.Reducers';

import "./UniversalSearch.css";
import { useRouter } from 'next/router';

type Props = {
    setUniversalSearch: any
}

function UniversalSearch({ setUniversalSearch }: Props) {

    const router = useRouter();
    const dispatch = useTypedDispatch();

    const [globalData, setGlobalData] = useState<Array<ISeriesModel>>([]);

    const filterOptions = createFilterOptions({
        stringify: (option: any) => option.Name,
    });

    const defaultProps = {
        options: globalData,
        getOptionLabel: (option: ISeriesModel) => option.DisplayName,
    };

    const routerHandler = (value: ISeriesModel) => {
        if (value && value?.Id > 0) {
            // dispatch(InputParamChange({ payload: value.ProductTypeId, type: ActionType.PRODUCT_ID }));
            // dispatch(InputParamChange({ payload: value.BrandMasterId, type: ActionType.BRAND_ID }));
            // dispatch(InputParamChange({ payload: value.Id, type: ActionType.MODEL_ID }));

            dispatch(DeviceNameChange({ payload: value.ProductTypeName, type: ActionType.PRODUCT_ID }));
            dispatch(DeviceNameChange({ payload: value.BrandMasterName, type: ActionType.BRAND_ID }));
            dispatch(DeviceNameChange({ payload: value.DisplayName, type: ActionType.MODEL_ID }));
            setUniversalSearch(false);
            dispatch(pageChange("selectvariant"));
            dispatch(routerChange(value.ProductTypeName.toLowerCase()));
            window.location.href = `/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/sell-your-old-${value.ProductTypeName.toLowerCase()}/${value.BrandMasterName.toLowerCase()}/${value.EnumName.replaceAll('_', '-')?.toLowerCase()}`
            // router.push(`/${getUserLanguage()}${getUserLocationForParam(getUserLanguage())}/sell-your-old-${value.ProductTypeName.toLowerCase()}/${value.BrandMasterName.toLowerCase()}/${value.EnumName.replaceAll('_', '-')?.toLowerCase()}`);
        }
        else {
            setUniversalSearch(false);
        }
    }
    const getGlobalDataSearch = (searchText: any, LanguageCode: any, CountryCode: any) => {
        if (searchText != "") {
            MasterServices.GetAllSeriesModelBysearch(searchText, LanguageCode, CountryCode).then(res => {
                if (res.status === 200) {
                    setGlobalData(res.data);
                }
            }).catch(e => {
                console.log(e);
            });
        }
        else {
            setGlobalData([]);
        }
    }


    // useEffect(() => {
    //     getGlobalData();
    // }, []);

    return (
        <IonRow style={{ zIndex: 1, position: "absolute", width: "100%" }}>
            <IonCol size='12'>
                <Autocomplete
                    {...defaultProps}
                    freeSolo
                    filterOptions={filterOptions}
                    style={{ width: '100%' }}
                    disablePortal
                    onChange={(e, v) => routerHandler(v)}
                    id="combo-box-demo"
                    className='universal-search'
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params}
                        onChange={(e) => { getGlobalDataSearch(e.target.value, '', '') }}
                        placeholder='Search...'
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
            </IonCol>
        </IonRow>
    )
}

export default UniversalSearch