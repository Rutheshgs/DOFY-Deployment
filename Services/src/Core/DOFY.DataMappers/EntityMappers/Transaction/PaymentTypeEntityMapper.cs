namespace DOFY.DataMappers;

using AutoMapper;

public class PaymentTypeEntityMapper : ITypeConverter<DBO.PaymentType, ViewEntities.PaymentType>
{
    public ViewEntities.PaymentType Convert(DBO.PaymentType source, ViewEntities.PaymentType destination, ResolutionContext context)
    {
        return new ViewEntities.PaymentType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
        };

    }
}
