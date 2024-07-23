namespace DOFY.DataMappers;

using AutoMapper;

public class PaymentDetailsModelMapper : ITypeConverter<ViewEntities.PaymentDetails, DBO.PaymentDetails>
{
    public DBO.PaymentDetails Convert(ViewEntities.PaymentDetails source, DBO.PaymentDetails destination, ResolutionContext context)
    {
        return new DBO.PaymentDetails
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            PersonId = source?.PersonId ?? 0,
            PaymentTypeId = source?.PaymentTypeId ?? 0,
            StatusId = source?.StatusId ?? 0,
            Notes = source?.Notes ?? 0,
            PaymentReferenceNumber = source?.PaymentReferenceNumber ?? Guid.Empty,
            PaymentGatewayStatus = source?.PaymentGatewayStatus ?? null,
            PaymentDateTime = (DateTime)(source?.PaymentDateTime ?? null),
            DebitAmount = source?.DebitAmount ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
