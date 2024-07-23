namespace DOFY.DataMappers;

using AutoMapper;

public class OrdersEntityMapper : ITypeConverter<DBO.Orders, ViewEntities.Orders>
{
    public ViewEntities.Orders Convert(DBO.Orders source, ViewEntities.Orders destination, ResolutionContext context)
    {
        return new ViewEntities.Orders
        {
            Id = source?.Id ?? 0,
            PersonId = source?.PersonId ?? 0,
            ServiceTypeId = source?.ServiceTypeId ?? null,
            ModelVariantId = source?.ModelVariantId ?? 0,
            StatusId = source?.StatusId ?? null,
            CancellationTypeId = source?.CancellationTypeId ?? null,
            OrderCode = source?.OrderCode ?? string.Empty,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            OrderDate = source?.OrderDate ?? null,
            CompletedDate = source?.CompletedDate ?? null,
            SeriesModelId = source?.SeriesModelId ?? null,
            ReferralCode = source?.ReferralCode,
            ReferralCodeId = source?.ReferralCodeId ?? null,
            OrderLanguage = source?.OrderLanguage ?? string.Empty
        };
    }
}
