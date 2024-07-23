namespace DOFY.DataMappers;

using AutoMapper;

public class MasterSeriesModelEntityMapper : ITypeConverter<DBO.MasterModelVariant, DBO.SeriesModel>
{
    public DBO.SeriesModel Convert(DBO.MasterModelVariant source, DBO.SeriesModel destination, ResolutionContext context)
    {
        return new DBO.SeriesModel
        {
            Id = source?.SeriesModelId ?? 0,
            BrandSeriesId = source?.BrandSeriesId ?? 0,
            OsTypeId = source?.OsTypeId ?? 0,
            Name = source?.SeriesModelName,
            DisplayName = source?.SeriesModelName,
            EnumName = source?.SeriesModelEnumName,
            ThumbnailPath = source?.SeriesModelThumbnailPath,
            RowOrder = source?.SeriesModelRowOrder ?? 0,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            BrandSeriesName = source?.BrandSeriesName,
            BrandSeriesThumbnailPath = source?.BrandSeriesThumbnailPath,
            BrandMasterId = source?.BrandMasterId,
            BrandMasterName = source?.BrandMasterName,
            BrandMasterThumbnailPath = source?.BrandMasterThumbnailPath,
            ProductTypeId = source?.ProductTypeId ?? 0,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
            DisplayInList = source?.DisplaySeriesModel == true && source?.DisplayBrandMaster == true && source?.DisplayProductType == true,
        };
    }
}
