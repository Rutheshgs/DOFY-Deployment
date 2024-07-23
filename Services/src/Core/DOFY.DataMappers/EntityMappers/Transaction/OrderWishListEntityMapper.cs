namespace DOFY.DataMappers;

using AutoMapper;

public class OrderWishListEntityMapper : ITypeConverter<DBO.OrderWishList, ViewEntities.OrderWishList>
{
    public ViewEntities.OrderWishList Convert(DBO.OrderWishList source, ViewEntities.OrderWishList destination, ResolutionContext context)
    {
        return new ViewEntities.OrderWishList
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
            Active = source?.Active ?? true,
        };
    }
}
