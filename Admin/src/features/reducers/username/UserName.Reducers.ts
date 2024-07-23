import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/Store";

interface UserNameInfoParam {
    UserNameInfoData: string;
}

const initialState: UserNameInfoParam = {
    UserNameInfoData: "",
};

const getUserName = createSlice({
    name: 'UserNameInfoData',
    initialState,
    reducers: {
        UserNameData: (state, action: PayloadAction<any>) => {
            state.UserNameInfoData = action.payload
        }
    },
})

export const { UserNameData } = getUserName.actions;
export const UserNameInfoData = (state: RootState) => state.UserNameReducers.UserNameInfoData;
export default getUserName.reducer;
