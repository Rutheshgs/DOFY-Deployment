import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGetOrderSummaryModel } from '../../../models/GetOrderSummary.Model';
import { RootState } from "../../store/Store"

interface OrderSummaryInfoParam {
    OrderSummaryInfoData: IGetOrderSummaryModel
}

const initialState: OrderSummaryInfoParam = {
    OrderSummaryInfoData: {} as IGetOrderSummaryModel
};

const getOrderSummaryInfo = createSlice({
    name: 'OrderSummaryInfoData',
    initialState,
    reducers: {
        OrderSummaryInfo: (state, action: PayloadAction<any>) => {
            state.OrderSummaryInfoData = action.payload;
        },
    },
});

export const { OrderSummaryInfo } = getOrderSummaryInfo.actions;
export const ProfileData = (state: RootState) => state.OrderSummaryInfoReducer.OrderSummaryInfoData;
export default getOrderSummaryInfo.reducer;