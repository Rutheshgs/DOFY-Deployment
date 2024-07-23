namespace DOFY.DataMappers;

using AutoMapper;

public class QuestionnaireTypeModelMapper : ITypeConverter<ViewEntities.QuestionnaireType, DBO.QuestionnaireType>
{
    public DBO.QuestionnaireType Convert(ViewEntities.QuestionnaireType source, DBO.QuestionnaireType destination, ResolutionContext context)
    {
        return new DBO.QuestionnaireType
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
