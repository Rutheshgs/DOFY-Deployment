import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType } from '../../actiontypes/Input.ActionTypes';
import { RootState } from "../../store/Store";

interface inputParam {
    DeviceName: string;
    BrandName: string;
    ModelName: string;
    VariantName: string
}

const initialState: inputParam = {
    DeviceName: "",
    BrandName: "",
    ModelName: "",
    VariantName: ""
};

const DeviceChange = createSlice({
    name: 'DeviceChange',
    initialState,
    reducers: {
        DeviceNameChange: (state, action: PayloadAction<{ payload: string, type: ActionType }>) => {
            switch (action.payload.type) {
                case ActionType.PRODUCT_ID: {
                    state.DeviceName = action.payload.payload;
                    return state;
                }
                case ActionType.BRAND_ID: {
                    state.BrandName = action.payload.payload;
                    return state;
                }
                case ActionType.MODEL_ID: {
                    state.ModelName = action.payload.payload;
                    return state;
                }
                case ActionType.VARIANT_ID: {
                    state.VariantName = action.payload.payload;
                    return state;
                }
                default: return state;
            }
        },
        DeviceNameChangeReset: (state) => {
            state = initialState
        }
    },
});

export const { DeviceNameChange, DeviceNameChangeReset } = DeviceChange.actions;
export const SharedData = (state: RootState) => state.DeviceNameChange;
export default DeviceChange.reducer;
