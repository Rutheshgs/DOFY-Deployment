namespace DOFY.DataMappers;

using AutoMapper;

public class SeriesModelColorsEntityMapper : ITypeConverter<DBO.SeriesModelColors, ViewEntities.SeriesModelColors>
{
    public ViewEntities.SeriesModelColors Convert(DBO.SeriesModelColors source, ViewEntities.SeriesModelColors destination, ResolutionContext context)
    {
        return new ViewEntities.SeriesModelColors
        {
            Id = source?.Id ?? 0,
            SeriesModelId = source?.SeriesModelId ?? 0,
            Name = source?.Name ?? null,
            EnumName = source?.EnumName ?? null,
            DisplayName = source?.DisplayName ?? null,
            Specification = source?.Specification ?? null,
            RowOrder = source?.RowOrder ?? 0,
            DisplayInList = source?.DisplayInList ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            ColorCode = source?.ColorCode ?? null,
            ThumbnailPath = source?.ThumbnailPath ?? null,
        };
    }
}
