namespace DOFY.DataMappers;

using AutoMapper;

public class OrderPartsEntityMapper : ITypeConverter<DBO.OrderParts, ViewEntities.OrderParts>
{
    public ViewEntities.OrderParts Convert(DBO.OrderParts source, ViewEntities.OrderParts destination, ResolutionContext context)
    {
        return new ViewEntities.OrderParts
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
