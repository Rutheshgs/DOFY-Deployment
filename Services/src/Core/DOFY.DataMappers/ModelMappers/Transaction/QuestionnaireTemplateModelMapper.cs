namespace DOFY.DataMappers;

using AutoMapper;

public class QuestionnaireTemplateModelMapper : ITypeConverter<ViewEntities.QuestionnaireTemplate, DBO.QuestionnaireTemplate>
{
    public DBO.QuestionnaireTemplate Convert(ViewEntities.QuestionnaireTemplate source, DBO.QuestionnaireTemplate destination, ResolutionContext context)
    {
        return new DBO.QuestionnaireTemplate
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
            Required = source?.Required ?? false,
            CategoryId = source?.CategoryId ?? 0,
            DisableWarranty = source?.DisableWarranty ?? false,
            Icons = source?.Icons,
            DepreciateCalculation = source?.DepreciateCalculation,
            AppreciateCalculation = source?.AppreciateCalculation,
            IsEditable = source?.IsEditable ?? false,
            NextQuestionYes = source?.NextQuestionYes,
            NextQuestionNo = source?.NextQuestionNo,
            ResponseYes = source?.ResponseYes,
            ResponseNo = source?.ResponseNo,
            SecondLanguage = source?.SecondLanguage,
            SubHeadingSecondLanguage = source?.SubHeadingSecondLanguage,
            ResponseYesSecondLanguage = source?.ResponseYesSecondLanguage,
            ResponseNoSecondLanguage = source?.ResponseNoSecondLanguage,
            IgnoreResponseIds = source?.IgnoreResponseIds,

        };
    }
}
