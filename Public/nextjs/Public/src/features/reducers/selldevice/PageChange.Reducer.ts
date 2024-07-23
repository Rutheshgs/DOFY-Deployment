import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    selectedPage: string,
    page: string
}

type routerPage = "selectdevice" | "selectbrand" | "selectmodel" | "selectseries" | "selectvariant" | "questionnaire";

const initialState: NavigationPage = {
    selectedPage: "selectdevice",
    page: ""
};

const PageChange = createSlice({
    name: 'PageChange',
    initialState,
    reducers: {
        pageChange: (state, action: PayloadAction<routerPage>) => {
            state.selectedPage = action.payload;
        },
        routerChange: (state, action: PayloadAction<any>) => {
            state.page = action.payload;
        },
        resetPageChange: (state) => {
            state.selectedPage = initialState.selectedPage;
        }
    },
});

export const { pageChange, resetPageChange, routerChange } = PageChange.actions;
export const PageData = (state: RootState) => state.PageChangeReducer.selectedPage;
export default PageChange.reducer;
