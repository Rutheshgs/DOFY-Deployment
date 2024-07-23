namespace DOFY.DBO;

public class OrderDocuments : EntityBase
{
    public long OrdersId { get; set; }

    public long DocumentTypeId { get; set; }

    public string DocumentPath { get; set; }

    public long? RowOrder { get; set; }

    public long Specifics { get; set; }

    public string? FileName { get; set; }
}