namespace DOFY.DBO;

public class VerificationCode : EntityBase
{
    public long PersonId { get; set; }

    public int VerificationNumber { get; set; }

    public bool Verified { get; set; }

    public bool ResendFlag { get; set; }

    public long? RowOrder { get; set; }

    public long? OrderId { get; set; }

    public DateTime? ExpirationTime { get; set; }

    public long? EmailTemplateId { get; set; }
}
