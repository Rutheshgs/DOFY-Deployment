namespace DOFY.DataMappers;

using AutoMapper;

public class SeriesModelEntityMapper : ITypeConverter<DBO.SeriesModel, ViewEntities.SeriesModel>
{
    public ViewEntities.SeriesModel Convert(DBO.SeriesModel source, ViewEntities.SeriesModel destination, ResolutionContext context)
    {
        return new ViewEntities.SeriesModel
        {
            Id = source?.Id ?? 0,
            BrandSeriesId = source?.BrandSeriesId ?? 0,
            OsTypeId = source?.OsTypeId ?? 0,
            OsTypeName = source?.OsTypeName,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DateOfIntroduction = source?.DateOfIntroduction ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            ThumbnailPath = source?.ThumbnailPath,
            RowOrder = source?.RowOrder ?? 0,
            Active = source?.Active ?? false,
            CreatedBy = source?.CreatedBy ?? 0,
            Created = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Modified = source?.Modified ?? null,
            Specification = source?.Specification,
            ComingSoon = source?.ComingSoon ?? false,
            BrandSeriesName = source?.BrandSeriesName,
            BrandSeriesThumbnailPath = source?.BrandSeriesThumbnailPath,
            BrandMasterId = source?.BrandMasterId ?? 0,
            BrandMasterName = source?.BrandMasterName,
            BrandMasterThumbnailPath = source?.BrandMasterThumbnailPath,
            ProductTypeId = source?.ProductTypeId ?? 0,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
        };
    }
}
