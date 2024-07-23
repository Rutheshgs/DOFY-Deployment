namespace DOFY.DataMappers;

using AutoMapper;

public class OrderHistoryModelMapper : ITypeConverter<ViewEntities.OrderHistory, DBO.OrderHistory>
{
    public DBO.OrderHistory Convert(ViewEntities.OrderHistory source, DBO.OrderHistory destination, ResolutionContext context)
    {
        return new DBO.OrderHistory
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            StatusId = source?.StatusId ?? 0,
            TransactionDate = source?.TransactionDate ?? null,
            AssignedTo = source?.AssignedTo ?? null,
            Amount = source?.Amount ?? null,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            AppointmentDate = source?.AppointmentDate ?? null,
            Comments = source?.Comments ?? string.Empty,
        };
    }
}