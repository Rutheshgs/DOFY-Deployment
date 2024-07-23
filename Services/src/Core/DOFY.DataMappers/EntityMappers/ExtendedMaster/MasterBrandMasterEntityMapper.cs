namespace DOFY.DataMappers;

using AutoMapper;

public class MasterBrandMasterEntityMapper : ITypeConverter<DBO.MasterModelVariant, DBO.BrandMaster>
{
    public DBO.BrandMaster Convert(DBO.MasterModelVariant source, DBO.BrandMaster destination, ResolutionContext context)
    {
        return new DBO.BrandMaster
        {
            Id = source?.BrandMasterId ?? 0,
            ProductTypeId = source?.ProductTypeId ?? 0,
            Name = source?.BrandMasterName,
            DisplayName = source?.BrandMasterName,
            EnumName = source?.BrandMasterEnumName,
            RowOrder = source?.BrandMasterRowOrder ?? 0,
            ThumbnailPath = source?.BrandMasterThumbnailPath,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeEnumName = source?.ProductTypeEnumName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
            DisplayInList = source?.DisplayBrandMaster == true && source?.DisplayProductType == true,
        };
    }
}
