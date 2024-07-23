namespace DOFY.DataMappers;

using AutoMapper;

public class AddressTypeEntityMapper : ITypeConverter<DBO.AddressType, ViewEntities.AddressType>
{
    public ViewEntities.AddressType Convert(DBO.AddressType source, ViewEntities.AddressType destination, ResolutionContext context)
    {
        return new ViewEntities.AddressType
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
