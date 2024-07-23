namespace DOFY.DataMappers;

using AutoMapper;

public class OSTypeEntityMapper : ITypeConverter<DBO.OSType, ViewEntities.OSType>
{
    public ViewEntities.OSType Convert(DBO.OSType source, ViewEntities.OSType destination, ResolutionContext context)
    {
        return new ViewEntities.OSType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
