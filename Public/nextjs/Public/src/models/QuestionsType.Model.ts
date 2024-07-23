export interface IQuestionTypeModel {
    Active: boolean;
    AnswerType: string;
    Created: any;
    CreatedBy: number;
    DisplayInList: boolean;
    DisplayName: string;
    SubHeading:string;
    Enabled: boolean;
    EnumName: any;
    Id: number;
    Identifier: number;
    IsValid: boolean;
    ModelVariantId: number;
    Modified: any;
    ModifiedBy: number;
    Name: string;
    OSTypeId: number;
    ParentId: number;
    ProductTypeId: number;
    QuestionnaireTypeDisplayName: string;
    QuestionnaireTypeEnumName: string;
    QuestionnaireTypeId: number;
    QuestionnaireTypeName: string;
    Questions: Array<IQuestionTypeModel>;
    Response: boolean;
    ResponseText: any;
    RowOrder: number;
    Threshold: number;
    ThresholdLevel: number;
    ThumbnailPath: string;
    Type: string;
    NextQuestionYes: number;
    NextQuestionNo: number;
    DepreciateCalculation: boolean;
    AppreciateCalculation: boolean;
    Required: boolean;
    DisableWarranty: boolean;
    Icons: string;
    ValidationErrors: {};
    IgnoreResponseIds:string
}

export interface sections {
    SectionIndex: number;
    SectionId: number,
    DisplayInList: boolean;
}