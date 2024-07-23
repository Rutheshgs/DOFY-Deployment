namespace DOFY.DataMappers;

using AutoMapper;

public class CancellationTypeModelMapper : ITypeConverter<ViewEntities.CancellationType, DBO.CancellationType>
{
    public DBO.CancellationType Convert(ViewEntities.CancellationType source, DBO.CancellationType destination, ResolutionContext context)
    {
        return new DBO.CancellationType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            EntityTypeId = source?.EntityTypeId ?? 0,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            SecondLanguage = source?.SecondLanguage
        };
    }
}
