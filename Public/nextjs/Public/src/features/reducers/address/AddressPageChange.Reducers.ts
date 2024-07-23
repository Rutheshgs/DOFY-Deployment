import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    selectedPage: string,
    addressData: []
}

type routerPage = "newaddress" | "currentaddress" | "editaddress" | "timedateslot" | "repairtimedateslot";

const initialState: NavigationPage = {
    selectedPage: "currentaddress",
    addressData: []
};

const AddressPageChange = createSlice({
    name: 'PageChange',
    initialState,
    reducers: {
        addressPageChange: (state, action: PayloadAction<routerPage>) => {
            state.selectedPage = action.payload;
        },
        userAddressData: (state, action: PayloadAction<any>) => {
            state.addressData = action.payload;
        },
        resetAddressPageChange: (state) => {
            state.selectedPage = initialState.selectedPage;
        }
    },
});

export const { addressPageChange, resetAddressPageChange, userAddressData } = AddressPageChange.actions;
export const PageData = (state: RootState) => state.PageChangeReducer.selectedPage;
export default AddressPageChange.reducer;
