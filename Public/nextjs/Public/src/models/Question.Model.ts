export interface IQuestionModel {
    Id: number;
    QuestionnaireTemplateId: number;
    AnswerType: string;
    Selected: any;
    RowOrder: number;
    Threshold: number;
    Name: string;
    QuestionnaireTypeEnumName: string;
    Identifier: number;
    ParentId: number;
    DisableWarranty: boolean;
    AppreciateCalculation:boolean;
    DepreciateCalculation:boolean;
    QuestionnaireTypeId: number;
    IgnoreResponseIds:string
}