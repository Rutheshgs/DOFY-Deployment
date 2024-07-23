import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    ordersData: [],
    navigate: routerPage,
    orderId: number
}
type routerPage = "vieworders" | "viewdetail";

const initialState: NavigationPage = {
    navigate: "vieworders",
    ordersData: [],
    orderId: 0
};

const OrdersHandler = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        userOrdersData: (state, action: PayloadAction<any>) => {
            state.ordersData = action.payload;
        },
        userOrdersPageChange: (state, action: PayloadAction<{ id: number, route: routerPage }>) => {
            state.orderId = action.payload.id;
            state.navigate = action.payload.route;
        },
        ResetuserOrdersPageChange: (state) => {
            state.navigate = initialState.navigate;
            state.orderId = initialState.orderId;
            state.ordersData = initialState.ordersData;
        }
    },
});

export const { userOrdersData, userOrdersPageChange, ResetuserOrdersPageChange } = OrdersHandler.actions;
export const PageData = (state: RootState) => state.OrdersReducer.ordersData;
export default OrdersHandler.reducer;
