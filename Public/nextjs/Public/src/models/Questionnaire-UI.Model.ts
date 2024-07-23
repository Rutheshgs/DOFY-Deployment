import { IQuestionTypeModel } from "./QuestionsType.Model";

export interface IQuestOptions {
    QuestionName: string;
    Lists: Array<IQuestionTypeModel>
    QuestionnaireTypeDisplayName: string;
}

export interface IQuestionnaireUIModel {
    QuestionnaireTypeDisplayName: string;
    Header: string;
    Yes_No: Array<IQuestionTypeModel>;
    Multi_Select: Array<IQuestionTypeModel>;
    Options: Array<IQuestOptions>;
    QuestionnaireTypeEnumName: string;
}