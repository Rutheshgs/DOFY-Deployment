import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface modelParam {
    isOpen: boolean,
    selectedPage: string
    isCloseLogin: boolean
}

type router = "login" | "verification" | "register" | "forgot-password" | "password-reset" | "verify-otp" | "find-location" | "find-device" | "my-account";

const initialState: modelParam = {
    isOpen: false,
    selectedPage: "login",
    isCloseLogin: false
};

const modelHandler = createSlice({
    name: 'modelHandler',
    initialState,
    reducers: {
        modelChanger: (state, action: PayloadAction<any>) => {
            state.isOpen = action.payload;
        },
        modelChangerClose: (state, action: PayloadAction<any>) => {
            state.isCloseLogin = action.payload;
        },
        loginPageChanger: (state, action: PayloadAction<router>) => {
            state.selectedPage = action.payload;
        },
        resetModelChanger: (state) => {
            state.isOpen = initialState.isOpen;
            state.selectedPage = initialState.selectedPage;
        }
    },
});

export const { modelChanger, resetModelChanger, loginPageChanger, modelChangerClose } = modelHandler.actions;
export const loginModelChanger = (state: RootState) => state.ModelChangerReducer;
export default modelHandler.reducer;
