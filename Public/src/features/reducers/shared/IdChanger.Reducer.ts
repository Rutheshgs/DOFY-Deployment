import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface Inputparams {
    OrderId: number
}

const initialState: Inputparams = {
    OrderId: 0
};

const IdChangerHandler = createSlice({
    name: 'IdChanger',
    initialState,
    reducers: {
        IdChanger: (state, action: PayloadAction<any>) => {
            state.OrderId = action.payload;
        },
        resetIdChanger: (state) => {
            state.OrderId = initialState.OrderId;
        }
    },
});

export const { IdChanger, resetIdChanger } = IdChangerHandler.actions;
export const PageData = (state: RootState) => state.IdChangerReducers;
export default IdChangerHandler.reducer;
