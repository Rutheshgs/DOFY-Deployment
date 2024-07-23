namespace DOFY.DataMappers;

using AutoMapper;

public class CarousalBannerEntityMapper : ITypeConverter<DBO.CarousalBanner, ViewEntities.CarousalBanner>
{
    public ViewEntities.CarousalBanner Convert(DBO.CarousalBanner source, ViewEntities.CarousalBanner destination, ResolutionContext context)
    {
        return new ViewEntities.CarousalBanner
        {
            Id = source?.Id ?? 0,
            Title = source?.Title ?? null,
            Content = source?.Content ?? null,
            DisplayInList = source?.DisplayInList ?? false,
            Enabled = source?.Enabled ?? false,
            ThumbnailPath = source?.ThumbnailPath ?? null,
            RowOrder = source?.RowOrder ?? 0,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
            Active = source?.Active ?? false,
            SecondLanguage = source.SecondLanguage ?? null
        };
    }
}

