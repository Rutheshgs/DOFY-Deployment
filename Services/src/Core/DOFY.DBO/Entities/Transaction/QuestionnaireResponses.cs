namespace DOFY.DBO;

public class QuestionnaireResponses : EntityBase
{
    public long OrderId { get; set; }

    public long QuestionnaireTemplateId { get; set; }

    public bool? Selected { get; set; }

    public decimal? Threshold { get; set; }

    public long? RowOrder { get; set; }

    public long? Version { get; set; }
}
