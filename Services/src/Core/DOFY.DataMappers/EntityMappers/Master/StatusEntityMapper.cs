namespace DOFY.DataMappers;

using AutoMapper;

public class StatusEntityMapper : ITypeConverter<DBO.Status, ViewEntities.Status>
{
    public ViewEntities.Status Convert(DBO.Status source, ViewEntities.Status destination, ResolutionContext context)
    {
        return new ViewEntities.Status
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            EnumName = source?.EnumName,
            DisplayName = source?.DisplayName,
            DisplayInList = source?.DisplayInList ?? false,
            TemplateText = source?.TemplateText,
            ExternalStatus = source?.ExternalStatus,
            ColorCode = source?.ColorCode,
            EntityTypeId = source?.EntityTypeId ?? 0,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
        };
    }
}
