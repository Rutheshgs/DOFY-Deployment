import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType } from '../../actiontypes/Input.ActionTypes';
import { RootState } from "../../store/Store";

interface inputParam {
    DeviceId: number;
    BrandId: number;
    ModelId: number;
    SeriesId: number;
    VariantId: number;
    AddressId: number;
    ColourId: number;
}

const initialState: inputParam = {
    DeviceId: 0,
    BrandId: 0,
    ModelId: 0,
    SeriesId: 0,
    VariantId: 0,
    AddressId: 0,
    ColourId: 0
};

const InputParam = createSlice({
    name: 'InputParam',
    initialState,
    reducers: {
        InputParamChange: (state, action: PayloadAction<{ payload: number, type: ActionType }>) => {
            switch (action.payload.type) {
                case ActionType.PRODUCT_ID: {
                    state.DeviceId = action.payload.payload;
                    return state;
                }
                case ActionType.BRAND_ID: {
                    state.BrandId = action.payload.payload;
                    return state;
                }
                case ActionType.SERIES_ID: {
                    state.SeriesId = action.payload.payload;
                    return state;
                }
                case ActionType.MODEL_ID: {
                    state.ModelId = action.payload.payload;
                    return state;
                }
                case ActionType.VARIANT_ID: {
                    state.VariantId = action.payload.payload;
                    return state;
                }
                case ActionType.COLOUR_ID: {
                    state.ColourId = action.payload.payload;
                    return state;
                }
                case ActionType.ADDRESS_ID: {
                    state.AddressId = action.payload.payload;
                    return state;
                }
                default: return state;
            }
        },
        ResetInputParam: (state) => {
            state = initialState
        }
    },
});

export const { InputParamChange, ResetInputParam } = InputParam.actions;
export const SharedData = (state: RootState) => state.InputParamChangeReducer;
export default InputParam.reducer;
