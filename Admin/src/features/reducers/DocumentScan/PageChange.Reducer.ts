import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";

interface NavigationPage {
  selectedPage: string;
}

type routerPage = "IMEIPage" | "UploadImagePage" | "SignaturePad" | "OtpScreen" | "Adjustment";

const initialState: NavigationPage = {
  selectedPage: "IMEIPage",
};

const PageChange = createSlice({
  name: "PageChange",
  initialState,
  reducers: {
    pageChange: (state, action: PayloadAction<routerPage>) => {
      state.selectedPage = action.payload;
    },
    resetPageChange: (state) => {
      state.selectedPage = initialState.selectedPage;
    },
  },
});

export const { pageChange, resetPageChange } = PageChange.actions;
export const PageData = (state: RootState) =>
  state.PageChangeReducer.selectedPage;
export default PageChange.reducer;
