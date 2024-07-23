import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store";

interface modelParam {
    isLocation: boolean
}

const initialState: modelParam = {
    isLocation: false
};

const userLocation = createSlice({
    name: 'locationHandler',
    initialState,
    reducers: {
        userLocationChanger: (state, action: PayloadAction<boolean>) => {
            state.isLocation = action.payload;
        },
    },
});

export const { userLocationChanger } = userLocation.actions;
export const locationModelChanger = (state: RootState) => state.userLocation;
export default userLocation.reducer;
