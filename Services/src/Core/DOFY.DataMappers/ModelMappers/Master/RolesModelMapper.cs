namespace DOFY.DataMappers;

using AutoMapper;

public class RolesModelMapper : ITypeConverter<ViewEntities.Roles, DBO.Roles>
{
    public DBO.Roles Convert(ViewEntities.Roles source, DBO.Roles destination, ResolutionContext context)
    {
        return new DBO.Roles
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
