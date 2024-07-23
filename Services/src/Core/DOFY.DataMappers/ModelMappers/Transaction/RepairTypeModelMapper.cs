namespace DOFY.DataMappers;

using AutoMapper;

public class RepairTypeModelMapper : ITypeConverter<ViewEntities.RepairType, DBO.RepairType>
{
    public DBO.RepairType Convert(ViewEntities.RepairType source, DBO.RepairType destination, ResolutionContext context)
    {
        return new DBO.RepairType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DisplayInList = source?.DisplayInList ?? false,
            RowOrder = source?.RowOrder ?? 0,
            Enabled = source?.Enabled ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            ThumbnailPath = source?.ThumbnailPath,
        };
    }
}
