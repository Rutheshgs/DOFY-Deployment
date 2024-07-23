namespace DOFY.DataMappers;

using AutoMapper;

public class OrderPayoutEntityMapper : ITypeConverter<DBO.OrderPayout, ViewEntities.OrderPayout>
{
    public ViewEntities.OrderPayout Convert(DBO.OrderPayout source, ViewEntities.OrderPayout destination, ResolutionContext context)
    {
        return new ViewEntities.OrderPayout
        {
            Id = source?.Id ?? 0,
            SuggestedCost = source?.SuggestedCost ?? 0,
            RequoteAmount = source?.RequoteAmount ?? 0,
            ReferralAmount = source?.ReferralAmount ?? 0,
            Adjustment = source?.Adjustment ?? 0,
            TotalAmount = source?.TotalAmount ?? 0,
            CustomerExpectation = source?.CustomerExpectation ?? null,
            FinalPaid = source?.FinalPaid ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
        };
    }
}