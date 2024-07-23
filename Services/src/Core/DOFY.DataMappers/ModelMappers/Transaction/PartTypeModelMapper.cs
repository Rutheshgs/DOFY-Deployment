namespace DOFY.DataMappers;

using AutoMapper;

public class PartTypeModelMapper : ITypeConverter<ViewEntities.PartType, DBO.PartType>
{
    public DBO.PartType Convert(ViewEntities.PartType source, DBO.PartType destination, ResolutionContext context)
    {
        return new DBO.PartType
        {
            Id = source?.Id ?? 0,
            ProductTypeId = source?.ProductTypeId ?? 0,
            RepairTypeId = source?.RepairTypeId ?? 0,
            PartId = source?.PartId ?? null,
            SeriesModelColorId = source?.SeriesModelColorId ?? 0,
            PartName = source?.PartName,
            EnumName = source?.EnumName,
            PartValue = source?.PartValue ?? 0,
            ServiceValue = source?.ServiceValue ?? 0,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Enabled = source?.Enabled ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            ServiceCharge = source?.ServiceCharge ?? 0,
        };
    }
}
