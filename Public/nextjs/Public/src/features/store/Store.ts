import { configureStore } from '@reduxjs/toolkit';
import AddressPageChangeReducers from '../reducers/address/AddressPageChange.Reducers';
import InputParamChangeReducer from '../reducers/shared/InputParams.Reducers';
import PageChangeReducer from '../reducers/selldevice/PageChange.Reducer';
import DeviceInfoReducers from '../reducers/device/DeviceInfo.Reducers';
import NewUserNumberReducer from '../reducers/registration/Registration.Reducers';
import QuestionnaireReducer from "../reducers/questionnaire/Questionnaire.Reducers"
import RepairPageChangeReducer from '../reducers/repair/RepairPageChange.Reducer';
import IdChangerReducer from '../reducers/shared/IdChanger.Reducer';
import RepairDeviceSummaryInfoReducer from '../reducers/repairdevicesummary/RepairDeviceSummary.Reducers'
import ModelChangerReducer from '../reducers/login/LoginModel.Reducer';
import OrdersReducer from '../reducers/orders/Orders.Reducers';
import userLocation from '../reducers/locationmodal/Location.Reducers';
import FindDeviceReducers from '../reducers/finddevice/FindDevice.Reducers';
import StepProgressBarReducers from '../reducers/stepprogressbar/StepProgressBar.Reducers';
import DeviceNameReducers from '../reducers/devicename/DeviceName.Reducers';

export const store = configureStore({
  reducer: {
    PageChangeReducer: PageChangeReducer,
    InputParamChangeReducer: InputParamChangeReducer,
    AddressPageChangeReducer: AddressPageChangeReducers,
    DeviceInfoReducer: DeviceInfoReducers,
    NewUserRegistrationReducer: NewUserNumberReducer,
    QuestionnaireReducer: QuestionnaireReducer,
    RepairPageChangeReducer: RepairPageChangeReducer,
    IdChangerReducers: IdChangerReducer,
    ModelChangerReducer: ModelChangerReducer,
    OrdersReducer: OrdersReducer,
    RepairDeviceSummaryInfoReducer: RepairDeviceSummaryInfoReducer,
    userLocation: userLocation,
    FindDevice: FindDeviceReducers,
    StepProgressBar: StepProgressBarReducers,
    DeviceNameChange: DeviceNameReducers
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch