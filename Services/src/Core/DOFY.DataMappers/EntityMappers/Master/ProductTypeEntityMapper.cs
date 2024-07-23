namespace DOFY.DataMappers;

using AutoMapper;

public class ProductTypeEntityMapper : ITypeConverter<DBO.ProductType, ViewEntities.ProductType>
{
    public ViewEntities.ProductType Convert(DBO.ProductType source, ViewEntities.ProductType destination, ResolutionContext context)
    {
        return new ViewEntities.ProductType
        {
            Id = source?.Id ?? 0,
            Name = source?.Name,
            DisplayName = source?.DisplayName,
            EnumName = source?.EnumName,
            Year = source?.Year,
            ThumbnailPath = source?.ThumbnailPath,
            RowOrder = source?.RowOrder ?? 0,
            DisplayInList = source?.DisplayInList ?? false,
            Enabled = source?.Enabled ?? false,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            ComingSoon = source?.ComingSoon ?? false,
        };
    }
}
