namespace DOFY.DataMappers;

using AutoMapper;

public class UserAddressModelMapper : ITypeConverter<ViewEntities.UserAddress, DBO.UserAddress>
{
    public DBO.UserAddress Convert(ViewEntities.UserAddress source, DBO.UserAddress destination, ResolutionContext context)
    {
        return new DBO.UserAddress
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            CountryId = source?.CountryId ?? null,
            StateId = source?.StateId ?? null,
            CityId = source?.CityId ?? null,
            PinCode = source?.PinCode ?? string.Empty,
            Address = source?.Address ?? string.Empty,
            MobilePhone = source?.MobilePhone ?? null,
            WorkPhone = source?.WorkPhone ?? null,
            HomePhone = source?.HomePhone ?? null,
            EmailId = source?.EmailId ?? null,
            LocationPin = source?.LocationPin ?? null,
            IsDefault = source?.IsDefault ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
            AddressTypeId = source?.AddressTypeId ?? null,
            LocationId = source?.LocationId ?? null,
            Name = source?.Name,
            Address1 = source?.Address1 ?? null,
            LandMark = source?.LandMark ?? null,
            ApartmentNumber = source?.ApartmentNumber?? null

        };
    }
}
