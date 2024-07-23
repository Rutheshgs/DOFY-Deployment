namespace DOFY.DataMappers;

using AutoMapper;

public class CategoryModelMapper : ITypeConverter<ViewEntities.Category, DBO.Category>
{
    public DBO.Category Convert(ViewEntities.Category source, DBO.Category destination, ResolutionContext context)
    {
        return new DBO.Category
        {
            Id = source?.Id ?? 0,
            EntityTypeId = source?.EntityTypeId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Description = source?.Description,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
