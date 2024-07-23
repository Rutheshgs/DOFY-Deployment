import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store";

interface deviceParam {
    isMobile: boolean,
    isTablet: boolean,
    isDesktop: boolean,
    isExtraLarge: boolean
}

type routerPage = "mobile" | "tablet" | "desktop" | "extralarge";

const initialState: deviceParam = {
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isExtraLarge: false
};

const findDevice = createSlice({
    name: 'findDevice',
    initialState,
    reducers: {
        findDeviceDetail: (state, action: PayloadAction<{ payload: boolean, type: routerPage }>) => {
            switch (action.payload.type) {
                case "mobile": {
                    state.isMobile = action.payload.payload;
                    return state;
                }
                case "tablet": {
                    state.isTablet = action.payload.payload;
                    return state;
                }
                case "desktop": {
                    state.isDesktop = action.payload.payload;
                    return state;
                }
                case "extralarge": {
                    state.isExtraLarge = action.payload.payload;
                    return state;
                }
                default: return state;
            }
        },
    },
});

export const { findDeviceDetail } = findDevice.actions;
export const findDeviceDetails = (state: RootState) => state.FindDevice;
export default findDevice.reducer;
