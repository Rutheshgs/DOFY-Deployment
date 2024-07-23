namespace DOFY.DataMappers;

using AutoMapper;

public class PaymentTypeModelMapper : ITypeConverter<ViewEntities.PaymentType, DBO.PaymentType>
{
    public DBO.PaymentType Convert(ViewEntities.PaymentType source, DBO.PaymentType destination, ResolutionContext context)
    {
        return new DBO.PaymentType
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
