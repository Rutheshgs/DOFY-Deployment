namespace DOFY.ViewEntities;

public class QuestionnaireResponses : EntityBase
{
	public long? OrderId { get; set; }

	public long QuestionnaireTemplateId { get; set; }

	public bool? Selected { get; set; }

	public decimal? Threshold { get; set; }

	public long? RowOrder { get; set; }

	public long? Version { get; set; }

	public string? Question { get; set; }

	public string? AnswerType { get; set; }

	public string? ThumbnailPath { get; set; }

	public string? QuestionType { get; set; }

	public long QuestionnaireTypeId { get; set; }

	public string? QuestionnaireType { get; set; }

	public long? ParentId { get; set; }

	public string? ResponseText { get; set; }

    public long? Identifier { get; set; }
}
