namespace DOFY.DBO;

public class PersonDocuments : EntityBase
{
    public long PersonId { get; set; }

    public long DocumentTypeId { get; set; }

    public string DocumentPath { get; set; }

    public string DocumentNumber { get; set; }

    public long? RowOrder { get; set; }

    public DateTime? Expiry { get; set; }

}

