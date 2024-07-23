import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";

interface OtpInfo {
    OtpData: number;
}

const initialState: OtpInfo = {
    OtpData: 0,
};

const getOtp = createSlice({
    name: 'TemporaryPasswordData',
    initialState,
    reducers: {
        TemporaryPassword: (state, action: PayloadAction<any>) => {
            state.OtpData = action.payload
        }
    },
})

export const { TemporaryPassword } = getOtp.actions;
export const TemporaryPasswordData = (state: RootState) => state.OtpReducers.OtpData;
export default getOtp.reducer;
