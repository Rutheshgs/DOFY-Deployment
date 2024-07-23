namespace DOFY.DataMappers;

using AutoMapper;

public class OSTypeModelMapper : ITypeConverter<ViewEntities.OSType, DBO.OSType>
{
    public DBO.OSType Convert(ViewEntities.OSType source, DBO.OSType destination, ResolutionContext context)
    {
        return new DBO.OSType
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
