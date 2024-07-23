import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface DeviceInfoParam {
    DeviceInfoData: [{}]
}

const initialState: DeviceInfoParam = {
    DeviceInfoData: [{}]
};

const getDeviceInfo = createSlice({
    name: 'DeviceInfoData',
    initialState,
    reducers: {
        DeviceInfo: (state, action: PayloadAction<any>) => {
            state.DeviceInfoData = action.payload;
        },
    },
});

export const { DeviceInfo } = getDeviceInfo.actions;
export const ProfileData = (state: RootState) => state.DeviceInfoReducer.DeviceInfoData;
export default getDeviceInfo.reducer;
