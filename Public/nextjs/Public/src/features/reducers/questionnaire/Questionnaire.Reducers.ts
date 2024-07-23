import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../../store/Store"

type QuestionType = "QuestionData" | "questionsThumbnailPath";

interface QuestionParam {
    questionsData: any;
    questionsThumbnailPath: string;
    selectedQuestions: []
}

const initialState: QuestionParam = {
    questionsData: [],
    questionsThumbnailPath: "",
    selectedQuestions: []
};

const QuestionsData = createSlice({
    name: 'getQuestions',
    initialState,
    reducers: {
        getQuestions: (state, action: PayloadAction<{ payload: any, type: QuestionType }>) => {
            switch (action.payload.type) {
                case "QuestionData": {
                    state.questionsData = action.payload.payload;
                    return state;
                }
                case "questionsThumbnailPath": {
                    state.questionsThumbnailPath = action.payload.payload;
                    return state;
                }
                default: return state;
            }
        },
        SelectedQuestions: (state, action: PayloadAction<any>) => {
            state.selectedQuestions = action.payload;
        },
        ResetSelectedQuestions: (state) => {
            state.selectedQuestions = initialState.selectedQuestions;
        },
        resetAllQuestions: (state) => {
            state.questionsData = initialState.questionsData;
            state.questionsThumbnailPath = initialState.questionsThumbnailPath;
        }
    },
});

export const { getQuestions, resetAllQuestions, SelectedQuestions, ResetSelectedQuestions } = QuestionsData.actions;
export const Questions = (state: RootState) => state.QuestionnaireReducer;
export default QuestionsData.reducer;
