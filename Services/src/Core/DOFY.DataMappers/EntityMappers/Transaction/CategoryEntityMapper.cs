namespace DOFY.DataMappers;

using AutoMapper;

public class CategoryEntityMapper : ITypeConverter<DBO.Category, ViewEntities.Category>
{
    public ViewEntities.Category Convert(DBO.Category source, ViewEntities.Category destination, ResolutionContext context)
    {
        return new ViewEntities.Category
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
