import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface RepairDeviceSummaryInfoParam {
    RepairDeviceSummaryInfoData: [{}],
    QuestionsThumbnailPath: string,
    RepairDeviceSummaryInfoPrice: number
}

const initialState: RepairDeviceSummaryInfoParam = {
    RepairDeviceSummaryInfoData: [{}],
    QuestionsThumbnailPath: "",
    RepairDeviceSummaryInfoPrice: 0
};

const getRepairDeviceSummaryInfo = createSlice({
    name: 'RepairDeviceSummaryInfoData',
    initialState,
    reducers: {
        RepairDeviceSummaryInfo: (state, action: PayloadAction<any>) => {
            state.RepairDeviceSummaryInfoData = action.payload;
        },
        PriceRepairDeviceSummaryInfo: (state, action: PayloadAction<any>) => {
            state.RepairDeviceSummaryInfoPrice = action.payload;
        },
        getQuestionsThumbnailPath: (state, action: PayloadAction<any>) => {
            state.QuestionsThumbnailPath = action.payload;
        },
        resetRepairDeviceSummaryInfo: (state) => {
            state.RepairDeviceSummaryInfoData = initialState.RepairDeviceSummaryInfoData;
        },
    },
});

export const { RepairDeviceSummaryInfo, PriceRepairDeviceSummaryInfo, resetRepairDeviceSummaryInfo, getQuestionsThumbnailPath } = getRepairDeviceSummaryInfo.actions;
export const ProfileData = (state: RootState) => state.RepairDeviceSummaryInfoReducer.RepairDeviceSummaryInfoData;
export default getRepairDeviceSummaryInfo.reducer;
