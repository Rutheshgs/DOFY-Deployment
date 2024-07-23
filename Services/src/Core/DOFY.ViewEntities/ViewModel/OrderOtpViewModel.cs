namespace DOFY.ViewEntities;

public class OrderOtpViewModel
{
    public long? orderId { get; set; }

    public long? personId { get; set; }

    public string password { get; set; }

    public long? emailTemplateId { get; set; }
}
