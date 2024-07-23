export interface IQuestionTypeModel {
    Active: boolean;
    AnswerType: string;
    OrderId: number;
    Created: any;
    CreatedBy: number;
    DisplayInList: boolean;
    DisplayName: string;
    SubHeading: string;
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
    Response: any;
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
    IgnoreResponseIds: string;
    Selected: any;
}

export interface IQuestionnaireUIModel {
    QuestionnaireTypeDisplayName: string;
    Header: string;
    Yes_No: Array<IQuestionTypeModel>;
    Multi_Select: Array<IQuestionTypeModel>;
    Options: Array<IQuestOptions>;
    QuestionnaireTypeEnumName: string;
}

export interface IQuestOptions {
    QuestionName: string;
    Lists: Array<IQuestionTypeModel>
    QuestionnaireTypeDisplayName: string;
}

export interface IQuestionModel {
    Id: number;
    AnswerType: string;
    OrderId: number;
    Selected: boolean;
    QuestionnaireTemplateId: number;
    RowOrder: number;
    Threshold: number;
    Name: string;
    QuestionnaireTypeEnumName: string;
    Identifier: number;
    ParentId: number;
    DisableWarranty: boolean;
    AppreciateCalculation: boolean;
    DepreciateCalculation: boolean;
    QuestionnaireTypeId: number;
    IgnoreResponseIds: string;
    NextQuestionNo:number;
}

export interface IQuestionnaireModel {
    ProductTypeId: number,
    QuestionnaireTypeId: any,
    OSTypeId: number,
    ModelVariantId: number,
    ParentId: any
}

export interface sections {
    SectionIndex: number;
    SectionId: number,
    DisplayInList: boolean;
}