namespace DOFY.DataMappers;

using AutoMapper;

public class QuestionnaireTemplateEntityMapper : ITypeConverter<DBO.QuestionnaireTemplate, ViewEntities.QuestionnaireTemplate>
{
    public ViewEntities.QuestionnaireTemplate Convert(DBO.QuestionnaireTemplate source, ViewEntities.QuestionnaireTemplate destination, ResolutionContext context)
    {
        return new ViewEntities.QuestionnaireTemplate
        {
            Id = source?.Id ?? 0,
            ProductTypeId = source?.ProductTypeId ?? 0,
            QuestionnaireTypeId = source?.QuestionnaireTypeId ?? 0,
            OSTypeId = source?.OSTypeId ?? 0,
            ModelVariantId = source?.ModelVariantId ?? null,
            Identifier = source?.Identifier ?? 0,
            ParentId = source?.ParentId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            SubHeading = source?.SubHeading,
            Type = source?.Type,
            AnswerType = source?.AnswerType,
            Threshold = source?.Threshold ?? 0,
            ThresholdLevel = source?.ThresholdLevel ?? 0,
            ThumbnailPath = source?.ThumbnailPath ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            Enabled = source?.Enabled ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            IsEditable = source?.IsEditable ?? false,
            ResponseYes = source?.ResponseYes,
            ResponseNo = source?.ResponseNo,
            DepreciateCalculation = source?.DepreciateCalculation,
            AppreciateCalculation = source?.AppreciateCalculation,
            NextQuestionYes = source?.NextQuestionYes,
            NextQuestionNo = source?.NextQuestionNo,
            Required = source?.Required ?? false,
            CategoryId = source?.CategoryId ?? 0,
            DisableWarranty = source?.DisableWarranty ?? false,
            Icons = source?.Icons,
            SecondLanguage = source?.SecondLanguage,
            SubHeadingSecondLanguage = source?.SubHeadingSecondLanguage,
            ResponseYesSecondLanguage = source?.ResponseYesSecondLanguage,
            ResponseNoSecondLanguage = source?.ResponseNoSecondLanguage,
            IgnoreResponseIds = source?.IgnoreResponseIds,
        };
    }
}
