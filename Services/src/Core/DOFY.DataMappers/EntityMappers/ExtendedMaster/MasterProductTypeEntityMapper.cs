namespace DOFY.DataMappers;

using AutoMapper;

public class MasterProductTypeEntityMapper : ITypeConverter<DBO.MasterModelVariant, DBO.ProductType>
{
    public DBO.ProductType Convert(DBO.MasterModelVariant source, DBO.ProductType destination, ResolutionContext context)
    {
        return new DBO.ProductType
        {
            Id = source?.ProductTypeId ?? 0,
            Name = source?.ProductTypeName,
            DisplayName = source?.ProductTypeName,
            EnumName = source?.ProductTypeEnumName,
            ThumbnailPath = source?.ProductTypeThumbnailPath,
            RowOrder = source?.ProductTypeRowOrder ?? 0,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            DisplayInList = source?.DisplayProductType == true,
        };
    }
}