import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface ActivePage {
    activePage: Array<number>
}

const initialState: ActivePage = {
    activePage: [1]
};

const StepProgressBar = createSlice({
    name: 'StepProgressBar',
    initialState,
    reducers: {
        StepProgressBarInput: (state, action: PayloadAction<Array<number>>) => {
            state.activePage = action.payload;
        },
        StepProgressBarReset: (state) => {
            state.activePage = initialState.activePage;
        }
    },
});

export const { StepProgressBarInput, StepProgressBarReset } = StepProgressBar.actions;
export const StepProgressBarData = (state: RootState) => state.StepProgressBar.activePage;
export default StepProgressBar.reducer;
