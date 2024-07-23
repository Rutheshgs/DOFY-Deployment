namespace DOFY.DataMappers;

using AutoMapper;

public class AddressTypeModelMapper : ITypeConverter<ViewEntities.AddressType, DBO.AddressType>
{
    public DBO.AddressType Convert(ViewEntities.AddressType source, DBO.AddressType destination, ResolutionContext context)
    {
        return new DBO.AddressType
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
