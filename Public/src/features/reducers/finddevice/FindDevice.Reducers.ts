import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store";

interface deviceParam {
    isSmallMobile: boolean,
    isMobile: boolean,
    isTablet: boolean,
    isTabletPortrait: boolean,
    isDesktop: boolean,
    isExtraLarge: boolean
}

type routerPage = "smallmobile" | "mobile" | "tablet" | "tabletportrait" | "desktop" | "extralarge";

const initialState: deviceParam = {
    isSmallMobile: false,
    isMobile: false,
    isTablet: false,
    isTabletPortrait: false,
    isDesktop: false,
    isExtraLarge: false
};

const findDevice = createSlice({
    name: 'findDevice',
    initialState,
    reducers: {
        findDeviceDetail: (state, action: PayloadAction<{ payload: boolean, type: routerPage }>) => {
            switch (action.payload.type) {
                case "smallmobile": {
                    state.isSmallMobile = action.payload.payload;
                    return state;
                }
                case "mobile": {
                    state.isMobile = action.payload.payload;
                    return state;
                }
                case "tablet": {
                    state.isTablet = action.payload.payload;
                    return state;
                }
                case "tabletportrait": {
                    state.isTabletPortrait = action.payload.payload;
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
