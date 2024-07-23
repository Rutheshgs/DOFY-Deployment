import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    selectedPage: string
}

type routerPage = "selectdevice" | "selectbrand" | "selectmodel" | "selectseries" | "selectcolour" | "questionnaire";

const initialState: NavigationPage = {
    selectedPage: "selectdevice"
};

const RepairPageChange = createSlice({
    name: 'RepairPageChange',
    initialState,
    reducers: {
        RepairpageChange: (state, action: PayloadAction<routerPage>) => {
            state.selectedPage = action.payload;
        },
        resetPageChange: (state) => {
            state.selectedPage = initialState.selectedPage;
        }
    },
});

export const { RepairpageChange, resetPageChange } = RepairPageChange.actions;
export const PageData = (state: RootState) => state.PageChangeReducer.selectedPage;
export default RepairPageChange.reducer;
