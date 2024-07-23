namespace DOFY.DataMappers;

using AutoMapper;

public class ServiceTypeModelMapper : ITypeConverter<ViewEntities.ServiceType, DBO.ServiceType>
{
    public DBO.ServiceType Convert(ViewEntities.ServiceType source, DBO.ServiceType destination, ResolutionContext context)
    {
        return new DBO.ServiceType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Code = source?.Code,
            RowOrder = source?.RowOrder ?? 0,
            ThumbnailPath = source?.ThumbnailPath,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
        };
    }
}
