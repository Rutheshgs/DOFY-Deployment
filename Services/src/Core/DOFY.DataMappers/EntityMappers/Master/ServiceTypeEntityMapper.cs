namespace DOFY.DataMappers;

using AutoMapper;

public class ServiceTypeEntityMapper : ITypeConverter<DBO.ServiceType, ViewEntities.ServiceType>
{
    public ViewEntities.ServiceType Convert(DBO.ServiceType source, ViewEntities.ServiceType destination, ResolutionContext context)
    {
        return new ViewEntities.ServiceType
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
