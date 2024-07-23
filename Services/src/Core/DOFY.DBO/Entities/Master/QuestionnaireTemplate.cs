namespace DOFY.DBO;

public class QuestionnaireTemplate : EntityBase
{
	public long? ProductTypeId { get; set; }

	public long? QuestionnaireTypeId { get; set; }

	public long? ModelVariantId { get; set; }

	public long? OSTypeId { get; set; }

	public int? Identifier { get; set; }

	public int? ParentId { get; set; }

	public int? ThresholdLevel { get; set; }

	public string Name { get; set; }

	public string? DisplayName { get; set; }

	public string? EnumName { get; set; }

	public string? SubHeading { get; set; }

	public string? Type { get; set; }

	public string? AnswerType { get; set; }

	public decimal? Threshold { get; set; }

	public int? RowOrder { get; set; }

	public bool? DisplayInList { get; set; }

	public bool Enabled { get; set; }

	public string? ThumbnailPath { get; set; }

	public bool? IsEditable { get; set; }

	public string? ResponseYes { get; set; }

	public string? ResponseNo { get; set; }

	public bool? DepreciateCalculation { get; set; }

	public bool? AppreciateCalculation { get; set; }

	public int? NextQuestionYes { get; set; }

	public int? NextQuestionNo { get; set; }

	public bool? Required { get; set; }

	public long? CategoryId { get; set; }

	public bool? DisableWarranty { get; set; }

	public string? Icons { get; set; }

    public string? SecondLanguage { get; set; }

    public string? SubHeadingSecondLanguage { get; set; }

    public string? ResponseYesSecondLanguage { get; set; }

    public string? ResponseNoSecondLanguage { get; set; }

    public string? IgnoreResponseIds { get; set; }

}
