namespace DOFY.DataMappers;

using AutoMapper;

public class OrderWishListModelMapper : ITypeConverter<ViewEntities.OrderWishList, DBO.OrderWishList>
{
    public DBO.OrderWishList Convert(ViewEntities.OrderWishList source, DBO.OrderWishList destination, ResolutionContext context)
    {
        return new DBO.OrderWishList
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            ModelVariantId = source?.ModelVariantId ?? 0,
            ServiceTypeId = source?.ServiceTypeId ?? null,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            MaximumValue = source?.MaximumValue ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
