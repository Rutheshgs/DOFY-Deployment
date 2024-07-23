namespace DOFY.DataMappers;

using AutoMapper;

public class OrderPartsModelMapper : ITypeConverter<ViewEntities.OrderParts, DBO.OrderParts>
{
    public DBO.OrderParts Convert(ViewEntities.OrderParts source, DBO.OrderParts destination, ResolutionContext context)
    {
        return new DBO.OrderParts
        {
            Id = source?.Id ?? 0,
            OrderId = source?.OrderId ?? 0,
            RepairTypeId = source?.RepairTypeId ?? 0,
            PartTypeId = source?.PartTypeId ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
        };
    }
}
