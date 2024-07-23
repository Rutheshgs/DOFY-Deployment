namespace DOFY.DataMappers;

using AutoMapper;

public class BrandMasterModelMapper : ITypeConverter<ViewEntities.BrandMaster, DBO.BrandMaster>
{
    public DBO.BrandMaster Convert(ViewEntities.BrandMaster source, DBO.BrandMaster destination, ResolutionContext context)
    {
        return new DBO.BrandMaster
        {
            Id = source?.Id ?? 0,
            ProductTypeId = source?.ProductTypeId ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            RowOrder = source?.RowOrder ?? 0,
            DateOfIntroduction = source?.DateOfIntroduction ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            ThumbnailPath = source?.ThumbnailPath,
            OperatingSystem = source?.OperatingSystem,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
            ProductTypeName = source?.ProductTypeName,
            ProductTypeEnumName = source?.ProductTypeEnumName,
            ProductTypeThumbnailPath = source?.ProductTypeThumbnailPath,
        };
    }
}
