namespace DOFY.DataMappers;

using AutoMapper;

public class RolesEntityMapper : ITypeConverter<DBO.Roles, ViewEntities.Roles>
{
    public ViewEntities.Roles Convert(DBO.Roles source, ViewEntities.Roles destination, ResolutionContext context)
    {
        return new ViewEntities.Roles
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            Description = source?.Description,
            EnumName = source?.EnumName,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
