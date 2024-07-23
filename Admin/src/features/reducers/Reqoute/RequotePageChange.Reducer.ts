import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    selectedPage: string
}

type routerPage = "FunctionalCondition" | "Accessories" 

const initialState: NavigationPage = {
    selectedPage: "FunctionalCondition"
};

const RequotePageChange = createSlice({
    name: 'PageChange',
    initialState,
    reducers: {
        requotepageChange: (state, action: PayloadAction<routerPage>) => {
            state.selectedPage = action.payload;
        },
        resetRequotePageChange: (state) => {
            state.selectedPage = initialState.selectedPage;
        }
    },
});

export const { requotepageChange, resetRequotePageChange } = RequotePageChange.actions;
export const PageData = (state: RootState) => state.RequotePageChangeReducer.selectedPage;
export default RequotePageChange.reducer;
