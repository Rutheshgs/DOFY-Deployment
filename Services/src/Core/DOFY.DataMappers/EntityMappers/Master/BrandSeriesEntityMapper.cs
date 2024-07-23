namespace DOFY.DataMappers;

using AutoMapper;

public class BrandSeriesEntityMapper : ITypeConverter<DBO.BrandSeries, ViewEntities.BrandSeries>
{
    public ViewEntities.BrandSeries Convert(DBO.BrandSeries source, ViewEntities.BrandSeries destination, ResolutionContext context)
    {
        return new ViewEntities.BrandSeries
        {
            Id = source?.Id ?? 0,
            BrandMasterId = source?.BrandMasterId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            DateOfIntroduction = source?.DateOfIntroduction ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            ThumbnailPath = source?.ThumbnailPath,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            BrandMasterName = source?.BrandMasterName,
            BrandMasterEnumName = source?.BrandMasterEnumName,
            BrandMasterThumbnailPath = source?.BrandMasterThumbnailPath,
            ProductTypeId = source?.ProductTypeId ?? 0,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
        };
    }
}
