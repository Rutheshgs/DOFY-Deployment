import { configureStore } from "@reduxjs/toolkit";
import PageChangeReducer from "../reducers/DocumentScan/PageChange.Reducer";
import ResetPageChangeReducer from "../reducers/DocumentScan/PageChange.Reducer";
import RequotePageChangeReducer from "../reducers/Reqoute/RequotePageChange.Reducer";
import OtpReducers from '../reducers/otp/Otp.Reducers';
import UserNameReducers from "../reducers/username/UserName.Reducers";
import OrderSummaryInfoReducer from "../reducers/ordersummary/OrderSummaryInfo.Reducers";
import RepairRequoteInfoReducer from '../reducers/RepairRequote/RepairRequoteSummary.Reducers';
import FilterDataReducers from '../reducers/filterdata/FilterData.Reducers';
import FindDeviceReducers from "../reducers/finddevice/FindDevice.Reducers";

export const store = configureStore({
  reducer: {
    PageChangeReducer: PageChangeReducer,
    resetPageReducer: ResetPageChangeReducer,
    RequotePageChangeReducer: RequotePageChangeReducer,
    OtpReducers: OtpReducers,
    UserNameReducers: UserNameReducers,
    OrderSummaryInfoReducer: OrderSummaryInfoReducer,
    RepairRequoteInfoReducer: RepairRequoteInfoReducer,
    FindDevice: FindDeviceReducers,
    FilterDataReducers: FilterDataReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
