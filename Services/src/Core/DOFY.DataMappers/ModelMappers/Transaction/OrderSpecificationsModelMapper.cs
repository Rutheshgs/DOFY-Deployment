namespace DOFY.DataMappers;

using AutoMapper;

public class OrderSpecificationsModelMapper : ITypeConverter<ViewEntities.OrderSpecifications, DBO.OrderSpecifications>
{
    public DBO.OrderSpecifications Convert(ViewEntities.OrderSpecifications source, DBO.OrderSpecifications destination, ResolutionContext context)
    {
        return new DBO.OrderSpecifications
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            IMEINumber = source?.IMEINumber ?? null,
            IEMIVerified = source?.IEMIVerified ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };
    }
}
