namespace DOFY.DataMappers;

using AutoMapper;

public class RepairTypeEntityMapper : ITypeConverter<DBO.RepairType, ViewEntities.RepairType>
{
    public ViewEntities.RepairType Convert(DBO.RepairType source, ViewEntities.RepairType destination, ResolutionContext context)
    {
        return new ViewEntities.RepairType
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
