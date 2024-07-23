namespace DOFY.DataMappers;

using AutoMapper;

public class SEOModelMapper : ITypeConverter<ViewEntities.SEO, DBO.SEO>
{
    public DBO.SEO Convert(ViewEntities.SEO source, DBO.SEO destination, ResolutionContext context)
    {
        return new DBO.SEO
        {
            Id = source?.Id ?? 0,
            PageName = source?.PageName ?? null,
            Title = source?.Title ?? null,
            Description = source?.Description ?? null,
            Keywords = source?.Keywords ?? null,
            OGTitle = source?.OGTitle ?? null,
            OGType = source?.OGType ?? null,
            OGUrl = source?.OGUrl ?? null,
            OGImage = source?.OGImage ?? null,
            OGDescription = source?.OGDescription ?? null,
            TwitterCard = source?.TwitterCard ?? null,
            TwitterSite = source?.TwitterSite ?? null,
            TwitterTitle = source?.TwitterTitle ?? null,
            TwitterDescription = source?.TwitterDescription ?? null,
            SeocontentTitle = source?.SeocontentTitle ?? null,
            SeoContent = source?.SeoContent ?? null,
            TwitterImage = source?.TwitterImage ?? null,
            Created = source?.Created ?? null,
            CreatedBy = source?.CreatedBy ?? 0,
            Modified = source?.Created ?? null,
            ModifiedBy = source?.ModifiedBy ?? 0,
        };
    }
}
