export interface IQuestionnaireModel {
    ProductTypeId: number,
    QuestionnaireTypeId: any,
    OSTypeId: number,
    ModelVariantId: number,
    ParentId: any
}

export interface IQuestionnaireThumbnailModel {
    Path: string,
    DisplayText: string,
    RowOrder?: number,
}