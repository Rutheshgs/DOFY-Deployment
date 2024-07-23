namespace DOFY.DataMappers;

using AutoMapper;

public class MasterBrandSeriesEntityMapper : ITypeConverter<DBO.MasterModelVariant, DBO.BrandSeries>
{
    public DBO.BrandSeries Convert(DBO.MasterModelVariant source, DBO.BrandSeries destination, ResolutionContext context)
    {
        return new DBO.BrandSeries
        {
            Id = source?.BrandSeriesId ?? 0,
            BrandMasterId = source?.BrandMasterId ?? 0,
            Name = source?.BrandSeriesName,
            DisplayName = source?.BrandSeriesName,
            EnumName = source?.BrandSeriesEnumName,
            RowOrder = source?.BrandSeriesRowOrder ?? 0,
            ThumbnailPath = source?.BrandSeriesThumbnailPath,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            BrandMasterName = source?.BrandMasterName,
            BrandMasterEnumName = source?.BrandMasterEnumName,
            BrandMasterThumbnailPath = source?.BrandMasterThumbnailPath,
            ProductTypeId = source?.ProductTypeId ?? 0,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
            DisplayInList = source?.DisplayBrandMaster == true && source?.DisplayProductType == true,
        };
    }
}
