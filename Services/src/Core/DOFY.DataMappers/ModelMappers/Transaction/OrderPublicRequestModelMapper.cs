namespace DOFY.DataMappers;

using AutoMapper;

public class OrderPublicRequestModelMapper : ITypeConverter<ViewEntities.OrderPublicRequest, DBO.OrderPublicRequest>
{
    public DBO.OrderPublicRequest Convert(ViewEntities.OrderPublicRequest source, DBO.OrderPublicRequest destination, ResolutionContext context)
    {
        return new DBO.OrderPublicRequest
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            Name = source?.Name,
            MobileNumber = source?.MobileNumber,
            Email = source?.Email,
            CityId = source?.CityId ?? 0,
            Area = source?.Area,
            ProductTypeId = source?.ProductTypeId,
            BrandName = source?.BrandName,
            BrandModelName = source?.BrandModelName,
            ModelVariant = source?.ModelVariant,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? true,
        };
    }
}
