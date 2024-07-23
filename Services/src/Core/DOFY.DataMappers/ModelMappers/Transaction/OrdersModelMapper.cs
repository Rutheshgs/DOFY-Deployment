namespace DOFY.DataMappers;

using AutoMapper;

public class OrdersModelMapper : ITypeConverter<ViewEntities.Orders, DBO.Orders>
{
    public DBO.Orders Convert(ViewEntities.Orders source, DBO.Orders destination, ResolutionContext context)
    {
        return new DBO.Orders
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            ServiceTypeId = source?.ServiceTypeId ?? null,
            ModelVariantId = source?.ModelVariantId ?? null,
            StatusId = source?.StatusId ?? null,
            CancellationTypeId = source?.CancellationTypeId ?? null,
            OrderCode = source?.OrderCode,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            OrderDate = source?.OrderDate ?? null,
            CompletedDate = source?.CompletedDate ?? null,
            SeriesModelId = source?.SeriesModelId ?? null,
            SeriesModelColorId = source?.SeriesModelColorId ?? null,
            ReferralCode = source?.ReferralCode,
            ReferralCodeId = source?.ReferralCodeId,
            UTMReference = source?.UTMReference ?? null,
            OrderLanguage = source?.OrderLanguage ?? string.Empty
        };
    }
}
