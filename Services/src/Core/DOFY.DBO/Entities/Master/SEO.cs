using DOFY.Helper.Attributes;

namespace DOFY.DBO;

public class SEO : EntityBase
{
    public string? PageName { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Keywords { get; set; }

    public string? OGTitle { get; set; }

    public string? OGType { get; set; }

    public string? OGUrl { get; set; }

    public string? OGImage { get; set; }

    public string? OGDescription { get; set; }

    public string? TwitterCard { get; set; }

    public string? TwitterSite { get; set; }

    public string? TwitterTitle { get; set; }

    public string? TwitterDescription { get; set; }

    public string? TwitterImage { get; set; }

    public string? SeocontentTitle { get; set; }

    public string? SeoContent { get; set; }

}