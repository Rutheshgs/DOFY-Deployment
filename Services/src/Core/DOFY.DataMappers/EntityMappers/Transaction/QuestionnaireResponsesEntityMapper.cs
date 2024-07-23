namespace DOFY.DataMappers;

using AutoMapper;

public class QuestionnaireResponsesEntityMapper : ITypeConverter<DBO.QuestionnaireResponses, ViewEntities.QuestionnaireResponses>
{
    public ViewEntities.QuestionnaireResponses Convert(DBO.QuestionnaireResponses source, ViewEntities.QuestionnaireResponses destination, ResolutionContext context)
    {
        return new ViewEntities.QuestionnaireResponses
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            QuestionnaireTemplateId = source?.QuestionnaireTemplateId ?? 0,
            Threshold = source?.Threshold ?? 0,
            Selected = source?.Selected ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            Version = source?.Version ?? 0,
        };
    }
}
