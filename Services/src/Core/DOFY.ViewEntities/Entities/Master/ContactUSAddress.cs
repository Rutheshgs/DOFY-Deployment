using DOFY.Helper.Attributes;

namespace DOFY.ViewEntities;

public class ContactUsAddress : EntityBase
{
    public string Address { get; set; }

    public string Phone { get; set; }

    public string Email { get; set; }

    public PromotionLinks? PromotionLinks { get; set; }
}

public class PromotionLinks
{
    public string faceBook { get; set; }

    public string instagram { get; set; }

    public string linkedIn { get; set; }

    public string tikTok { get; set; }

    public string youTube { get; set; }

    public string Twitter { get; set; }
}