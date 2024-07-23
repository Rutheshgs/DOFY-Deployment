namespace DOFY.DataMappers;

using AutoMapper;

public class MasterModelVariantEntityMapper : ITypeConverter<DBO.MasterModelVariant, DBO.ModelVariant>
{
    public DBO.ModelVariant Convert(DBO.MasterModelVariant source, DBO.ModelVariant destination, ResolutionContext context)
    {
        return new DBO.ModelVariant
        {
            Id = source?.Id ?? 0,
            SeriesModelId = source?.SeriesModelId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            DateOfIntroduction = source?.DateOfIntroduction ?? null,
            DisplayInList = source?.DisplayInList == true && source?.DisplaySeriesModel == true && source?.DisplayBrandMaster == true && source?.DisplayProductType == true,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            DisplayForSale = source?.DisplayForSale ?? false,
            DisplayForRepair = source?.DisplayForRepair ?? false,
            Specification = source?.Specification,
            ThumbnailPath = source?.ThumbnailPath,
            ProductCategoryId = source?.ProductCategoryId ?? 0,
            ThresholdCategoryId = source?.ThresholdCategoryId ?? 0,
            ComingSoon = source?.ComingSoon ?? false,
            SeriesModelName = source?.SeriesModelName,
            SeriesModelThumbnailPath = source?.SeriesModelThumbnailPath,
            BrandSeriesId = source?.BrandSeriesId,
            OsTypeId = source?.OsTypeId ?? 0,
            BrandSeriesName = source?.BrandSeriesName,
            BrandSeriesThumbnailPath = source?.BrandSeriesThumbnailPath,
            BrandMasterId = source?.BrandMasterId,
            BrandMasterName = source?.BrandMasterName,
            BrandMasterThumbnailPath = source?.BrandMasterThumbnailPath,
            ProductTypeId = source?.ProductTypeId ?? 0,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
            MaximumValue =source?.MaximumValue ?? 0,
            MinimumValue = source?.MinimumValue ?? 0,
            ProductCategoryName = source?.ProductCategoryName,
            ThresholdCategoryName = source?.ThresholdCategoryName,
        };
    }
}