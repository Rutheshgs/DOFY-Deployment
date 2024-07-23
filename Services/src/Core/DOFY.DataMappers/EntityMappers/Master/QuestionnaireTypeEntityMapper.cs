namespace DOFY.DataMappers;

using AutoMapper;

public class QuestionnaireTypeEntityMapper : ITypeConverter<DBO.QuestionnaireType, ViewEntities.QuestionnaireType>
{
    public ViewEntities.QuestionnaireType Convert(DBO.QuestionnaireType source, ViewEntities.QuestionnaireType destination, ResolutionContext context)
    {
        return new ViewEntities.QuestionnaireType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
            ProductTypeId = source?.ProductTypeId ?? 0,
            Section = source?.Section ?? 0,
            ParentSection = source?.ParentSection ?? 0,
            ChildSectionFailure = source?.ChildSectionFailure ?? null,
            ChildSectionSuccess = source?.ChildSectionSuccess ?? 0,
        };
    }
}
