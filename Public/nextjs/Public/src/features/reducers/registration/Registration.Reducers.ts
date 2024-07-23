import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

interface NavigationPage {
    NewNumber: any
}

const initialState: NavigationPage = {
    NewNumber: ""
};

const newUserRegistration = createSlice({
    name: 'newNumber',
    initialState,
    reducers: {
        newUser: (state, action: PayloadAction<any>) => {
            state.NewNumber = action.payload;
        },
        resetNewUser: (state) => {
            state.NewNumber = initialState.NewNumber;
        }
    },
});

export const { newUser, resetNewUser } = newUserRegistration.actions;
export const newUserNumber = (state: RootState) => state.NewUserRegistrationReducer.NewNumber;
export default newUserRegistration.reducer;
